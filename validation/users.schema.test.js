const Ajv = require('ajv');
const axios = require('axios');
const userSchema = require('../schemas/user.schema.json');

const ajv = new Ajv();

describe('Schema validation for Users', () => {
  test('response should match user schema', async () => {
    const response = await axios.get('http://localhost:4000/users/1'); // assumes json-server is running
    const valid = ajv.validate(userSchema, response.data);
    const user = response.data;

    if (!valid) {
      console.error('Validation errors:', ajv.errors);
      console.log('Actual Response:', user);
    }

    expect(valid).toBe(true);

    //console.log("User schema validation passed");

  });
});
