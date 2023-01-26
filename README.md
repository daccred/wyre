# `zayroll`
Open source Payroll Infrastructure


## A Serverless Payroll infrastructure for African business

The open source Payroll automation alternative. You are in charge of your own data, workflow and appearance.

There are a lot of awesome tools out there tailored to automating payroll for african focused businesses, however most of them are fragmented in which regions in Africa they can serve, thus we have limitations in control, customizations and options for which geo-graphical regions we can serve.


This is where `zayroll` comes in. A serverless, self-hosted and white label payroll system for your business, you can easily host on Vercel with a serverless database like Neon or Planetscale. API-driven and ready to be deployed on your domain `payroll.mydomain.com` 

Full control of your financial and employee data.



## Tech Proposal

- Database: Neon.dev (serverless postgres)
- App stack: `Nextjs`
- API layer: `tRPC`
- ORM: `prisma`
- Communication: Twilio & Sengrid


## Fintech Layers

- Openbanking: `[mono, stitch.money, anchor, onepipe.com]`
- Payment rails: `[paystack, ExpressPayGH, flutterwave]`
- Crypto rails: `[fluidcoins, lazerpay, coinprofile]`
- Momo: `[MTN Momo API, MPesa]`


### Feature Proposals

- [ ] Signup
- [ ] Login
- [ ] Invite Employee
- [ ] Setup Payroll
- [ ] Trigger Payroll execution
- [ ] Manage Employees
- [ ] Terminate Employees
- [ ] Manage Active `fintech` Integrations
- [ ] Fintech Routes (Enable business to use specific route for Employee)
- [ ] Schedule Execution of Payroll
- [ ] Manage & View Transactions (Log for all executions triggered by the system)


### Inspirations & Future scope
Nice to haves, but will not be included in the intial PoC

- <https://www.branchapp.com>
- <https://bento.africa>
- Support Wages: Use case for contractors and weekly wages (e.g. construction, security, logistics type businesses);
- Salary Advance: Enable employees request for salary advances


