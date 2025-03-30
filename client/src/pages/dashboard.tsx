import { lazy, Suspense } from "react";

import DefaultLayout from "@/layouts/default";
import useAuthStore from "@/store/auth.ts";
import { GlobalPreloader } from "@/components/molecules/global-preloader.tsx";

const AdminDashboard = lazy(() => import(`@/modules/dashboard/admin.tsx`));
const EmployeeDashboard = lazy(
  () => import(`@/modules/dashboard/employee.tsx`),
);

export default function DashboardPage() {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <DefaultLayout>
      <section className="py-2 md:py-4">
        <Suspense fallback={<GlobalPreloader />}>
          {isAdmin ? <AdminDashboard /> : <EmployeeDashboard />}
        </Suspense>
      </section>
    </DefaultLayout>
  );
}
