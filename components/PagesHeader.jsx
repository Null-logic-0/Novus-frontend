import Dropdown from "./UI/DropDown";

function PagesHeader({ title, dropDown, options }) {
  return (
    <header className=" max-md:hidden">
      {title && <p className="font-semibold">{title}</p>}
      {dropDown && <Dropdown options={options} />}
    </header>
  );
}

export default PagesHeader;
