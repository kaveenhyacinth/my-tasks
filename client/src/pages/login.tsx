import { Card, CardBody, CardHeader } from "@heroui/card";

import { subtitle, title } from "@/components/primitives";
import { LoginForm } from "@/components/organisms/login-form.tsx";

export default function LoginPage() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <Card className="min-w-[325px] md:min-w-[475px] p-4 md:p-8">
        <CardBody>
          <CardHeader className="justify-center mb-2">
            <div className="w-full">
              <h1 className={title({ align: "center", color: "blue" })}>
                My Tasks
              </h1>
              <p className={subtitle({ align: "center" })}>
                Login to access your dashboard
              </p>
            </div>
          </CardHeader>
          <LoginForm />
        </CardBody>
      </Card>
    </main>
  );
}
