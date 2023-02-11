const checker = (email) => {
  const splittedEmail = email.split("@")[1];
  if (splittedEmail !== "gmail.com") {
    return true;
  }
  return "you must use an official email";
};

console.log(checker("iyayiemmanuel1@insight7.io"));
