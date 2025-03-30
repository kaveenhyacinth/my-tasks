import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { User } from "@heroui/user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { api } from "../../../api";

import { title } from "@/components/primitives.ts";
import useAuthStore from "@/store/auth.ts";
import { GlobalPreloader } from "@/components/molecules/global-preloader.tsx";
import { LogoutIcon } from "@/components/icons.tsx";
import { QUERY_EMPLOYEES_ME } from "@/lib/constants.ts";

export const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);

  const { isLoading, data: currentUserQuery } = useQuery({
    queryKey: [QUERY_EMPLOYEES_ME],
    queryFn: () => api.employees.me.$get(),
  });

  const user = useMemo(
    () => currentUserQuery?.data.employee,
    [currentUserQuery],
  );

  const displayName = useMemo(() => {
    if (!user) return "";

    return `${user.firstName} ${user.lastName}`;
  }, [user]);

  const avatarQuery = useMemo(() => {
    if (!user) return "";

    return `${user.firstName}+${user.lastName}`;
  }, [user]);

  if (isLoading) {
    return <GlobalPreloader />;
  }

  return (
    <HeroUINavbar className="py-2" maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <h1 className={title({ size: "xs", color: "blue" })}>My Tasks</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: `https://ui-avatars.com/api/?name=${avatarQuery}&background=random`,
                }}
                className="transition-transform"
                description={user?.department ?? ""}
                name={displayName}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<LogoutIcon />}
                onPress={logout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
