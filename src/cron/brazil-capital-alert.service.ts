import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from 'src/weather/services/weather.service';

@Injectable()
export class BrazilCapitalAlertService implements OnModuleInit {
  private readonly logger = new Logger(BrazilCapitalAlertService.name);

  constructor(private readonly weatherService: WeatherService) {}

  onModuleInit() {
    this.logger.log('Every day at 10PM cron job scheduled');
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM, {
    name: 'sendDailyWeatherAlert',
  })
  async sendDailyWeatherAlert() {
    const city = 'Brasília';
    const state = 'DF';
    const cep = '70040-010';
    const geolocationDto = { city, state, cep };

    try {
      const { lat, long } =
        await this.weatherService.getCurrentGeolocation(geolocationDto);

      const { weather, main } =
        await this.weatherService.getCurrentWeatherByGeolocation({
          lat,
          long,
        });

      const temperature = main.temp.toPrecision(2);

      this.logger.log(
        `Clima em ${city}: ${weather[0].description}, ${temperature}°C`,
      );
    } catch (error) {
      this.logger.error('Erro ao buscar informações do clima:', error.message);
    }
  }
}
