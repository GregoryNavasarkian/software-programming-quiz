import React from "react";

const NavButton = (props) => {
  return (
    <button className="bg-slate-700 text-slate-50 py-2 px-6 rounded shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out">
      <span className="text-xl text-slate-50">{props.children}</span>
    </button>
  );
};

export default NavButton;
