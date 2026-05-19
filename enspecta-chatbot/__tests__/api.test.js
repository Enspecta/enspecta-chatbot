const request = require('supertest');

// Mock Anthropic SDK before requiring app
jest.mock('@anthropic-ai/sdk', () => ({
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'Svar från Aida' }]
      })
    }
  }))
}));

const app = require('../backend/index');

describe('POST /api/chat — validation', () => {
  test('400 when message is missing', async () => {
    const res = await request(app).post('/api/chat').send({ history: [] });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Ogiltig/i);
  });

  test('400 when message exceeds 1000 characters', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'a'.repeat(1001) });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/1000/);
  });

  test('400 when history is not an array', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'hej', history: 'inte en array' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Ogiltig/i);
  });

  test('200 with valid request — returns reply string', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Vad kostar en besiktning?', history: [] });
    expect(res.status).toBe(200);
    expect(typeof res.body.reply).toBe('string');
    expect(res.body.reply.length).toBeGreaterThan(0);
  });

  test('200 when history has more than 10 items — silently truncated', async () => {
    const history = Array.from({ length: 15 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `meddelande ${i}`
    }));
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'fråga', history });
    expect(res.status).toBe(200);
  });
});
