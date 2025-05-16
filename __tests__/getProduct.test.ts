/**
 * @jest-environment node
 */
import { createServer } from 'http';
import supertest from 'supertest';
import { GET } from '@/app/api/products/[slug]/route';
import { getAllMockProducts } from '@/lib/mocks/staticProducts';

describe('API /api/products/[slug]', () => {
  const mockProducts = getAllMockProducts();
  const validSlug = mockProducts[0]?.slug || 'panda-1';

  it('deve retornar o produto correspondente ao slug', async () => {
    const handler = async (req: any, res: any) => {
      const response = await GET(req, {
        params: Promise.resolve({ slug: validSlug }),
      });
      const body = await response.json();

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = response.status;
      res.end(JSON.stringify(body));
    };

    const server = createServer(handler);
    await new Promise<void>((resolve) => server.listen(0, resolve));

    const request = supertest(server);
    const res = await request.get(`/api/products/${validSlug}`);

    const { product, success, message } = res.body;

    expect(res.status).toBe(200);
    expect(success).toBe(true);
    expect(product).not.toBeNull();
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('slug', validSlug);
    expect(typeof message).toBe('string');

    server.close();
  });
});
