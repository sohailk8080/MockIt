const { Pact } = require('@pact-foundation/pact');
const fetch = require('node-fetch');
const path = require('path');

const provider = new Pact({
    consumer: 'FrontendApp',
    provider: 'MockServer',
    port: 1234,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    //logLevel: 'DEBUG',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
});

describe('Contract Tests', () => {
    beforeAll(async () => {
        await provider.setup();
    });

    afterAll(async () => {
        await provider.finalize();
    });

    test('returns a user', async () => {
        await provider.addInteraction({
            state: 'user exists',
            uponReceiving: 'a request for a user',
            withRequest: {
                method: 'GET',
                path: '/users/1',
                headers: {
                    Accept: 'application/json',
                },
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    id: "1",
                    name: "Sohail",
                },
            },
        });

        const response = await fetch(`${provider.mockService.baseUrl}/users/1`, {
            headers: {
                Accept: 'application/json', // ✅ Match what Pact expects
            },
        });

        const data = await response.json(); // ✅ Only one read allowed

        // Optional: log if needed, but avoid using response.text()
        //console.log('✅ Response:', data);

        expect(response.status).toBe(200);
        expect(data).toEqual({ id: "1", name: "Sohail" });

        await provider.verify();
        //console.log("Data found : "+data.name);
    });
});
