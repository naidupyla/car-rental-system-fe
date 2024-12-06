import React from "react";

const TextCar = ({ make, model }) => {
  return (
    <div key={make}>
      <h1>{make}</h1>
      <p>{model}</p>
    </div>
  );
};

export default TextCar;
