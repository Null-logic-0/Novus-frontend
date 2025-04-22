function FormUI({ children, onSubmit, ...props }) {
  return (
    <form
      {...props}
      onSubmit={onSubmit}
      className="flex flex-col gap-2 items-center w-full "
    >
      {children}
    </form>
  );
}

export default FormUI;
