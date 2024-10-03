// TypeScript Version: 5.6

declare module 'confy-manager' {
    type FieldType = StringConstructor | NumberConstructor | BooleanConstructor;
  
    class Field<T> {
      constructor(defaultValue: T, type: FieldType, envVar: string, awsSecretName?: string);
      initialize(): Promise<void>;
      readonly value: T;
    }
  
    interface Config {
      get<T>(key: string): T;
      initialize(): Promise<void>;
    }
  
    interface ConfigDefinition {
      [key: string]: Field<any>;
    }
  
    function createConfig(configDefinition: ConfigDefinition): Config;
  
    interface AWSCredentials {
      accessKeyId: string;
      secretAccessKey: string;
      region?: string;
    }
  
    class AWSSecretsManager {
      static getInstance(credentials?: AWSCredentials): AWSSecretsManager;
      getSecret(secretName: string): Promise<string>;
    }
  
    export { Field, Config, createConfig, AWSSecretsManager, AWSCredentials };
  }