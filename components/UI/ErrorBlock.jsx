function ErrorBlock({ title, message }) {
  return (
    <div className="bg-[#f0d9e5]  my-4 p-4 rounded-xl flex flex-col gap-2 items-center text-left">
      <div className="text-white bg-[#890b35] w-12 h-12 rounded-full flex items-center justify-center text-2xl">
        !
      </div>
      <h2 className="text-[#890b35] text-xl  text-center">{title}</h2>
      <p className=" text-[#890b35] text-sm text-center ">{message}</p>
    </div>
  );
}
export default ErrorBlock;
