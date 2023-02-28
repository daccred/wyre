interface EmailHTMLProps {
  confirmLink: string;
}
export const forgotPassword = ({ confirmLink }: EmailHTMLProps) => {
  const btnStyle = {
    background: "#000000",
    color: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    textDecoration: "none",
  };
  return `   <html>
      <body>
        <p>Dear User,</p>
        <p>Thank you for signing up for our service. Please click the link below to confirm your email address:</p>
        <p>
        <a style="
        text-decoration: ${btnStyle.textDecoration}
        background:${btnStyle.background};
        padding: ${btnStyle.padding};
        color: ${btnStyle.color};
        border-radius: ${btnStyle.borderRadius};
        "
        href="${confirmLink}">Confirm your email </a></p>
        <p>If you did not sign up for our service, please disregard this email.</p>
        <p>Thank you,<br>Zayroll</p>
      </body>
    </html>`;
};
