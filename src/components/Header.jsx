import React from "react";
import SparklesText from "./ui/sparkles-text";

const Header = () => {
  return (
    <div className="flex justify-center items-center w-1/5 h-24 mt-2 mb-10 ">
      <div className="flex flex-col text-center font-semibold">
        <div className="flex justify-center items-center my-3">
          <SparklesText text="Notes App" />
        </div>
      </div>
    </div>
  );
};

export default Header;