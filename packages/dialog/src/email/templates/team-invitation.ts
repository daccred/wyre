interface Props {
  link: string;
}
export const teamInvitation = ({ link }: Props) => {
  return ` 
    <html>
      <body>
        <p>Dear User,</p>
        <p>You has invited you to a payroll.</p>
       <a href="${link}">
       click here to join the payroll at wyre
       </a>
        <p>Thank you,<br>Your Company Name</p>
      </body>
    </html>`;
};
