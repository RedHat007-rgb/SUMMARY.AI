import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { data } from "react-router-dom";

const RHF = () => {
  const formSchema = yup.object({
    email: string()
      .email("Please enter a valid email address.")
      .max(100, "Email address must not exceed 100 characters.")
      .required("Email address is required.")
      .trim(),
    password: string()
      .matches(/^[A-Za-z ]+$/, "First name can contain only letters.")
      .min(3, "First name must be at least 3 characters long.")
      .max(30, "First name must not exceed 30 characters.")
      .required("First name is required.")
      .trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  const submitHandler = () => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input {...register("email")} placeholder="Email" />
        {<p>{errors.email?.message}</p>}
        <input {...register("password")} placeholder="password" />
        {<p>{errors.password?.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RHF;
