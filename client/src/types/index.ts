import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum MODAL_KEY {
  EMPLOYEE_UPDATE = "modal:employee-update",
  EMPLOYEE_DELETE = "modal:employee-delete",
  TASK_ASSIGN = "modal:task-assign",
}
