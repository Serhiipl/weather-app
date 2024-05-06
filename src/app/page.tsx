"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { WeatherData } from "@/types";
import { useQuery } from "react-query";
import React from "react";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import WeatherContainer from "@/components/WeatherContainer";
import WeatherIcon from "@/components/WeatherIcon";
import { getIconStyle } from "@/utils/getStyleIcons";
import DetailsWeather from "@/components/DetailsWeather";
import { metersToKilometers } from "@/utils/mToKm";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import fromUnixTime from "date-fns/fromUnixTime";
export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "weatherData",
    async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=gdansk&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&cnt=56`
        );
        return response.data;
      } catch (error) {
        throw new Error("An error occurred while fetching weather data.");
      }
    }
  );
  console.log("data", data);
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (error) return "An error has occurred: ";

  const todayWeather = data?.list[0];
  const formattedDate = todayWeather
    ? format(parseISO(todayWeather.dt_txt), "EEEE dd.MM.yyyy")
    : "";
  const temperature = todayWeather ? Math.round(todayWeather.main.temp) : "";
  const feels = todayWeather ? Math.round(todayWeather.main.feels_like) : "";
  const maxTemp = todayWeather ? Math.round(todayWeather.main.temp_max) : "";
  const minTemp = todayWeather ? Math.round(todayWeather.main.temp_min) : "";
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex flex-col gap-9 w-full mx-auto px-3 pb-10 pt-4">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p className="text-xl">{formattedDate}</p>
            </h2>
            <WeatherContainer className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4 gap-2 justify-center items-center">
                <div className="text-5xl">{temperature}°</div>
                <p className="text-sm space-x-1 whitespace-normal text-nowrap">
                  <span>Feels like {feels}°</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>{minTemp}°↓ </span>
                  <span> {maxTemp}°↑</span>
                </p>
              </div>
              {/* time & weather icon */}
              <div className="flex justify-between pr-3 gap-10 sm:gap-16 overflow-x-auto w-full">
                {data?.list.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="text-sm">
                      {format(parseISO(data.dt_txt), "H:mm")}
                    </p>
                    {/* <WeatherIcon iconName={data.weather[0].icon} /> */}
                    <WeatherIcon
                      iconName={getIconStyle(data.weather[0].icon, data.dt_txt)}
                    />
                    <p>{data?.main.temp.toFixed() ?? 0}°</p>
                  </div>
                ))}
              </div>
            </WeatherContainer>
          </div>
          <div className="flex gap-4">
            <WeatherContainer className="flex-col justify-center items-center w-fit px-4">
              <p className="capitalize text-center">
                {todayWeather?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={getIconStyle(
                  todayWeather?.weather[0].icon ?? "",
                  todayWeather?.dt_txt ?? ""
                )}
              />
            </WeatherContainer>
            <WeatherContainer className="justify-between gap-4 px-6 bg-yellow-200/80">
              <DetailsWeather
                visibility={metersToKilometers(
                  todayWeather?.visibility ?? 10000
                )}
                airPressure={`${todayWeather?.main.pressure} hPa`}
                humidity={`${todayWeather?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1714964212),
                  "H:mm"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702949452),
                  "H:mm"
                )}
                windSpeed={convertWindSpeed(todayWeather?.wind.speed ?? 1.64)}
              />
            </WeatherContainer>
          </div>
        </section>
        {/* 7 day forecast data */}
        <section className="flex flex-col gap-2 w-full">
          <p className="text-2xl">Forecast (7 days)</p>
        </section>
      </main>
    </div>
  );
}
