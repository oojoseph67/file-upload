/* eslint-disable @next/next/no-img-element */
import React from "react";

interface Product {
  //   _id: string;
  name: string;
  price: number;
  image: string;
  //   __v: number;
}

interface FileCardProps {
  products: Product[];
}

const FileCard: React.FC<FileCardProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, index) => {
        const { name, image, price } = product;

        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={image}
              alt={name}
              className="h-40 w-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-700">${price.toFixed(2)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FileCard;
