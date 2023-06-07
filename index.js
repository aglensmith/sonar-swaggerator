const helpers = require("./helpers");


const json = helpers.getWebServiceJson('webservices.json');

const services = helpers.parseWebServiceJson(json);

const template = helpers.createSwaggerTemplate();

const swagger = helpers.convertToSwagger(template, services);

console.log(JSON.stringify(swagger))
