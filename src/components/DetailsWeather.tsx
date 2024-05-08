import { ISingleWeatherDetails, IDetailsWeather } from "@/types";
import React from "react";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { ImMeter } from "react-icons/im";
import { RiWaterPercentFill } from "react-icons/ri";
import { TbWindsock } from "react-icons/tb";

function SingleWeatherDetails(props: ISingleWeatherDetails) {
  return (
    <div className="flex flex-col justify-between items-center gap-2 text-xs font-semibold text-gray-700/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}

export default function DetailsWeather(props: IDetailsWeather) {
  return (
    <>
      <SingleWeatherDetails
        information="Visibility"
        icon={<FaRegEye />}
        value={props.visibility?.toString() ?? ""}
      />
      <SingleWeatherDetails
        information="Humidity"
        icon={<RiWaterPercentFill />}
        value={props.humidity}
      />
      <SingleWeatherDetails
        information="Wind speed"
        icon={<TbWindsock />}
        value={props.windSpeed}
      />
      <SingleWeatherDetails
        information="Air pressure"
        icon={<ImMeter />}
        value={props.airPressure}
      />
      <SingleWeatherDetails
        information="Sunrise"
        icon={<BsFillSunriseFill />}
        value={props.sunrise}
      />
      <SingleWeatherDetails
        information="Sunset"
        icon={<BsFillSunsetFill />}
        value={props.sunset}
      />
    </>
  );
}
