export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  return regex.test(email)
};

export const validatePassword = (password, username) => {
  //At least: 1 uppercase, 1 lowercase, 1 number, 1 special including _, length between 8 and 64
  const regex = /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-zñÑ\d@$!%*?&_]{8,64}$/;
  
  //Password must not include username
  const notInclude = !password.includes(username);
  return regex.test(password) && notInclude;
};
