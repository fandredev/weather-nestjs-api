import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { HttpService } from '@nestjs/axios';
import { WeatherController } from '../controllers/weather.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import WeatherGeolocationDTO from '../dto/weather.dto';
import { HttpStatus } from '@nestjs/common';

describe(`${WeatherService.name}`, () => {
  let service: WeatherService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        WeatherService,
        ConfigService,
        JwtService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('services should be defined when module testing is created and compiled', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });

  it(`should return geolocation data when #${WeatherService.prototype.getCurrentGeolocation.name} is called`, async () => {
    const mockResponse: AxiosResponse<any> = {
      data: [
        {
          lat: 40.7128,
          lon: -74.006,
          state: 'NY',
          country: 'US',
        },
      ],
      status: HttpStatus.OK,
      statusText: HttpStatus.OK.toString(),
      headers: {},
      config: {
        headers: null,
      },
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(mockResponse));

    const dto: WeatherGeolocationDTO = {
      city: 'New York',
      state: 'NY',
      cep: '10001',
    };

    const geolocation = await service.getCurrentGeolocation(dto);

    expect(geolocation).toEqual({
      lat: 40.7128,
      long: -74.006,
      state: 'NY',
      country: 'US',
    });
  });

  it(`should return weather data when #${WeatherService.prototype.getCurrentWeatherByGeolocation.name} is called`, async () => {
    const mockResponse: AxiosResponse<any> = {
      data: {
        weather: [{ description: 'clear sky' }],
        main: { temp: 293.15 },
      },
      status: HttpStatus.OK,
      statusText: HttpStatus.OK.toString(),
      headers: {},
      config: {
        headers: null,
      },
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(mockResponse));

    const geolocation = { lat: 40.7128, long: -74.006 };

    const currentWeather =
      await service.getCurrentWeatherByGeolocation(geolocation);

    expect(currentWeather).toEqual({
      weather: [{ description: 'clear sky' }],
      main: { temp: 293.15 },
    });
  });
});
