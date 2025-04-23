import { twMerge } from "tailwind-merge";

function FormUI({ className, children, onSubmit, ...props }) {
  return (
    <form
      {...props}
      onSubmit={onSubmit}
      className={twMerge("flex flex-col gap-2 items-center w-full ", className)}
    >
      {children}
    </form>
  );
}

export default FormUI;
