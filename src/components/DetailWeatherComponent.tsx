import React from "react";
import WeatherContainer from "./WeatherContainer";
import WeatherIcon from "./WeatherIcon";
import { IForecastWeatherDetail } from "@/types";

export default function DetailWeatherComponent(props: IForecastWeatherDetail) {
  return (
    <WeatherContainer className="gap-4">
      <section className="flex items-center gap-4 px-4">
        <div>{/* <WeatherIcon iconName={} /> */}</div>
      </section>
    </WeatherContainer>
  );
}
