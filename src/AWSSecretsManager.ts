import { SecretsManager } from "@aws-sdk/client-secrets-manager";
import { AwsCredentialIdentity } from "@aws-sdk/types";


export class AWSSecretsManager {
    private static instance: AWSSecretsManager;
    private secretsManager: SecretsManager;
  
    private constructor(credentials?: AwsCredentialIdentity) {
      this.secretsManager = new SecretsManager({ credentials });
    }
  
    public static getInstance(credentials?: AwsCredentialIdentity): AWSSecretsManager {
      if (!AWSSecretsManager.instance) {
        AWSSecretsManager.instance = new AWSSecretsManager(credentials);
      }
      return AWSSecretsManager.instance;
    }
  
    public async getSecret(secretName: string): Promise<string> {
      try {
        const data = await this.secretsManager.getSecretValue({ SecretId: secretName });
        if (data.SecretString) {
          return data.SecretString;
        } else {
          throw new Error('Secret binary is not supported');
        }
      } catch (error) {
        console.error('Error retrieving secret:', error);
        throw error;
      }
    }
  }