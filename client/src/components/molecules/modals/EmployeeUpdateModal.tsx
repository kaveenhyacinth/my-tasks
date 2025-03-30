import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";

import { EmployeeResponse } from "../../../../api/employees/types.ts";

import { EmployeeUpdateForm } from "@/components/organisms/forms/EmployeeUpdateForm.tsx";

type EmployeeUpdateModalProps = {
  isOpen: boolean;
  employee: EmployeeResponse;
  onOpenChange: (isOpen: boolean) => void;
};

export default function EmployeeUpdateModal({
  isOpen,
  employee,
  onOpenChange,
}: EmployeeUpdateModalProps) {
  return (
    <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <div>
                <EmployeeUpdateForm employee={employee} onClose={onClose} />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
