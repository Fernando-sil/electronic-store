import CustomInput from "./ReusableComponents/CustomInput";
import Label from "./ReusableComponents/Label";
import { CustomButton } from "./ReusableComponents/CutomButton";
import { useState } from "react";
import { LogInUser } from "../Queries/Authentication/LogIn";

function LoginForm() {
  const { login } = LogInUser();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  //   const [error, setError] = useState({});
  const [error, setError] = useState({
    userName: "",
    password: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const errors = {
      userName: "",
      password: "",
    };
    if (formData.userName === "") {
      errors.userName = "User name is required";
    }
    if (formData.password === "") {
      errors.password = "Password is required";
    }
    return errors;
  }

  function handleSubmit() {
    const errors = validateForm();

    setError({
      ...error,
      userName: errors.userName,
      password: errors.password,
    });
    if (error.password || error.userName !== "") return;

    login(formData);
  }
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2">
        <Label label="User Name">
          <CustomInput
            type="text"
            name="userName"
            placeholder="Your user name"
            onChange={handleInputChange}
            value={formData.userName}
          />
          {error.userName !== "" && (
            <p className="text-red-700">{error.userName}</p>
          )}
        </Label>
        <Label label="Password">
          <CustomInput
            type="password"
            name="password"
            placeholder="Your password"
            onChange={handleInputChange}
            value={formData.password}
          />
          {error.password !== "" && (
            <p className="text-red-700">{error.password}</p>
          )}
        </Label>
      </div>
      <CustomButton buttonColor="accent">Log in</CustomButton>
    </form>
  );
}

export default LoginForm;
