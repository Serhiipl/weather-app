export interface IDailyData {
  maxTemp: number;
  minTemp: number;
}
export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: CityInfo;
}

export interface WeatherEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ISingleWeatherDetails {
  information: string;
  icon: React.ReactNode;
  value?: string;
}

export interface IDetailsWeather {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise?: string;
  sunset?: string;
}

export interface IForecastWeatherDetail extends IDetailsWeather {
  weatherIcon: string;
  date: string;
  day: string;
  temp: string;
  feels_like: number;
  temp_min: string;
  temp_max: string;
  description: string;
}

// export interface WeatherDetail {
//   dt: number;
//   main: {
//     temp: number;
//     feels_like: number;
//     temp_min: number;
//     temp_max: number;
//     pressure: number;
//     sea_level: number;
//     grnd_level: number;
//     humidity: number;
//     temp_kf: number;
//   };
//   weather: {
//     id: number;
//     main: string;
//     description: string;
//     icon: string;
//   }[];
//   clouds: {
//     all: number;
//   };
//   wind: {
//     speed: number;
//     deg: number;
//     gust: number;
//   };
//   visibility: number;
//   pop: number;
//   sys: {
//     pod: string;
//   };
//   dt_txt: string;
// }

// export interface WeatherData {
//   cod: string;
//   message: number;
//   cnt: number;
//   list: WeatherDetail[];
//   city: {
//     id: number;
//     name: string;
//     coord: {
//       lat: number;
//       lon: number;
//     };
//     country: string;
//     population: number;
//     timezone: number;
//     sunrise: number;
//     sunset: number;
//   };
// }
