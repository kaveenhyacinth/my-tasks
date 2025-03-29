import { Card, CardBody, CardHeader } from "@heroui/card";
import { Navigate } from "react-router-dom";

import { subtitle, title } from "@/components/primitives";
import { LoginForm } from "@/components/organisms/login-form.tsx";
import useAuthStore from "@/store/auth.ts";

export default function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <Card className="min-w-[325px] md:min-w-[475px] p-4 md:px-6 md:py-8">
        <CardHeader className="justify-center mb-1">
          <div className="w-full">
            <h1 className={title({ align: "center", color: "blue" })}>
              My Tasks
            </h1>
            <p className={subtitle({ align: "center" })}>
              Login to access your dashboard
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </main>
  );
}
