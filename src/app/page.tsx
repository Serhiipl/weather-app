"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { WeatherData } from "@/types";
import { useQuery } from "react-query";
import React from "react";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "weatherData",
    async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
        );
        return response.data;
      } catch (error) {
        throw new Error("An error occurred while fetching weather data.");
      }
    }
  );
  console.log("data", data?.city.timezone);
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (error) return "An error has occurred: ";
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex flex-col gap-9 w-full mx-auto px-3 pb-10 pt-4"></main>
    </div>
  );
}
