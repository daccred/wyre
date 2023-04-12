<h1 align="center">WYRE (Opensource Spend Infrastructure)</h1>

<div align="center">
<strong>Wyre</strong> is an open-source expende and payroll infrastructure. It's a platform that allows businesses to manage their payroll and employee benefits in a single place. It's built with the goal of making spend on vendors, contractors and employees as easy as possible.
</div>

## 🚀 Getting Started

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/1026ff3449944ad9b276deadfe7da4f4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## ✨ Features

- 🚀 Digitalize your payroll process without worrying about geographic limitations.
- 🔖 Own your payroll infrastructure and manage employee compensation, benefits, and taxes.
- 💅 Pay employees in any currency of choice including cryptocurrency.
- 📦 Pay vendors and contractors in any currency of choice including cryptocurrency.
- 📦 Enable employees to request reimbursements and get paid in any currency of choice including cryptocurrency.
- 📦 Enable contractors to request payments and automatically generate invoices for those transactions

## 📦 Managing Integrations & Employee Accounts

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/721c8681ff01453daa4916c8a1e68243" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

>

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/02be087267494e6997f32138c7fd93ec" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Feature Set

This project is still in early alpha, so we have many features soon to come! This [demo](https://www.figma.com/proto/AfwBeFCb2WTCq8MLmfh37W/Wyre---UPDATED-%E2%9A%A0%EF%B8%8F%F0%9F%9A%A9?page-id=615%3A13922&node-id=615%3A19018&viewport=73%2C-806%2C0.24&scaling=scale-down&starting-point-node-id=615%3A19018&show-proto-sidebar=1) covers a majority of the features we support today. For reference, here's our complete roadmap of current and upcoming features:

- Signup/login/reset password
- Invite employees/contractors
- Setup payroll
- Approve payroll disbursement
- Schedule execution of payroll
- Generate unique payment links
- Request/Manage reimbursements
- Manage & view transactions
- Manage employee/contractor
  - Edit compensation
  - Terminate employment
- Manage active fintech integrations
- Payment routes (enable businesses to use specific routes for paying employees/contractors)
- Connect to pension providers
- Manage employee health insurance
- Tax withholding and remmittance
- Employee salary advance

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/d83a39d3ab394a39b466b6373db6d7d5" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Repo Directory

| Directory                           | Description                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| [`admin`](/apps/web)                | Contains the administrative section for managing company payroll      |
| [`employee`](/apps/employee)        | User application for employees to access their payroll dashboard      |
| [`api`](/packages/api)              | Package for handling all apis for the appls                           |
| [`shared ui`](/packages/components) | Shared UI components for applications                                 |
| [`config`](/packages/config)        | Base dev dependencies and presets for repo                            |
| [`db`](/packages/db)                | Database schema configured with prisma                                |
| [`dialog`](/packages/dialog)        | Repo package for managing all external communications eg: emails, sms |
| [`env`](/packages/env)              | Environment variables configuration and validation                    |
| [`tsconfig`](/packages/tsconfig)    | Tsconfig configuration and extensions                                 |

## Technologies Used

- **Database:** Neon.dev (serverless PostgreSQL)
- **App Stack:** Nextjs
- **API Layer:** tRPC
- **ORM:** prisma
- **Communication:** Twilio & Sendgrid

## Payment Layers

- **Open Banking:** `[mono, stitch.money, anchor, onepipe.com]`
- **Fiat Rails:** `[paystack, ExpressPayGH, flutterwave]`
- **Crypto Rails:** `[fluidcoins, lazerpay, coinprofile]`
- **Mobile Money:** `[MTN Momo API, MPesa]`

## Configurations

**Commitizen:**
This tool is used to improve commit management. Install commitizen globally `yarn global add commitizen`
To make a commit, just type `cz` in your terminal and it produces a prompt.

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [Nextjs](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Chakra UI](https://chakra-ui.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Zod](https://zod.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://react-query.tanstack.com/)
- [Lerna](https://lerna.js.org/)
- [Bulljs](https://github/com/OptimalBits/bull)
- [Dayjs](https://day.js.org/)
- [ioredis](https://npmjs.com/packages/ioredis)
- [kv-redis](https://npmjs.com/packages/kv-redis)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

## Licences

MIT @ Tecmie Corporation
