# Providers

All of our integrations and apps will be written as providers. Providers would implement a common interface and would be registered with the framework. 

The framework would then use the provider to perform the required actions.

## Provider Interface

```ts
// provider interface would implement the following methods
// a executeBulkTransfer method, executeSingleTransfer method, getConnectionStatus method, getCredentials Method where credentials are JSONSchema7 compliant and a getProviderName method

interface Provider {
  executeBulkTransfer: (transfer: BulkTransfer) => Promise<TransferResult>;
  executeSingleTransfer: (transfer: SingleTransfer) => Promise<TransferResult>;
  getConnectionStatus: () => Promise<ConnectionStatus>;
  getCredentials: () => JSONSchema7;
  getProviderName: () => string;
}
```
