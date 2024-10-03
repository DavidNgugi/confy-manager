import { Field } from './Field';

export class Config {
  constructor(private fields: { [key: string]: Field<any> }) {}

  async initialize(): Promise<void> {
    await Promise.all(Object.values(this.fields).map(field => field.initialize()));
  }

  public get<T>(key: string): T {
    if (!(key in this.fields)) {
      throw new Error(`Configuration key "${key}" not found`);
    }
    return this.fields[key].value;
  }
}