import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    // <Link to={`/add-booking`} className="car-link">
    <div className="car-card">
      <img src={car.image} alt={car.make} className="car-image" />
      <div className="car-details">
        <h2 className="car-title">{car?.make}</h2>
        <p className="car-model">{car?.model}</p>
        {/* <div className="features">
            <span>
              <i className="fa-solid fa-gas-pump"></i> {car?.fuelType}
            </span>
            <span>
              <i className="fa-solid fa-cogs"></i> {car?.transmission}
            </span>
            <span>
              <i className="fa-solid fa-tachometer-alt"></i> {car?.mileage} mi
            </span>
          </div> */}
        <p className="">{car?.description}</p>
        <p className="car-price">
          <i className="fa-solid fa-dollar-sign"></i> {car?.rate}
        </p>
        <Button variant="primary" href={`/customer/add-booking/${car?._id}`}>
          Book Now
        </Button>
      </div>
    </div>
    // </Link>
  );
};

export default CarCard;
