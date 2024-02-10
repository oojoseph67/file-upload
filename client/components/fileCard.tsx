import React from "react";

interface FileCardProps {
  name: string;
  price: string;
  imageUrl: string;
}

const FileCard: React.FC<FileCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-64">
      <img src={imageUrl} alt={name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h2 className="text-gray-800 font-semibold text-xl">{name}</h2>
        <p className="text-gray-600 mt-2">${price}</p>
      </div>
    </div>
  );
};

export default FileCard;
