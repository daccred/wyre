import Ajv from 'ajv';
/// @see https://www.npmjs.com/package/got/v/11.8.1
import got from 'got';
import { type JSONSchema7 } from 'json-schema';

import { type MapleradConfigOptions } from './maplerad.schema';
import { mapleradConfigSchema } from './maplerad.schema';

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
  reason?: string;
  reference: string;
  bank_code: string;
  currency: 'NGN';
}

export class MapleradProvider implements FintechProviderInterface {
  private config;
  private client;
  private logger = console;
  private path = 'transfers';

  constructor(config: MapleradConfigOptions) {
    this.config = {};
    const defaults = this.validateConfigSchema(config);

    this.client = got.extend({
      prefixUrl: defaults.base_url,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${defaults.secret_key}`,
      },
    });

    console.log({
      defaults,
      herer: '49025uitninoskdsc........===============.....................',
    });
  }

  validateConfigSchema = (_schema: JSONSchema7) => {
    const ajv = new Ajv({ useDefaults: true });
    const validate = ajv.compile(mapleradConfigSchema);

    /**
     * @note Ajv mutates the __schema object__ and adds the default values
     * the moment we call validate(schema);
     * */
    const isValidSchema = validate(_schema);
    this.logger.log(`MapleradProvider.validateConfigSchema`, isValidSchema);
    if (!isValidSchema) {
      this.logger.error(validate.errors);
      throw new Error(`{
        message: "Invalid Maplerad config schema",
        errors: ${JSON.stringify(validate.errors)}
      }`);
    }

    this.config = _schema as MapleradConfigOptions;
    return _schema as MapleradConfigOptions;
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
        responseType: 'json',
      })
      .json();
    this.logger.log(`MapleradProvider.executeNairaTransfer`, JSON.stringify(response, null, 2));
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
