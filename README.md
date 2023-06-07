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

See [openapi.tools](https://openapi.tools/#documentation) for a list of other OpenAPI documentation generators and other tools.
