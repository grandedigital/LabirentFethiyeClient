import { useEffect, useRef, useState } from "react";

export default function FilterDropdown({
  label,
  options = [],
  allowSelectDefault = true,
  width = 170,
  customClassName = "",
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedItemId, setSelectedId] = useState(0);

  const menuRef = useRef(null);

  const handleMenu = () => {
    setMenuOpen((prevValue) => !prevValue);
  };

  const handleSelectMenuItem = (item) => {
    setSelectedId(item.id);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  }, []);

  return (
    <div
      onClick={handleMenu}
      ref={menuRef}
      className={`filterDropdownContainer${
        customClassName != "" ? ` ${customClassName}` : ""
      }${isMenuOpen ? " open" : ""}`}
      style={{ width: `${width}px` }}
    >
      <span className="filterTitle">
        {selectedItemId == 0
          ? label
          : options.find((item) => item.id == selectedItemId).option}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        className="filterIcon"
      >
        <rect
          width="7.09778"
          height="0.929424"
          transform="matrix(0.699772 0.714366 -0.310395 0.950607 0.288513 0)"
          fill="#525265"
        />
        <rect
          width="7.09778"
          height="0.929424"
          transform="matrix(0.699772 -0.714366 0.310395 0.950607 4.74469 5.11646)"
          fill="#525265"
        />
      </svg>
      {options.length > 0 && isMenuOpen && (
        <div className="menu">
          <ul>
            {allowSelectDefault && (
              <li
                onClick={() => setSelectedId(0)}
                className={selectedItemId == 0 ? "selected" : ""}
              >
                {label}
              </li>
            )}
            {options.map((item, index) => (
              <li
                onClick={() => handleSelectMenuItem(item)}
                key={index}
                className={selectedItemId == item.id ? "selected" : ""}
              >
                {item.option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
