import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";

import { api } from "../../../../api";
import { LoginResponse, ROLE_TYPE } from "../../../../api/auth/login/types.ts";

import { STORAGE_KEY_ROLE, STORAGE_KEY_TOKEN } from "@/lib/constants.ts";
import useAuthStore from "@/store/auth.ts";

type LoginFormData = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);

  const mutation = useMutation({
    mutationFn: api.auth.login.$post,
    onSuccess: (res) => {
      handleOnLoginSuccess(res.data);
    },
  });

  const handleOnLoginSuccess = (loginRes: LoginResponse) => {
    localStorage.setItem(STORAGE_KEY_TOKEN, loginRes.token);
    localStorage.setItem(STORAGE_KEY_ROLE, loginRes.role);
    setIsAdmin(loginRes.role === ROLE_TYPE.ADMIN);
    setIsAuthenticated(!!loginRes.token);
    // !IMPORTANT: LoginPage.tsx will handle navigation to '/dashboard' when 'isAuthenticated' is true
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
        <Button
          className="w-full h-12"
          color="primary"
          isLoading={mutation.isPending}
          type="submit"
        >
          {mutation.isPending ? "Logging" : "Login"}
        </Button>
      </div>
    </Form>
  );
};
