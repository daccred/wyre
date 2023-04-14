// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Maplerad = require('maplerad-node');
import Maplerad from '@tecmie/maplerad-node';
import Ajv from 'ajv';
import Axios from 'axios';
import { type MapleradConfigOptions } from './maplerad.schema';
import { mapleradConfigSchema } from './maplerad.schema';

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
  private config: MapleradConfigOptions;
  private client;
  /**
   * @todo Add custom debug flag from .env to disable logging
   * @example
   * if (process.env.DEBUG) {
   * this.logger = console;
   * } else {
   *       this.logger = {
   *         log: () => {},
   *         debug: () => {},
   *         info: () => {},
   *         warn: () => {},
   *         error: () => {}
   *       } as Console;
   *     } else {
   *       this.logger = console;
   *     }
   *   }
   * }
   * */
  private logger = console;
  private base_url: string;

  constructor(config: MapleradConfigOptions) {
    this.config = config;
    const defaults = this.validateConfigWithSchema(config);

    this.client = new Maplerad(defaults.secret_key, defaults.environment);
    this.base_url = defaults[`${defaults.environment}_url`] as string;

    console.log({
      config: this.config,
      client: this.client,
    });
  }

  private validateConfigWithSchema = (_configOptions: MapleradConfigOptions) => {
    const ajv = new Ajv({ useDefaults: true });
    const validate = ajv.compile(mapleradConfigSchema);

    /**
     * @note Ajv mutates the __configOptions object__ and adds the default values
     * the moment we call validate(_configOptions);
     * */
    const isValidSchema = validate(_configOptions);
    this.logger.log(`MapleradProvider.validateConfigWithSchema`, isValidSchema);

    if (!isValidSchema) {
      this.logger.error(validate.errors);
      throw new Error(`{
        message: "Invalid Maplerad config schema",
        errors: ${JSON.stringify(validate.errors)}
      }`);
    }

    this.config = _configOptions as MapleradConfigOptions;
    return _configOptions as MapleradConfigOptions;
  };

  getConfig() {
    return this.config;
  }

  /**
   * @see https://maplerad.dev/reference/create-a-transfer
   * @param payload
   * @description This resource creates a transfer.
   * The maplerad-node library does not handle errors well, so we default to axios
   * @example
   * {
   *  "id": "
   * "reference": "uuid_xxx-uui-xxx-xxx-xxx",
   * "amount": 1000,
   * "currency": "NGN",
   * "status": "PENDING",
   * "reason": "Salary for December",
   * "account_number": "0151647888",
   * "bank_code": "044",
   * }
   * @returns NairaTransferResponse
   */
  async executeNairaTransfer(payload: NairaTransferRequest): Promise<unknown> {
    // console.log({ payload }, '---->]---->]---->]---->]---->]');

    try {
      const transfer = await Axios.post(
        this.base_url + '/transfers',
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.secret_key}`,
          },
        }
      );

      /// @todo: send this response somewhere
      this.logger.log(`MapleradProvider.executeNairaTransfer`, transfer.data);
      return transfer.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * @see https://maplerad.dev/reference/create-a-transfer
   * @param transferId
   * @description This resource returns a transfer details by its reference or ID.
   * @returns NairaTransferResponse
   */
  public async getTransferRecord(transferId: string): Promise<unknown> {
    try {
      return await this.client.Transfers.GetTransfer(transferId);
    } catch (error) {
      return error;
    }
  }

  /**
   * @name getTransferCollection
   * @description This resource returns a list of transfers.
   * @returns NairaTransferCollectionResponse[]
   */

  public async getTransferCollection(): Promise<unknown> {
    try {
      return await this.client.Transfers.GetAllTransfers();
    } catch (error) {
      return error;
    }
  }

  /**
   * @see https://maplerad.dev/reference/get-all-institutions
   * @description Get all banks in Nigeria with their codes
   */
  public async getAllBankCodeNigeria(): Promise<unknown> {
    try {
      return await this.client.Institution.GetAllInstitutions({
        page: '1',
        pageSize: '100',
        country: 'NG',
        type: 'NUBAN', // DOM, CASHPICKUP, NUBAN, WALLET, VIRTUAL
      });
    } catch (error) {
      return error;
    }
  }
}
