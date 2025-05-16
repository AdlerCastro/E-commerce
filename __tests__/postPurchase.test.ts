/**
 * @jest-environment node
 */
import { createServer } from 'http';
import supertest from 'supertest';
import { POST } from '@/app/api/finalizing-purchase/route';

describe('API /api/finalizing-purchase', () => {
  it('deve finalizar o pedido com sucesso com dados válidos', async () => {
    const validPayload = {
      name: 'Adler Castro',
      email: 'adler@example.com',
      address: 'Rua dos Pandas, 123',
      cartItems: [
        {
          productId: 1,
          selectedPose: 'relaxado',
          selectedSize: 'M',
          quantity: 2,
        },
      ],
    };

    const handler = async (req: any, res: any) => {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });

      req.on('end', async () => {
        const request = new Request('http://localhost', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });

        const response = await POST(request);
        const responseBody = await response.json();

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = response.status;
        res.end(JSON.stringify(responseBody));
      });
    };

    const server = createServer(handler);

    await new Promise<void>((resolve) => server.listen(0, resolve));

    const request = supertest(server);
    const res = await request
      .post('/api/finalizing-purchase')
      .send(validPayload)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.message).toBe('string');

    server.close();
  });

  it('deve retornar erro 400 com payload inválido', async () => {
    const invalidPayload = {
      name: 'A',
      email: 'email-invalido',
      address: '',
      cartItems: [],
    };

    const handler = async (req: any, res: any) => {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });

      req.on('end', async () => {
        const request = new Request('http://localhost', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });

        const response = await POST(request);
        const responseBody = await response.json();

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = response.status;
        res.end(JSON.stringify(responseBody));
      });
    };

    const server = createServer(handler);

    await new Promise<void>((resolve) => server.listen(0, resolve));

    const request = supertest(server);
    const res = await request
      .post('/api/finalizing-purchase')
      .send(invalidPayload)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty('errors');

    server.close();
  });
});
