import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";

import { EmployeeResponse } from "../../../../api/employees/types.ts";

import TaskCreateForm from "@/components/organisms/forms/TaskCreateForm.tsx";
import { title } from "@/components/primitives.ts";

type TaskAssignModalProps = {
  isOpen: boolean;
  employee: EmployeeResponse;
  onOpenChange: (isOpen: boolean) => void;
};

export default function TaskAssignModal({
  isOpen,
  employee,
  onOpenChange,
}: TaskAssignModalProps) {
  return (
    <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className={title({ size: "xs" })}>
                Assign Task to{" "}
                <strong>
                  {employee.firstName} {employee.lastName}
                </strong>
              </h3>
            </ModalHeader>
            <ModalBody>
              <div>
                <TaskCreateForm assignee={employee.id} onClose={onClose} />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
