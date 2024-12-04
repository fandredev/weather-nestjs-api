import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { BrazilCapitalAlertModule } from './brazil-capital-alert.module';
import { BrazilCapitalAlertService } from './brazil-capital-alert.service';
import { WeatherService } from 'src/weather/services/weather.service';

describe(`${BrazilCapitalAlertModule.name}`, () => {
  let service: BrazilCapitalAlertService;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        BrazilCapitalAlertService,
        {
          provide: WeatherService,
          useValue: {
            getCurrentGeolocation: jest.fn(),
            getCurrentWeatherByGeolocation: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BrazilCapitalAlertService>(BrazilCapitalAlertService);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it(`should have the modules when module is loaded`, () => {
    expect(service).toBeDefined();
    expect(weatherService).toBeDefined();
  });
});
