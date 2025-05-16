/**
 * @jest-environment node
 */
import { createServer } from 'http';
import supertest from 'supertest';
import { GET } from '@/app/api/products/featured/route';

describe('API /api/products/featured', () => {
  it('deve retornar produtos em destaque com sucesso', async () => {
    const handler = async (_req: any, res: any) => {
      const response = await GET();
      const body = await response.json();

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = response.status;
      res.end(JSON.stringify(body));
    };

    const server = createServer(handler);
    await new Promise<void>((resolve) => server.listen(0, resolve));

    const request = supertest(server);
    const res = await request.get('/api/products/featured');

    const { products, success, message } = res.body;

    expect(res.status).toBe(200);
    expect(success).toBe(true);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('featured', true);
    expect(typeof message).toBe('string');

    server.close();
  });
});
