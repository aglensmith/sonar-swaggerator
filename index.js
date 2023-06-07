const helpers = require("./helpers");

helpers.getHttps('https://next.sonarqube.com/sonarqube/api/webservices/list', function(json){
    const services = helpers.parseWebServiceJson(json);

    const template = helpers.createSwaggerTemplate();
    
    const swagger = helpers.convertToSwagger(template, services);
    
    console.log(JSON.stringify(swagger));
});


