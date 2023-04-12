import Ajv from 'ajv';
import { Got } from 'got';
// import got from 'got';
import { type JSONSchema7 } from 'json-schema';

import { type MapleradConfigOptions } from './maplerad.schema';
import { mapleradConfigSchema } from './maplerad.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const got = require('got');

// const live = "https://api.maplerad.com/v1";
// const sandbox = "https://sandbox.api.maplerad.com/v1";
// const httpConfig: Partial<GotOptions> = {
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${env.MAPLERAD_SECRET_KEY}`,
//   },
// };

// const config: MapleradConfigOptions = {
//   base_url: live,
//   sandbox_url: sandbox,
//   default: sandbox,
//   httpConfig: httpConfig,
//   supported_currencies: "NGN",
// };

interface FintechProviderInterface {
  executeNairaTransfer(payload: NairaTransferRequest): Promise<unknown>;
}

interface NairaTransferRequest {
  account_number: string;
  amount: number;
  reference: string;
  bank_code: string;
  currency: 'NGN';
}

export class MapleradProvider implements FintechProviderInterface {
  private config;
  private client!: Got;
  private logger = console;
  private path = '/transfers';

  constructor(config: MapleradConfigOptions) {
    this.config = config;
    const defaults = this.validateConfigSchema(config);
    (async () => {
      const got = await import('got');
      // const response = await got.default(url);
      this.client = got.default.extend({
        prefixUrl: config.default,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${defaults.secret_key}`,
        },
      });
    })();
  }

  validateConfigSchema = (schema: JSONSchema7) => {
    const ajv = new Ajv({ useDefaults: true });
    const validate = ajv.compile(mapleradConfigSchema);

    const extractConfig = validate(schema);
    this.logger.log(`MapleradProvider.validateConfigSchema`, extractConfig);

    if (!extractConfig) {
      this.logger.error(validate.errors);
      throw new Error(`{
        message: "Invalid Maplerad config schema",
        errors: ${validate.errors}
      }`);
    }

    // because we have defaults, we infer the type
    const config = extractConfig as unknown as MapleradConfigOptions;
    this.config = config;
    return config;
  };

  getConfig() {
    return this.config;
  }

  async executeNairaTransfer(payload: NairaTransferRequest): Promise<unknown> {
    const response = await this.client
      .post(this.path, {
        json: {
          amount: Number(payload.amount) * 100, // convert to kobo
          currency: 'NGN',
          bank_code: payload.bank_code,
          account_number: payload.account_number,
          reference: payload.reference,
          reason: 'Wyre requester funding',
        },
      })
      .json();
    this.logger.log(`MapleradProvider.executeNairaTransfer`, response);
    return response;
  }

  public async getTransferRecord(transferId: string): Promise<unknown> {
    try {
      const response = await this.client.get(`${this.path}/${transferId}`).json();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async getTransferCollection(): Promise<unknown> {
    try {
      const response = await this.client.get(this.path).json();
      return response;
    } catch (error) {
      return error;
    }
  }
}
