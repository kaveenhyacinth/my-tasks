import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FormEvent, useMemo } from "react";
import { Select, SelectItem } from "@heroui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import { EmployeeResponse } from "../../../../api/employees/types.ts";
import { api } from "../../../../api";
import { EmployeeUpdatePayload } from "../../../../api/employees/_employeeId@string/types.ts";

import { QUERY_DEPARTMENTS_ALL, QUERY_EMPLOYEES_ALL } from "@/lib/constants.ts";

type EmployeeUpdateFormData = {
  firstName: string;
  lastName: string;
  department: string;
};

type EmployeeUpdateFormProps = {
  employee: EmployeeResponse;
  onClose: () => void;
};

export const EmployeeUpdateForm = ({
  employee,
  onClose,
}: EmployeeUpdateFormProps) => {
  const queryClient = useQueryClient();

  const { isLoading, data: departmentsRes } = useQuery({
    queryKey: [QUERY_DEPARTMENTS_ALL],
    queryFn: () => api.departments.$get(),
  });

  const employeeUpdateMutation = useMutation({
    mutationFn: ({
      employeeId,
      payload,
    }: {
      employeeId: string;
      payload: EmployeeUpdatePayload;
    }) =>
      api.employees._employeeId(employeeId).$put({
        body: payload,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_EMPLOYEES_ALL] });
      addToast({
        title: data.message ?? "Employee has been updated successfully.",
        icon: "success",
        color: "success",
      });
      onClose();
    },
  });

  const departments = useMemo(
    () => departmentsRes?.data.departments ?? [],
    [departmentsRes?.data?.departments],
  );

  const selectedDepartmentKey = useMemo(() => {
    const selectedDepartment = departments.find(
      (department) => department.departmentName === employee.department,
    );

    return selectedDepartment ? selectedDepartment.id : "";
  }, [departments, employee.department]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as EmployeeUpdateFormData;

    employeeUpdateMutation.mutate({
      employeeId: employee.id,
      payload: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
      },
    });
  };

  return (
    <Form className="w-full flex flex-col gap-4" onSubmit={handleOnSubmit}>
      <Input
        isRequired
        defaultValue={employee.firstName}
        errorMessage="First name is required"
        label="First Name"
        labelPlacement="inside"
        name="firstName"
        placeholder="Enter your first name"
        type="text"
      />
      <Input
        isRequired
        defaultValue={employee.lastName}
        errorMessage="Last name is required"
        label="Last Name"
        labelPlacement="inside"
        name="lastName"
        placeholder="Enter your last name"
        type="text"
      />
      <Input
        isDisabled
        defaultValue={employee.username}
        label="Username"
        labelPlacement="inside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />
      {selectedDepartmentKey ? (
        <Select
          isRequired
          defaultSelectedKeys={[selectedDepartmentKey]}
          isLoading={isLoading}
          label="Department"
          name="department"
          placeholder="Select a department"
        >
          {departments.map((department) => (
            <SelectItem key={department.id}>
              {department.departmentName}
            </SelectItem>
          ))}
        </Select>
      ) : (
        <></>
      )}

      <div className="w-full flex mt-2">
        <Button
          className="w-full h-12"
          color="primary"
          type="button"
          variant="light"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          className="w-full h-12"
          color="primary"
          isLoading={employeeUpdateMutation.isPending}
          type="submit"
        >
          {employeeUpdateMutation.isPending ? "Updating" : "Update"}
        </Button>
      </div>
    </Form>
  );
};
