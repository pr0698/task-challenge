export const checkValidData = (email,password) => {

    //for email validation for email validation
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(password);
   
  if(!isEmailValid) return "Email ID is not valid"
  if(!isPasswordValid) return "Password is not valid"

  return null;
}