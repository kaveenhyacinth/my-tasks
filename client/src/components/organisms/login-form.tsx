import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { api } from "../../../api";

import { STORAGE_KEY_TOKEN } from "@/lib/constants.ts";

type LoginFormData = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: api.auth.login.$post,
    onSuccess: (res) => {
      handleOnLoginSuccess(res.data.token);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      addToast({
        title: error?.response?.data?.message ?? "Login error",
        icon: "error",
        color: "danger",
      });
    },
  });

  const handleOnLoginSuccess = (token: string) => {
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    return navigate("/");
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as LoginFormData;

    mutation.mutate({
      body: formData,
    });
  };

  return (
    <Form className="w-full flex flex-col gap-4" onSubmit={handleOnSubmit}>
      <Input
        isRequired
        errorMessage="Username is required"
        label="Username"
        labelPlacement="inside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />
      <Input
        isRequired
        errorMessage="Password is required"
        label="Password"
        labelPlacement="inside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <div className="w-full mt-2">
        <Button className="w-full h-12" color="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};
