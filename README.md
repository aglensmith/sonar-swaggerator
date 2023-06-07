# Sonar Swaggerator

Sonar Swaggerator is a node.js script that uses the response from SonarQube's [`/api/webservices/list` endpoint](https://next.sonarqube.com/sonarqube/web_api/api/webservices) to generate an [OpenAPI specification](https://www.openapis.org/) (also known as a swagger file).

## Requirements

* `node`

## Usage


### Generating swagger

```bash
# clone the repo
git clone git@github.com:aglensmith/sonar-swaggerator.git

# move into repo root dir
cd ~/path/to/sonar-swaggerator

# install dependencies
npm i

# GET webservice definitions from next.sonarqube.com
# and create swagger file based on response
node index.js >> webapi.oas.json
```

### Generating documnation

It is possible to generate API documentation from an OAS file using a tool like [Redoc](https://redocly.github.io/). Any easy way to do this is to pass a raw file URL to the redoc demo page, like so: https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/aglensmith/sonar-swaggerator/main/webapi.oas.json#tag/batch

Other examples:
* [Stoplight Elements](https://elements-demo.stoplight.io/?spec=https://raw.githubusercontent.com/aglensmith/sonar-swaggerator/main/webapi.oas.json#tag/batch)
* [Mrin Doc](https://mrin9.github.io/OpenAPI-Viewer/#/load/https%3A%2F%2Fapi.apis.guru%2Fv2%2Fspecs%2Fbitbucket.org%2F2.0%2Fswagger.json)
* [OpenAPI Explorer](https://rhosys.github.io/openapi-explorer/?#?route=get-/v1/users/-userId-/resources/-resourceUri-/permissions/-permission-)

See [openapi.tools](https://openapi.tools/#documentation) for a list of other OpenAPI documentation generators and other tools.
