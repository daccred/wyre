import type { JSONSchema7 } from 'json-schema';

/**
 * @name mapleradConfigSchema
 * @description This is the schema for the Maplerad config
 * @type {JSONSchemaType<MapleradConfig>}
 * @see https://json-schema.org/understanding-json-schema/reference/object.html
 * @see https://transform.tools/ to convert JSON Schema to TypeScript
 *
 * @note The reason we are using the JSON Schema is so that we can easily persist
 * the config in the database and also validate the config schema once we move away from
 * using environment variables as the source of truth for the config
 */

export const mapleradConfigSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'maplerad',
    },
    secret_key: {
      type: 'string',
      default: 'mpr_sandbox_sk_b87df6cc-124c-441c-b21f-04ae72940ef3',
    },
    live_url: {
      type: 'string',
      default: 'https://sandbox.api.maplerad.com/v1',
    },
    sandbox_url: {
      type: 'string',
      default: 'https://sandbox.api.maplerad.com/v1',
    },
    supported_currencies: {
      type: 'string',
      enum: ['NGN', 'GHC', 'USD', 'KES'],
      default: 'NGN',
    },
    environment: {
      type: 'string',
      enum: ['live', 'sandbox'],
      default: 'sandbox',
    },
  },
  required: ['environment', 'secret_key', 'supported_currencies'],
};

interface HttpProviderConfig {
  live_url: string;
  sandbox_url: string;
}

export interface MapleradConfigOptions extends Partial<HttpProviderConfig> {
  name?: string;
  environment: 'live' | 'sandbox';
  secret_key: string;
  supported_currencies: 'NGN' | 'GHC' | 'USD' | 'KES';
  [k: string]: unknown;
}
