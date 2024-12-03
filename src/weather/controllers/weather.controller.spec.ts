import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from '../services/weather.service';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker/.';

describe(`${WeatherController.name}`, () => {
  let controller: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getCurrentGeolocation: jest.fn(),
            getCurrentWeatherByGeolocation: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('services and controller should be defined when module testing is created and compiled', () => {
    expect(controller).toBeDefined();
    expect(weatherService).toBeDefined();
  });

  describe(`Tests for #${WeatherController.prototype.getCurrentWeatherByCity.name} method`, () => {
    it('should able return the current weather in determinate city when user pass the informations about your geolocation position', async () => {
      const geolocationDto = {
        city: faker.location.city(),
        state: faker.location.state({
          abbreviated: true,
        }),
        cep: faker.location.zipCode('#####-###'),
      };

      const responseCurrentGeolocation = {
        lat: faker.location.latitude(),
        long: faker.location.longitude(),
        state: faker.location.state({
          abbreviated: true,
        }),
        country: faker.location.country(),
      };

      const responseWeather = {
        coord: {
          lon: faker.location.latitude(),
          lat: faker.location.longitude(),
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02n',
          },
        ],
        base: 'stations',
        main: {
          temp: 301.06,
          feels_like: 303.52,
          temp_min: 301.06,
          temp_max: 301.06,
          pressure: 1011,
          humidity: 69,
          sea_level: 1011,
          grnd_level: 1009,
        },
        visibility: 10000,
        wind: {
          speed: 6.69,
          deg: 100,
        },
        clouds: {
          all: 20,
        },
        dt: 1733259035,
        sys: {
          type: 1,
          id: 8322,
          country: faker.location.state({
            abbreviated: true,
          }),
          sunrise: 1733212607,
          sunset: 1733258410,
        },
        timezone: -10800,
        id: 3471872,
        name: faker.location.city(),
        cod: 200,
      };

      jest
        .spyOn(weatherService, 'getCurrentGeolocation')
        .mockResolvedValue(responseCurrentGeolocation);
      jest
        .spyOn(weatherService, 'getCurrentWeatherByGeolocation')
        .mockResolvedValue(responseWeather);

      const getCurrentWeather =
        await controller.getCurrentWeatherByCity(geolocationDto);

      expect(getCurrentWeather).toEqual(responseWeather);
      expect(weatherService.getCurrentGeolocation).toHaveBeenCalledWith(
        geolocationDto,
      );
      expect(
        weatherService.getCurrentWeatherByGeolocation,
      ).toHaveBeenCalledWith({
        lat: responseCurrentGeolocation.lat,
        long: responseCurrentGeolocation.long,
      });
    });
  });
});
