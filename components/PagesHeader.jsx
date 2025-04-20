import Dropdown from "./UI/DropDown";

function PagesHeader({ title, dropDown, options }) {
  return (
    <header className="fixed top-0 mt-5">
      {title && <p className="font-semibold">{title}</p>}
      {dropDown && <Dropdown options={options} />}
    </header>
  );
}

export default PagesHeader;
