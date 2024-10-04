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

  // Failure cases
  test('should throw error when accessing value before initialization', () => {
    const field = new Field('default', String, 'TEST_VAR');
    expect(() => field.value).toThrow('Field has not been initialized. Call initialize() first.');
  });

  test('should throw error when parsing invalid number', async () => {
    process.env.NUM_VAR = 'not a number';
    const field = new Field(0, Number, 'NUM_VAR');
    await expect(field.initialize()).rejects.toThrow('Invalid number value for NUM_VAR: not a number');
  });

  test('should use default value when env var is empty string', async () => {
    process.env.TEST_VAR = '';
    const field = new Field('default', String, 'TEST_VAR');
    await field.initialize();
    expect(field.value).toBe('default');
  });

  test('should throw error for unsupported field type', () => {
    expect(() => new Field({}, Object as any, 'OBJ_VAR'))
      .toThrow('Unsupported field type: Object');
  });
  
  test('should handle undefined env var correctly', async () => {
    delete process.env.TEST_VAR;
    const field = new Field('default', String, 'TEST_VAR');
    await field.initialize();
    expect(field.value).toBe('default');
  });

  test('should parse "1" as true for boolean fields', async () => {
    process.env.BOOL_VAR = '1';
    const field = new Field(false, Boolean, 'BOOL_VAR');
    await field.initialize();
    expect(field.value).toBe(true);
  });

  test('should parse "0" as false for boolean fields', async () => {
    process.env.BOOL_VAR = '0';
    const field = new Field(true, Boolean, 'BOOL_VAR');
    await field.initialize();
    expect(field.value).toBe(false);
  });
});