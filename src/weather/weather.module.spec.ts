import { Test, TestingModule } from '@nestjs/testing';
import { WeatherModule } from './weather.module';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe(`${WeatherModule.name}`, () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [WeatherController],
      providers: [WeatherService, ConfigService, JwtService],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it(`should have the modules when module is loaded`, () => {
    expect(weatherController).toBeDefined();
    expect(weatherService).toBeDefined();
  });
});
