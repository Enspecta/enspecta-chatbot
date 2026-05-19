const { systemPrompt } = require('../backend/knowledge');

describe('systemPrompt', () => {
  test('exports a non-empty string', () => {
    expect(typeof systemPrompt).toBe('string');
    expect(systemPrompt.length).toBeGreaterThan(100);
  });

  test('contains Aida persona', () => {
    expect(systemPrompt).toContain('Aida');
    expect(systemPrompt).toContain('Enspecta');
  });

  test('contains all four inspection types', () => {
    expect(systemPrompt).toContain('Överlåtelsebesiktning');
    expect(systemPrompt).toContain('Nybyggnadsbesiktning');
    expect(systemPrompt).toContain('Garantibesiktning');
    expect(systemPrompt).toContain('Energibesiktning');
  });

  test('contains booking URL and contact info', () => {
    expect(systemPrompt).toContain('enspecta.se/boka');
    expect(systemPrompt).toContain('info@enspecta.se');
  });
});
