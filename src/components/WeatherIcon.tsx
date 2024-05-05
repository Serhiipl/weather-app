import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconName: string }
) {
  return (
    <div title={props.iconName} {...props} className={cn("relative h-20 w-20")}>
      <Image
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
        height={100}
        width={100}
        alt="weather-icon"
      />
    </div>
  );
}
