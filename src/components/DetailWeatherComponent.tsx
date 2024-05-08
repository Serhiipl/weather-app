import React from "react";
import WeatherContainer from "./WeatherContainer";
import WeatherIcon from "./WeatherIcon";
import { IForecastWeatherDetail } from "@/types";
import DetailsWeather from "./DetailsWeather";

export default function DetailWeatherComponent(props: IForecastWeatherDetail) {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <WeatherContainer className="gap-4">
      <section className="flex items-center gap-4 px-4">
        <div>
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>
        <div className="flex flex-col gap-2 items-center px-4">
          <span className="text-5xl">{temp}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{feels_like ?? 0}°</span>
          </p>
          <p className="text-sm text-center ">{description}</p>
          <div className="flex flex-nowrap gap-2 text-xs">
            <p>{temp_min}</p>
            <p>{temp_max}</p>
          </div>
        </div>
      </section>
      <section className="flex justify-between gap-4 w-full px-4 pr-10 overflow-x-auto-auto">
        <DetailsWeather {...props} />
      </section>
    </WeatherContainer>
  );
}
