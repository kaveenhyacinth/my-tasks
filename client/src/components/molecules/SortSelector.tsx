import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { ChangeEvent } from "react";

import { TaskOrderQuery, TaskSortQuery } from "../../../api/tasks/types.ts";

import { AscendingListIcon, DescendingListIcon } from "@/components/icons.tsx";
import { SORT_ORDER } from "@/types";

type SortSelectorProps = {
  sortKey: TaskSortQuery;
  sortOrder: TaskOrderQuery;
  setSortKey: (sortKey: TaskSortQuery) => void;
  setSortOrder: (order: TaskOrderQuery) => void;
};

export default function SortSelector({
  sortKey,
  sortOrder,
  setSortKey,
  setSortOrder,
}: SortSelectorProps) {
  const handleOnChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as TaskSortQuery);
  };

  const handleOnChangeOrder = () => {
    setSortOrder(
      sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC,
    );
  };

  return (
    <div className="inline-flex gap-2 items-center">
      <Select
        className="w-44"
        defaultSelectedKeys={["dueDate"]}
        label="Sort by:"
        labelPlacement="outside-left"
        name="sort"
        selectedKeys={[sortKey]}
        size="sm"
        onChange={handleOnChangeSort}
      >
        <SelectItem key="priority">Priority</SelectItem>
        <SelectItem key="dueDate">Due Date</SelectItem>
      </Select>
      <Button
        isIconOnly
        aria-label="Sort Order"
        color="primary"
        variant="light"
        onPress={handleOnChangeOrder}
      >
        {sortOrder === SORT_ORDER.DESC ? (
          <AscendingListIcon size={18} />
        ) : (
          <DescendingListIcon size={18} />
        )}
      </Button>
    </div>
  );
}
