interface Props {
  link: string;
}
export const paymentLinkEmail = ({ link }: Props) => {
  return `    <html>
      <body>
        <p>Dear User,</p>
        <p>The OTP token required to change your password can be found below :</p>
       <p style="font-size: 2rem">
        <form action=${link}>
            <button type="submit">Request payment</button>
        </form>
          <p>If you did not sign up for our service, please disregard this email.</p>
        <p>Thank you,<br>Your Company Name</p>
      </body>
    </html>`;
};
