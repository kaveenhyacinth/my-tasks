import { Spinner } from "@heroui/spinner";

export const GlobalPreloader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center">
      <Spinner variant="spinner" />
    </div>
  );
};
