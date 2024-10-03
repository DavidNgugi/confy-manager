import { Config } from '../src/Config';
import { Field } from '../src/Field';

describe('Config', () => {
  let config: Config;

  beforeEach(async () => {
    process.env = {};
    config = new Config({
      STRING_VAR: new Field('default', String, 'STRING_VAR'),
      NUMBER_VAR: new Field(0, Number, 'NUMBER_VAR'),
      BOOL_VAR: new Field(false, Boolean, 'BOOL_VAR'),
    });
    await config.initialize();
  });

  test('should return correct values for all types', () => {
    expect(config.get('STRING_VAR')).toBe('default');
    expect(config.get('NUMBER_VAR')).toBe(0);
    expect(config.get('BOOL_VAR')).toBe(false);
  });

  test('should return values from environment variables', async () => {
    process.env.STRING_VAR = 'env_string';
    process.env.NUMBER_VAR = '42';
    process.env.BOOL_VAR = 'true';

    // Re-initialize config to pick up new env vars
    await config.initialize();

    expect(config.get('STRING_VAR')).toBe('env_string');
    expect(config.get('NUMBER_VAR')).toBe(42);
    expect(config.get('BOOL_VAR')).toBe(true);
  });

  test('should throw error for non-existent key', () => {
    expect(() => config.get('NON_EXISTENT')).toThrow('Configuration key "NON_EXISTENT" not found');
  });
});