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

## Install

If you want to use the API in your own project, you can install it from npm with `npm install @wyrecc/api` or `yarn add @wyrecc/api`.
