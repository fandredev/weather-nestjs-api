import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import {
  ResponseWeatherData,
  ResponseGeolocation,
} from '../interfaces/weather-response';
import WeatherGeolocationDTO from '../dto/weather.dto';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey =
      this.configService.get<string>('OPEN_WEATHER_API_KEY') ||
      process.env.OPEN_WEATHER_API_KEY;

    this.baseUrl =
      this.configService.get<string>('OPEN_WEATHER_API_BASE_URL') ||
      process.env.OPEN_WEATHER_API_BASE_URL;
  }

  async getCurrentGeolocation({ city, state, cep }: WeatherGeolocationDTO) {
    const [data] = await firstValueFrom(
      this.httpService
        .get(
          `${this.baseUrl}/geo/1.0/direct?q=${city},${state},${cep}&limit=1&appid=${this.apiKey}`,
        )
        .pipe(
          map((response: AxiosResponse<ResponseGeolocation[]>) => {
            return response.data;
          }),
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );

    return {
      lat: data.lat,
      long: data.lon,
      state: data.state,
      country: data.country,
    };
  }

  async getCurrentWeatherByGeolocation({
    lat,
    long,
  }: {
    lat: number;
    long: number;
  }): Promise<ResponseWeatherData> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${this.baseUrl}/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${this.apiKey}&lang=pt_br`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    return data;
  }
}
