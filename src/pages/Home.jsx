import React, { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import CarCard from "../components/Shared/cards/CarCard";
import TextCar from "../components/Shared/cards/TextCar";
import "../styles/home.css";
import axiosInstance from "../services/base";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8000/api/cars")
      .then((res) => {
        console.log(res);
        setCars(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MainLayout>
      <div className="car-grid">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
