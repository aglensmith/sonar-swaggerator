const helpers = require('../src/helpers');


test('reads webservices to json', () => {
    const json = helpers.getWebServiceJson('./webservices.json');
    console.log(JSON.stringify(json));
    expect(json["webServices"].length).toBeGreaterThan(0);
});

test('reads webservices to json', () => {
    const json = helpers.getWebServiceJson('./webservices.json');
    console.log(JSON.stringify(json));
    expect(json["webServices"].length).toBeGreaterThan(0);
});

test('createSwaggerTemplate return is defined', ()=> {
    const template = helpers.createSwaggerTemplate();
    expect(template).toBeDefined();
});
