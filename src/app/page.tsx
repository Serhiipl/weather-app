"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { WeatherData, IDailyData } from "@/types";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import WeatherContainer from "@/components/WeatherContainer";
import WeatherIcon from "@/components/WeatherIcon";
import { getIconStyle } from "@/utils/getStyleIcons";
import DetailsWeather from "@/components/DetailsWeather";
import { metersToKilometers } from "@/utils/mToKm";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import fromUnixTime from "date-fns/fromUnixTime";
import DetailWeatherComponent from "@/components/DetailWeatherComponent";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import WeatherSkeleton from "@/components/WeatherSkeleton";
const backgroundImageURL = "/bg-image.webp";
export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "weatherData",
    async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&cnt=40`
        );
        return response.data;
      } catch (error) {
        throw new Error("An error occurred while fetching weather data.");
      }
    }
  );

  const [dailyData, setDailyData] = useState<IDailyData[]>([]);

  useEffect(() => {
    if (data) {
      const processedDailyData: IDailyData[] = [];

      const uniqueDates = [
        ...new Set(
          data.list.map(
            (item) => new Date(item.dt_txt).toISOString().split("T")[0]
          )
        ),
      ].sort();

      uniqueDates.forEach((date) => {
        const dayEntries = data.list.filter((entry) => {
          const entryDate = new Date(entry.dt * 1000)
            .toISOString()
            .split("T")[0];
          return entryDate === date;
        });

        const maxTemp = Math.max(...dayEntries.map((entry) => entry.main.temp));
        const minTemp = Math.min(...dayEntries.map((entry) => entry.main.temp));

        processedDailyData.push({
          maxTemp,
          minTemp,
        });
      });

      setDailyData(processedDailyData);
    }
    refetch();
  }, [data, place, refetch]);

  console.log("data", data);
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (error) return "An error has occurred ";

  const todayWeather = data?.list[0];
  const formattedDate = todayWeather
    ? format(parseISO(todayWeather.dt_txt), "EEEE dd.MM.yyyy")
    : "";
  const temperature = todayWeather ? Math.round(todayWeather.main.temp) : "";
  const feels = todayWeather ? Math.round(todayWeather.main.feels_like) : "";
  const maxTemp = todayWeather ? Math.round(todayWeather.main.temp_max) : "";
  const minTemp = todayWeather ? Math.round(todayWeather.main.temp_min) : "";

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (item) => new Date(item.dt_txt).toISOString().split("T")[0]
      )
    ),
  ];
  uniqueDates.pop();

  const firstDataForEachDay = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  // Отримання унікальних дат без часу
  // const uniqueDates = [
  //   ...new Set(
  //     data?.list.map((item) =>
  //       new Date(item.dt_txt).toISOString().substring(0, 10)
  //     )
  //   ),
  // ];
  // console.log("uniqueDates", uniqueDates);
  // // Вибір записів погоди після 00:00 години для кожного дня
  // const firstDataForEachDay = uniqueDates.map((date) => {
  //   return data?.list.filter((entry) => {
  //     const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
  //     const entryTime = new Date(entry.dt * 1000).getHours();
  //     return entryDate === date && entryTime >= 6;
  //   })[0]; // Вибір першого запису після 00:00 години для кожного дня
  // });

  return (
    <div
      className="flex flex-col gap-4 bg-gray-100 min-h-screen"
      style={{ backgroundImage: `url(${backgroundImageURL})` }}
    >
      <Navbar location={data?.city.name} />
      <main className="flex flex-col max-w-md sm:max-w-7xl  gap-9 w-full mx-auto px-3 pb-10 pt-4">
        {/* today data */}
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p className="text-xl">{formattedDate}</p>
                </h2>
                <WeatherContainer className="sm:gap-10 px-6 items-center backdrop-filter backdrop-blur-sm bg-opacity-70">
                  <div className="flex flex-col px-4 gap-2 justify-center items-center">
                    <div className="text-3xl sm:text-5xl font-semibold text-gray-800">
                      {temperature}°
                    </div>
                    <p className="text-xs sm:text-sm space-x-1 whitespace-normal text-nowrap">
                      <span>Feels like {feels}°</span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>{minTemp}°↓ </span>
                      <span> {maxTemp}°↑</span>
                    </p>
                  </div>
                  {/* time & weather icon */}
                  <div className="flex justify-between pr-3 gap-3 sm:gap-15 overflow-x-auto w-full">
                    {data?.list.slice(0, 11).map((data, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="text-sm">
                          {format(parseISO(data.dt_txt), "H:mm")}
                        </p>
                        {/* <WeatherIcon iconName={data.weather[0].icon} /> */}
                        <WeatherIcon
                          iconName={getIconStyle(
                            data.weather[0].icon,
                            data.dt_txt
                          )}
                        />
                        <p>{data?.main.temp.toFixed() ?? 0}°</p>
                      </div>
                    ))}
                  </div>
                </WeatherContainer>
              </div>
              <div className="flex gap-4">
                <WeatherContainer className="flex-col justify-center items-center w-fit px-4 backdrop-filter backdrop-blur-sm bg-opacity-70">
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
                <WeatherContainer className="justify-between gap-4 px-6 bg-yellow-200 overflow-x-auto backdrop-filter backdrop-blur-sm bg-opacity-70">
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
                    windSpeed={convertWindSpeed(
                      todayWeather?.wind.speed ?? 1.64
                    )}
                  />
                </WeatherContainer>
              </div>
            </section>
            {/* 5 day forecast data */}
            <section className="flex flex-col gap-2 sm:gap-7 w-full">
              <p className="text-2xl text-slate-300">Forecast (5 days)</p>
              {firstDataForEachDay.map((d, i) => (
                <DetailWeatherComponent
                  key={i}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={d?.weather[0].icon ?? "01d"}
                  date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
                  day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
                  feels_like={Math.round(d?.main.feels_like ?? 0)}
                  temp={`${Math.round(dailyData[i]?.maxTemp ?? 0)}`}
                  temp_min={`${Math.round(dailyData[i]?.minTemp ?? 0)} °↓`}
                  temp_max={`${Math.round(dailyData[i]?.maxTemp ?? 0)} °↑`}
                  airPressure={`${d?.main.pressure} hPa`}
                  humidity={`${d?.main.humidity}%`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1714964212),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1702949452),
                    "H:mm"
                  )}
                  visibility={metersToKilometers(d?.visibility ?? 10000)}
                  windSpeed={convertWindSpeed(d?.wind.speed ?? 1.64)}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
