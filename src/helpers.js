const fs = require('fs');
const https = require('https');

const express = require('express');

const app = express();

app.get('/lookup', (req, res) => {
  const regex = RegExp(req.query.regex); // Noncompliant

  if(regex.test(req.query.data)){
    res.send("It's a Match!");
  }else{
    res.send("Not a Match!");
  }
})

function getHttps(url, callback) {
    https.get(url, res => {
        let data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';

        res.on('data', chunk => {
          data.push(chunk);
        });
      
        res.on('end', () => {
          callback(Buffer.concat(data).toString());

        });
      }).on('error', err => {
        console.log('Error: ', err.message);
      });
}

function createSwaggerTemplate () {
    return  {
        "openapi": "3.0.0",
        "info": {
            "title": "Web API",
            "version": "1.0"
        },
        "servers": [
            {
                url: "http://localhost:9000"
            }
        ],
        "security": [
            {
                "BasicAuth": [],
                "BearerAuth": []
            }
        ],
        "paths": {},
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",

                }
            },
            "schemas": {

            }
        }
    }
}

// https://next.sonarqube.com/sonarqube/api/webservices/list


function getWebServiceJson (location) {
    return JSON.parse(fs.readFileSync(location));
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
            let summary = full_path
            let description = action.description;
            let operationId = path.split("/")[1] + "-" + action.key;
            let tags = [full_path.split("/")[2]];
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

            // set schema
            template.components.schemas[operationId] = {
                type: 'object',
                required: [],
                properties: {}
            };
    
            // set parameters
            if (action.params) {

                action.params.forEach(param => {
                    if (action.post) {
                        template.components.schemas[operationId].properties[param.key] = {
                            type: "string"
                        }
                    }
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
                description: description,
                operationId: operationId,
                tags: tags,
                parameters: parameters,
                responses: responses
            }
    
            // set operation
            if (action.post) {
                // operation['requestBody'] = {
                //    $ref: 'models/schemas.json#/' + operationId
                // }
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
    getHttps
 }