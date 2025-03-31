import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum MODAL_KEY {
  EMPLOYEE_UPDATE = "modal:employee-update",
  EMPLOYEE_DELETE = "modal:employee-delete",
  TASK_ASSIGN = "modal:task-assign",
}

export enum SORT_ORDER {
  ASC = "asc",
  DESC = "desc",
}

export enum TASK_ALERT_STATUS {
  VISIBLE = "visible",
  HIDDEN = "hidden",
}
