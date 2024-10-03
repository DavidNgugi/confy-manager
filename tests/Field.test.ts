import { Field } from '../src/Field';

describe('Field', () => {
  beforeEach(() => {
    process.env = {};
  });

  test('should return default value when no env var is set', async () => {
    const field = new Field('default', String, 'TEST_VAR');
    await field.initialize();
    expect(field.value).toBe('default');
  });

  test('should return env var value when set', async () => {
    process.env.TEST_VAR = 'env_value';
    const field = new Field('default', String, 'TEST_VAR');
    await field.initialize();
    expect(field.value).toBe('env_value');
  });

  test('should parse boolean values correctly', async () => {
    process.env.BOOL_VAR = 'true';
    const trueField = new Field(false, Boolean, 'BOOL_VAR');
    await trueField.initialize();
    expect(trueField.value).toBe(true);

    process.env.BOOL_VAR = 'false';
    const falseField = new Field(true, Boolean, 'BOOL_VAR');
    await falseField.initialize();
    expect(falseField.value).toBe(false);
  });

  test('should parse number values correctly', async () => {
    process.env.NUM_VAR = '42';
    const field = new Field(0, Number, 'NUM_VAR');
    await field.initialize();
    expect(field.value).toBe(42);
  });
});