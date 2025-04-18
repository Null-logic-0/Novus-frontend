function FormUI({ children, ...props }) {
  return (
    <form {...props} className="flex flex-col gap-2 items-center w-full ">
      {children}
    </form>
  );
}

export default FormUI;
