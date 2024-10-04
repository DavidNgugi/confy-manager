import { AWSSecretsManager } from "./AWSSecretsManager";
import { AwsCredentialIdentity } from "@aws-sdk/types";

type FieldType = StringConstructor | NumberConstructor | BooleanConstructor;

export class Field<T> {
    private _value: T | undefined;
    private awsSecretsManager: AWSSecretsManager | undefined;
  
    constructor(
      private defaultValue: T,
      private type: FieldType,
      private envVar: string,
      private awsSecretName?: string,
      awsCredentials?: AwsCredentialIdentity
    ) {
      if (![String, Number, Boolean].includes(type)) {
        throw new Error(`Unsupported field type: ${type.name}`);
      }
      if (awsSecretName) {
        this.awsSecretsManager = AWSSecretsManager.getInstance(awsCredentials);
      }
    }
  
    async initialize(): Promise<void> {
      this._value = await this.getValue();
    }
  
    get value(): T {
      if (this._value === undefined) {
        throw new Error('Field has not been initialized. Call initialize() first.');
      }
      return this._value;
    }
  
    private async getValue(): Promise<T> {
      const envValue = process.env[this.envVar];
      if (envValue !== undefined && envValue !== '') {
        return this.parseValue(envValue);
      }
  
      if (this.awsSecretName && this.awsSecretsManager) {
        try {
          const secretValue = await this.awsSecretsManager.getSecret(this.awsSecretName);
          return this.parseValue(secretValue);
        } catch (error) {
          console.error(`Error retrieving secret for ${this.envVar}:`, error);
        }
      }
  
      return this.defaultValue;
    }
  
    private parseValue(value: string): T {
      switch (this.type) {
        case Boolean:
          return (value.toLowerCase() === 'true' || value === '1') as unknown as T;
        case Number:
          const num = Number(value);
          if (isNaN(num)) {
            throw new Error(`Invalid number value for ${this.envVar}: ${value}`);
          }
          return num as unknown as T;
        case String:
          return value as unknown as T;
        default:
          throw new Error(`Unsupported field type: ${this.type.name}`);
      }
    }
  }