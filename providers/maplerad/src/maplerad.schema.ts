import type { Options as GotOptions } from "got";
import type { JSONSchema7 } from "json-schema";

/**
 * @name mapleradConfigSchema
 * @description This is the schema for the Maplerad config
 * @type {JSONSchemaType<MapleradConfig>}
 * @see https://json-schema.org/understanding-json-schema/reference/object.html
 * @see https://transform.tools/ to convert JSON Schema to TypeScript
 */

export const mapleradConfigSchema: JSONSchema7 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    name: {
      type: "string",
      default: "maplerad",
    },
    secret_key: {
      type: "string",
      default: "mpr_sandbox_sk_b87df6cc-124c-441c-b21f-04ae72940ef3",
    },
    base_url: {
      type: "string",
      default: "https://sandbox.api.maplerad.com/v1",
    },
    sandbox_url: {
      type: "string",
      default: "https://sandbox.api.maplerad.com/v1",
    },
    supported_currencies: {
      type: "string",
      enum: ["NGN", "GHC", "USD", "KES"],
      default: "NGN",
    },
  },
  required: ["supported_currencies"],
};

interface HttpProviderConfig {
  base_url: string;
  sandbox_url: string;
  default: string;
  httpConfig: Partial<GotOptions>;
}

export interface MapleradConfigOptions extends HttpProviderConfig {
  name?: string;
  secret_key?: string;
  supported_currencies: "NGN" | "GHC" | "USD" | "KES";
  [k: string]: unknown;
}
