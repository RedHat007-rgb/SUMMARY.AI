import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import yup from "yup";
import * as yup from "yup";
import { string } from "yup";
import axios from "axios";

export const useSignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const signupSchema = yup.object({
    email: string()
      .email("Please enter a valid email address.")
      .max(100, "Email address must not exceed 100 characters.")
      .required("Email address is required.")
      .trim(),

    firstName: string()
      .matches(/^[A-Za-z ]+$/, "First name can contain only letters.")
      .min(3, "First name must be at least 3 characters long.")
      .max(30, "First name must not exceed 30 characters.")
      .required("First name is required.")
      .trim(),

    lastName: string()
      .matches(/^[A-Za-z ]+$/, "Last name can contain only letters.")
      .min(3, "Last name must be at least 3 characters long.")
      .max(30, "Last name must not exceed 30 characters.")
      .required("Last name is required.")
      .trim(),

    password: string()
      .min(6, "Password must be at least 6 characters long.")
      .max(15, "Password must not exceed 15 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include uppercase, lowercase, number, and special character."
      )
      .required("Password is required.")
      .trim(),
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email == "" || password == "" || firstName == "" || lastName == "") {
      return setError("please enter all the fields.");
    }

    if (!email.includes("@") || !email.includes(".com")) {
      return setError("Please enter valid Email.");
    }

    try {
      let schemaValidation = await signupSchema.validate(
        {
          email,
          password,
          firstName,
          lastName,
        },
        { abortEarly: false }
      );
      console.log(schemaValidation);
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        }
      );

      if (response.data.message == "Account created successfully.") {
        setData(response.data.message + "Redirecting to login....");
        setError("");
        setTimeout(() => navigate("/login"), 5000);
      }
    } catch (error) {
      if (error) {
        console.log("hi");
        if (error.errors) {
          setError(error.errors);
        } else {
          setError(error?.response?.data?.message);
        }
      }
    }
  };
  return {
    email,
    setEmail,
    password,
    setPasword,
    firstName,
    setfirstName,
    lastName,
    setlastName,
    data,
    error,
    onSubmitHandler,
  };
};
