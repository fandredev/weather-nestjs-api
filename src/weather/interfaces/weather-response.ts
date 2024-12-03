export interface ResponseGeolocation {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface ResponseWeatherData {
  coord: {
    lon: number; // Longitude
    lat: number; // Latitude
  };
  weather: Array<{
    id: number; // Weather condition ID
    main: string; // Main weather (e.g., Clouds, Rain)
    description: string; // Weather description (e.g., broken clouds)
    icon: string; // Icon code
  }>;
  base: string; // Base station
  main: {
    temp: number; // Current temperature in Kelvin
    feels_like: number; // Feels-like temperature in Kelvin
    temp_min: number; // Minimum temperature in Kelvin
    temp_max: number; // Maximum temperature in Kelvin
    pressure: number; // Atmospheric pressure in hPa
    humidity: number; // Humidity in %
    sea_level?: number; // Atmospheric pressure at sea level in hPa
    grnd_level?: number; // Atmospheric pressure at ground level in hPa
  };
  visibility: number; // Visibility in meters
  wind: {
    speed: number; // Wind speed in m/s
    deg: number; // Wind direction in degrees
  };
  clouds: {
    all: number; // Cloudiness in %
  };
  dt: number; // Data calculation time (UNIX timestamp)
  sys: {
    type?: number; // Internal parameter
    id?: number; // Internal parameter
    country: string; // Country code
    sunrise: number; // Sunrise time (UNIX timestamp)
    sunset: number; // Sunset time (UNIX timestamp)
  };
  timezone: number; // Timezone offset in seconds
  id: number; // City ID
  name: string; // City name
  cod: number; // HTTP response code
}
