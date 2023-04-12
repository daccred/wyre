# `@wyrecc/api` API for Opensource Payroll Infrastructure

Manage all backend operations

## Usage

- create payroll: You can create a payroll in the tRPC client by calling the `trpc.payroll.createPayroll.mutate` function. The function takes a single argument, which is an object with the following properties:

```ts
// Request
trpc.payroll.createPayroll.mutate({
  title: 'December Payroll',
  cycle: 'daily',
  auto: false,
  suspend: false,
  payday: '2023-04-20T22:53:49.459Z',
  currency: 'NGN',
  burden: 1903290934,
  employees: ['clgbfys9n0000eyaqxyl61kzi'],
});
```

> On success the API response will return the payroll object created.

```ts
// Response
{
  id: 'clgbfys9n0000eyaqxyl61kzi',
  suspend: false,
  currency: 'NGN',
  title: 'December Payroll',
  cycle: 'daily',
  payday: Thu Apr 20 2023 22:53:49 GMT+0000 (Greenwich Mean Time),
  auto: false,
  burden: 1903290934
}
```

- get payroll: You can get a payroll in the tRPC client by calling the `trpc.payroll.getPayroll.query` function.

```ts
{
  id: 'clgbfys9n0000eyaqxyl61kzi',
  suspend: false,
  currency: 'NGN',
  title: 'December Payroll',
  cycle: 'daily',
  payday: Thu Apr 20 2023 22:53:49 GMT+0000 (Greenwich Mean Time),
  auto: false,
  burden: 1903290934
}
```

- Update team: You can update a team in the tRPC client by calling the `trpc.team.updatePersonnel.mutate` function. The function takes a single argument, which is an object with the following properties:

```ts
// Request
trpc.team.updatePersonnel.mutate({
  id: 'clg7r4l5r0006eyhezc4ydcka',
  data: {
    name: 'John Doe', // default name
    email: 'johndoe@example.com', // default email
    department: 'Engineering', // default department
    jobRole: 'Software Developer', // default job role
    category: 'CONTRACTOR',
    salary: '5000 USD', // default salary
    signBonus: '1000 USD', // default sign-on bonus
    status: true,
    payrollMethod: 'CRYPTO',
    mobileMoney: {
      provider: 'MTN', // default mobile money provider
      phoneNumber: '+233501234567', // default phone number
      allocation: 0,
      personnelId: 'clg7r4l5r0006eyhezc4ydcka',
    },
    bank: {
      name: 'Bank of America', // default bank name
      accountNumber: '1234567890', // default account number
      bankCode: 'BOFAUS3N', // default bank code
      country: 'United States', // default country
      swiftCode: '', // default SWIFT code
      routingNumber: '', // default routing number
      accountType: 'Checking', // default account type
      allocation: 100,
      personnelId: 'clg7r4l5r0006eyhezc4ydcka',
    },
    cryptoWallet: {
      currency: 'Bitcoin', // default cryptocurrency
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', // default wallet address
      network: 'Mainnet', // default network
      allocation: 0,
      personnelId: 'clg7r4l5r0006eyhezc4ydcka',
    },
  },
});
```

Once successful, you will receive a response with the full updated personnel object.

```ts
[
  {
    id: 'clg7r4l5r0006eyhezc4ydcka',
    email: 'johndoe@example.com',
    firstName: 'John Doe',
    lastName: 'John Doe',
    phone: null,
    country: null,
    department: 'Engineering',
    jobRole: 'Software Developer',
    salary: '5000 USD',
    signBonus: '10000',
    status: true,
    teamCategory: 'CONTRACTOR',
    payrollMethod: 'BANK',
    payrollId: 'clgci9kyz0000eypi4ck1wcn6',
  },
  {
    id: 'clgdfit8y0001eyv1jteo0ox0',
    provider: 'MTN',
    phoneNumber: '+233501234567',
    allocation: 0,
    personnelId: 'clg7r4l5r0006eyhezc4ydcka',
  },
  {
    id: 'clgdfit8z0003eyv1mx4m97p1',
    name: 'Access Bank',
    accountNumber: '1234567890',
    bankCode: 'GTB',
    country: 'United States',
    swiftCode: '',
    routingNumber: '',
    accountType: 'Checking',
    allocation: 100,
    personnelId: 'clg7r4l5r0006eyhezc4ydcka',
  },
  {
    id: 'clgdfp6wm0005ey702bkmhn9p',
    currency: 'Bitcoin',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'Mainnet',
    allocation: 0,
    personnelId: 'clg7r4l5r0006eyhezc4ydcka',
  },
];
```

- Authorise payroll: You can authorise a payroll in the tRPC client by calling the `trpc.payroll.authorisePayroll.mutate` function. The function takes a single argument, which is an object with the following properties:

```ts
// Request
trpc.payroll.authorizePayroll.mutate({
  id: 'clgci9kyz0000eypi4ck1wcn6',
});
```

When we call this, the API can now authorize and add a payroll to the worker (queue) to begin processing and releasing the funds to the user.

```ts
// Response
{
  message: 'mindy_payroll payroll scheduled for Thu Apr 20 2023 22:53:49 GMT+0000 (Greenwich Mean Time)',
  scheduled: 742569929,
  payload: {
    id: 'clgci9kyz0000eypi4ck1wcn6',
    suspend: false,
    currency: 'NGN',
    title: 'Mindy Payroll',
    cycle: 'daily',
    payday: Thu Apr 20 2023 22:53:49 GMT+0000 (Greenwich Mean Time),
    auto: false,
    burden: 1903290934,
    employees: [
      {
        id: 'clg7r4l5r0006eyhezc4ydcka',
        email: 'johndoe@example.com',
        firstName: 'John Doe',
        lastName: 'John Doe',
        phone: null,
        country: null,
        department: 'Engineering',
        jobRole: 'Software Developer',
        salary: '5000 USD',
        signBonus: '10000',
        status: true,
        teamCategory: 'EMPLOYEE',
        payrollMethod: 'BANK',
        payrollId: 'clgci9kyz0000eypi4ck1wcn6',
        bank: {
          id: 'clgdfit8z0003eyv1mx4m97p1',
          name: 'Access Bank',
          accountNumber: '1234567890',
          bankCode: 'GTB',
          country: 'Nigeria',
          swiftCode: '',
          routingNumber: '',
          accountType: 'Checking',
          allocation: 100,
          personnelId: 'clg7r4l5r0006eyhezc4ydcka'
        },
        cryptoWallet: {
          id: 'clgdfp6wm0005ey702bkmhn9p',
          currency: 'Bitcoin',
          address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          network: 'Mainnet',
          allocation: 0,
          personnelId: 'clg7r4l5r0006eyhezc4ydcka'
        },
        mobileMoney: {
          id: 'clgdfit8y0001eyv1jteo0ox0',
          provider: 'MTN',
          phoneNumber: '+233501234567',
          allocation: 0,
          personnelId: 'clg7r4l5r0006eyhezc4ydcka'
        }
      }
    ]
  }
}
```

## Install

If you want to use the API in your own project, you can install it from npm with `npm install @wyrecc/api` or `yarn add @wyrecc/api`.
