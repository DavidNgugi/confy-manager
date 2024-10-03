import { Config } from './Config';
import { Field } from './Field';

export function createConfig(configDefinition: { [key: string]: Field<any> }): Config {
  return new Config(configDefinition);
}