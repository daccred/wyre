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
  private logger = console;
  private base_url: string;

  constructor(config: MapleradConfigOptions) {
    this.config = config;
    const defaults = this.validateConfigSchema(config);

    this.client = new Maplerad(defaults.secret_key, defaults.environment);
    this.base_url = defaults[`${defaults.environment}_url`];

    console.log({
      config: this.config,
      client: this.client,
    });
  }

  validateConfigSchema = (_configOptions: MapleradConfigOptions) => {
    const ajv = new Ajv({ useDefaults: true });
    const validate = ajv.compile(mapleradConfigSchema);

    /**
     * @note Ajv mutates the __configOptions object__ and adds the default values
     * the moment we call validate(schema);
     * */
    const isValidSchema = validate(_configOptions);
    this.logger.log(`MapleradProvider.validateConfigSchema`, isValidSchema);
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
   * "reference": "1234567890",
   * "amount": 1000,
   * "currency": "NGN",
   * "status": "PENDING",
   * "reason": "Salary for December",
   * "account_number": "1234567890",
   * "bank_code": "044",
   * }
   * @returns NairaTransferResponse
   */
  async executeNairaTransfer(payload: NairaTransferRequest): Promise<unknown> {
    console.log({ payload }, '---->]---->]---->]---->]---->]');

    try {
      const transfer = await Axios.post(
        this.base_url + '/transfers',
        {
          ...payload,
          // amount: Number(data.salary) * 100,
          // currency: 'NGN',
          // bank_code: data.bank?.bankCode,
          // account_number: data.bank?.accountNumber,
          // reference: rootQueueJobData.ref.replace(':', '_'),
          // reason: queueName,
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
