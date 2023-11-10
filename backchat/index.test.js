const request = require('supertest');
import userRoutes from "./src/routes/userRoutes";

describe("Test userRoutes", () => {
    it('should get users route', async () => {
        const res = await request(userRoutes).get('/users');
        
        expect(res.body).toHaveProperty('email');
    })
})