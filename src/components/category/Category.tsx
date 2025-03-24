import React from "react";

type CategoryProps = {
  icon: React.ReactNode;
  title: string;
};

function Category({ icon, title }: CategoryProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-black rounded-full shadow-md">
        {icon}
      </div>

      <span className="mt-2 text-gray-700 font-medium">{title}</span>
    </div>
  );
}

export default Category;
