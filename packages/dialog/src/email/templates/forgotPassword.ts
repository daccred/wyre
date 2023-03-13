interface EmailHTMLProps {
  confirmCode: string;
}
export const forgotPasswordEmail = ({ confirmCode }: EmailHTMLProps) => {
  return ` 
    <html>
      <body>
        <p>Dear User,</p>
        <p>The OTP token required to change your password can be found below :</p>
       <p style="font-size: 2rem">
        ${confirmCode.slice(0, 3)}- ${confirmCode.toString().slice(3, 6)} </p
        <p>If you did not sign up for our service, please disregard this email.</p>
        <p>Thank you,<br>Your Company Name</p>
      </body>
    </html>`;
};
