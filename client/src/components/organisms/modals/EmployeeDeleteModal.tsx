import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import { EmployeeResponse } from "../../../../api/employees/types.ts";
import { api } from "../../../../api";

import { QUERY_EMPLOYEES_ALL } from "@/lib/constants.ts";

type EmployeeDeleteModalProps = {
  isOpen: boolean;
  employee: EmployeeResponse;
  onOpenChange: (isOpen: boolean) => void;
};

export default function EmployeeDeleteModal({
  isOpen,
  employee,
  onOpenChange,
}: EmployeeDeleteModalProps) {
  const queryClient = useQueryClient();

  const employeeDeleteMutation = useMutation({
    mutationFn: (employeeId: string) =>
      api.employees._employeeId(employeeId).$delete(),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_EMPLOYEES_ALL] });
      addToast({
        title: data.message ?? "Employee has been deleted successfully.",
        icon: "success",
        color: "success",
      });
      onOpenChange(false);
    },
  });

  return (
    <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader />
            <ModalBody>
              <p>
                Are you sure you want to delete{" "}
                <strong>
                  {employee.firstName} {employee.lastName}
                </strong>
                ?
              </p>
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex gap-2 items-center justify-end">
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={employeeDeleteMutation.isPending}
                  type="submit"
                  onPress={() => employeeDeleteMutation.mutate(employee.id)}
                >
                  {employeeDeleteMutation.isPending
                    ? "Deleting"
                    : "Yes, Delete!"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
