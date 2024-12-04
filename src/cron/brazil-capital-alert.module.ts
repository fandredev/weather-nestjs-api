import { Module } from '@nestjs/common';
import { WeatherService } from 'src/weather/services/weather.service';
import { HttpModule } from '@nestjs/axios';
import { BrazilCapitalAlertService } from './brazil-capital-alert.service';

@Module({
  imports: [HttpModule],
  providers: [BrazilCapitalAlertService, WeatherService],
})
export class BrazilCapitalAlertModule {}
