export function validatePassword(password: string) {
  let errorMessage = "";

  if (password.length < 8) {
    errorMessage = "Passwords must be at least 8 characters";
  } else if (password.search(/[a-z]/) < 0) {
    errorMessage = "Password must contain at least one lowercase letter";
  } else if (password.search(/[A-Z]/) < 0) {
    errorMessage = "Password must contain at least one uppercase letter";
  } else if (
    password.search(/[0-9]/) < 0 &&
    !/[~`!#$%@.\()^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password) // checks for special chars
  ) {
    errorMessage =
      "Password must contain at least one number or special character (!, &, *, $, >, etc.";
  }
  return errorMessage;
}

export function passwordRules() {
  return (
    <div>
      Passwords must contain the following:{" "}
      <ul>
        <li>8 characters</li>
        <li>1 uppercase letter</li>
        <li>1 lowercase letter</li>
        <li>1 number of special character (!, @, #, $, %, etc.)</li>
      </ul>
    </div>
  );
}

export function validateEmail(email: string) {
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return email.match(emailRegex);
}

export function validateUsername(username: string) {
  if (username.length < 3) {
    return "Username must be a minimum of 3 characters";
  }
  // TODO: Check if username already exists
  return "";
}
