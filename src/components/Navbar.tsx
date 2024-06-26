"use client";
import React, { useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { MdMyLocation, MdWbSunny } from "react-icons/md";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/app/atom";

type Props = { location?: string };

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }
  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
    setPlace(city);
    setCity("");
  }
  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
        setCity("");
      }, 200);
    }
  }
  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 300);
        } catch (error) {
          setLoadingCity(false);
        }
        console.log("response", setPlace);
      });
    }
  }
  return (
    <nav className="top-0 left-0 sticky z-50 shadow-sm bg-white w-full backdrop-filter backdrop-blur-sm bg-opacity-80">
      <div className="flex justify-evenly items-center w-full sm:h-[5rem] sm:flex-nowrap max-w-md sm:max-w-7xl px-3 mx-auto flex-wrap">
        <div className="flex justify-between px-2 sm:px-4 py-3 w-full">
          <div className="flex items-center justify-center gap-2">
            {/* чого не H1? */}
            <h1 className="text-gray-500 text-xl sm:text-3xl">
              {" "}
              Sergio&apos;s Weather
            </h1>
            <MdWbSunny className="text-xl sm:text-3xl mt-1 text-yellow-500" />
          </div>
          {/*  */}
          <div className="flex items-center gap-1 pr-1 sm:px-2">
            <MdMyLocation
              title="Your Current Location"
              onClick={handleCurrentLocation}
              className="text-xl sm:text-3xl text-gray-500 hover:opacity-80 cursor-pointer"
            />
            <ImLocation2 className="text-xl sm:text-3xl text-gray-500 hover:opacity-80 cursor-pointer" />
            <p className="text-slate-900/80 text-lg">{location}</p>
          </div>
        </div>
        <section className="flex sm:items-center justify-end min-w-[400px] py-4 px-2 sm:py-0 sm:min-w-min">
          <div className="relative">
            {/* search */}
            <SearchBar
              value={city}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmitSearch}
            />
            <SuggestionsBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

function SuggestionsBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul
          className="absolute flex flex-col gap-1 px-2 py-2 mb-4 bg-white border
      top-[2.75rem] left-0 border-gray-300 rounded-md min-w-[12.5rem]"
        >
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
          <li className="cursor-pointer p-1 rounded hover:bg-gray-200"></li>
        </ul>
      )}
    </>
  );
}
