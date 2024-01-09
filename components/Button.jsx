import React from "react";

const Button = ({ label, type,action=null }) => {
  return (
    <button
      type={type}
      className=" bg-black text-white transition-all py-[0.5rem] border  px-3 rounded-lg text-md hover:bg-white hover:text-black"
    onClick={action}
    > 
    <span className=" hover:scale-150 transition-all">
      {label}
    </span>
    </button>
  );
};

export default Button;
