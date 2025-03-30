import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { FormEvent } from "react";
import { DatePicker } from "@heroui/date-picker";

import { api } from "../../../../api";

type TaskCreateFormData = {
  name: string;
  description: string;
  priority: string;
  dueDate: string;
};

type TaskCreateFormProps = {
  assignee: string;
  onClose: () => void;
};

export default function TaskCreateForm({
  assignee,
  onClose,
}: TaskCreateFormProps) {
  const mutation = useMutation({
    mutationFn: api.tasks.$post,
    onSuccess: (data) => {
      addToast({
        title: data.message ?? "Task has been assigned successfully.",
        icon: "success",
        color: "success",
      });
      onClose();
    },
  });

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as TaskCreateFormData;

    mutation.mutate({
      body: {
        name: formData.name,
        description: formData.description,
        priority: parseInt(formData.priority),
        dueDate: new Date(formData.dueDate).toISOString(),
        assignee,
      },
    });
  };

  return (
    <Form className="w-full flex flex-col gap-4" onSubmit={handleOnSubmit}>
      <Input
        isRequired
        errorMessage="Task name is required"
        label="Task name"
        labelPlacement="inside"
        name="name"
        placeholder="Enter task name"
        type="text"
      />
      <Textarea
        isRequired
        errorMessage="Task description is required"
        label="Description"
        labelPlacement="inside"
        name="description"
        placeholder="Enter your description"
      />
      <Select
        isRequired
        errorMessage="Please select a task priority"
        label="Priority"
        name="priority"
        placeholder="Select a priority"
        selectedKeys={"3"}
      >
        <SelectItem key="1">High</SelectItem>
        <SelectItem key="2">Medium</SelectItem>
        <SelectItem key="3">Low</SelectItem>
      </Select>
      <DatePicker label="Due date" name="dueDate" />
      <div className="w-full flex items-center justify-end max-w-xs ml-auto gap-1 mt-2">
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
          isLoading={mutation.isPending}
          type="submit"
        >
          {mutation.isPending ? "Assigning" : "Assign"}
        </Button>
      </div>
    </Form>
  );
}
