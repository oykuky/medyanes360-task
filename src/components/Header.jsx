import React from "react";
import SparklesText from "./ui/sparkles-text";

const Header = () => {
  return (
    <div className="bg-blue-400 flex justify-center items-center w-3/4 h-24 rounded-xl border-[4px] border-pink-700 mt-5 mb-10 ">
      <div className="flex flex-col text-center font-bold gap-5">
        <div className="flex justify-center items-center my-5">
          <SparklesText text="Notes App" />
        </div>
      </div>
    </div>
  );
};

export default Header;