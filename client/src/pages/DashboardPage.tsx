import { lazy, Suspense } from "react";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import useAuthStore from "@/store/auth.ts";
import { GlobalPreloader } from "@/components/molecules/GlobalPreloader.tsx";

const AdminDashboard = lazy(
  () => import(`@/modules/dashboard/AdminDashboard.tsx`),
);
const EmployeeDashboard = lazy(
  () => import(`@/modules/dashboard/AdminDashboard.tsx`),
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
