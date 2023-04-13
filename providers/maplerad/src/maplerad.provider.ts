// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Maplerad = require('maplerad-node');
import Maplerad from '@tecmie/maplerad-node';
import Ajv from 'ajv';
import { type JSONSchema7 } from 'json-schema';
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

  constructor(config: MapleradConfigOptions) {
    this.config = config;
    const defaults = this.validateConfigSchema(config);

    this.client = new Maplerad(defaults.secret_key, defaults.environment);

    console.log({
      defaults,
      client: this.client,
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

  /**
   * @see https://maplerad.dev/reference/create-a-transfer
   * @param payload
   * @description This resource creates a transfer.
   * @example
   * {
   *  "id": "
   * "reference": "1234567890",
   * "amount": 1000,
   * "currency": "NGN",
   * "status": "PENDING",
   * "reason": "Salary",
   * "account_number": "1234567890",
   * "bank_code": "044",
   * }
   * @returns NairaTransferResponse
   */
  async executeNairaTransfer(payload: NairaTransferRequest): Promise<unknown> {
    console.log(payload, '---->]---->]---->]---->]---->]');

    const transfer = await this.client.Transfers.NairaTransfer(payload);

    this.logger.log(`MapleradProvider.executeNairaTransfer`, JSON.stringify(transfer, null, 2));
    return transfer;
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
