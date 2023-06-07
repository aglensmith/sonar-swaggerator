const fs = require('fs');

function createSwaggerTemplate () {
    return  {
        openapi: "3.0.0",
        info: {
            title: "Web API",
            version: "1.0"
        },
        servers: [
            {
                url: "http:localhost.com/api"
            }
        ],
        paths: {}
    }
}

function getWebServiceJson (location) {
    return fs.readFileSync(location);
}

function parseWebServiceJson (json) {
    const obj = JSON.parse(json);
    return obj["webServices"];
}

function convertToSwagger (template, services) {
    services.forEach(service => {
        let path = service.path;
        let actions = service.actions;
    
        actions.forEach(action => {
            let full_path = "/" + path + "/" + action.key
            let summary = action.description;
            let operationId = path.split("/")[1] + "-" + action.key;
            let tags = [full_path.split("/")[1]];
            let parameters = [];
            let responses = {
                200: {
                    description: "",
                    content: {
                    "application/json": {}
                }
            }
            };
    
            // set path
            template.paths[full_path] = {}
    
            // set parameters
            if (action.params) {
                action.params.forEach(param => {
                    parameters.push({
                        name: param.key,
                        in: "query",
                        required: param.required,
                        "x-internal": param.internal,
                        description: param.description,
                        schema: {
                            type: "string"
                        }
                    })
                    
                })
            }
    
            let operation = {
                summary: summary,
                operationId: operationId,
                tags: tags,
                parameters: parameters,
                responses: responses
            }
    
            // set operation
            if (action.post) {
                template.paths[full_path]["post"] = operation
            } else {
                template.paths[full_path]["get"] = operation
            }
    
        })
    });

    return template;
}

module.exports = { 
    getWebServiceJson,
    parseWebServiceJson,
    convertToSwagger,
    createSwaggerTemplate,
 }