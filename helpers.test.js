const helpers = require('./helpers');

test('reads webservices to json', () => {
    expect(helpers.jsonParseWebServices()["webServices"].length).toBeGreaterThan(0);
});