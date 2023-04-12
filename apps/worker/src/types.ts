export interface RecipientData {
  name: string;
  email: string;
  department: string;
  jobRole: string;
  category: 'CONTRACTOR' | 'EMPLOYEE';
  salary: string;
  signBonus: string;
  status: boolean;
  payrollMethod: 'CRYPTO' | 'BANK' | 'MOBILEMONEY';
  mobileMoney?: {
    provider: string;
    phoneNumber: string;
    allocation: number;
    personnelId: string;
  };
  bank?: {
    name: string;
    accountNumber: string;
    bankCode: string;
    country: string;
    swiftCode: string;
    routingNumber: string;
    accountType: string;
    allocation: number;
    personnelId: string;
  };
  cryptoWallet?: {
    currency: string;
    address: string;
    network: string;
    allocation: number;
    personnelId: string;
  };
}

export interface IPayrollSchema {
  title: string;
  cycle: 'daily' | 'bi-weekly' | 'monthly';
  auto: boolean;
  suspend: boolean;
  payday: Date;
  currency:
    | 'USD'
    | 'GHS'
    | 'NGN'
    | 'GBP'
    | 'EUR'
    | 'KES'
    | 'RWF'
    | 'UGX'
    | 'TZS'
    | 'ZMW'
    | 'ZAR';
  burden: number;
  employees: string[];
}

export type PayrollScheduleData = {
  ref: string;
  cycle: string;
  payday: Date;
  currency: string;
  payload: RecipientData[] | unknown;
};
