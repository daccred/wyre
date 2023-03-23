export interface Provider {
  executeFundWithETH: () => boolean;
  executeFundWithToken: (token: string, amount: number) => boolean;

  executeRewardManyWithETH: (employees: Array<string>, amounts: Array<number>) => boolean;
  executeRewardManyWithToken: (employees: Array<string>, amounts: Array<number>, token: string) => boolean;

  executeRewardOneWithETH: (receiver: string, amount: number) => boolean;
  executeRewardOneWithToken: (receiver: string, token: string, amount: number) => boolean;

  executeHashOneETHReward: (contractor: string, reward: number, seed: number, deadline: Date) => string;

  executeHashOneTokenReward: (
    contractor: string,
    reward: number,
    token: string,
    seed: number,
    deadline: Date
  ) => string;

  executeSignedHashForETH: (
    contractor: string,
    reward: number,
    seed: number,
    deadline: Date,
    v: number,
    r: string,
    s: string
  ) => boolean;

  executeSignedHashForToken: (
    contractor: string,
    reward: number,
    token: string,
    seed: number,
    deadline: Date,
    v: number,
    r: string,
    s: string
  ) => boolean;
}
