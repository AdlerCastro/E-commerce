/**
 * @jest-environment node
 */
import { createServer } from 'http';
import supertest from 'supertest';
import { GET } from '@/app/api/products/route';

describe('API /api/products', () => {
  it('deve retornar produtos simulados com sucesso', async () => {
    const handler = async (_req: any, res: any) => {
      const response = await GET();
      const body = await response.json();
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(body));
    };

    const server = createServer(handler);

    await new Promise<void>((resolve, reject) => {
      server.listen(0, resolve); // start server na porta aleatória
    });

    const request = supertest(server);
    const res = await request.get('/api/products');

    const { products, success, message } = res.body;

    expect(res.status).toBe(200);
    expect(success).toBe(true);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(typeof message).toBe('string');
    expect(products[0]).toHaveProperty('id');

    server.close(); // encerra servidor e evita vazamento
  });
});
