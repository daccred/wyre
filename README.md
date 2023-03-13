# Wyre

**Wyre** is an open-source expense payroll infrastructure. We help businesses to:

🚀 Digitalize your payroll process without worrying about geographic limitations.

🔖 Own your payroll infrastructure and get full control of your employee's compensation data.

💅 Pay employees in any currency of choice including cryptocurrency.

<img width="1440" alt="Dashboard" src="https://user-images.githubusercontent.com/80969653/224554162-916aca6c-a55d-4fa4-a481-2ab109ac60ac.png">

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

## Dependencies

## Licences
