import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import WeatherGeolocationDTO from '../dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getCurrentWeatherByCity(@Body() geolocationDto: WeatherGeolocationDTO) {
    const { lat, long } =
      await this.weatherService.getCurrentGeolocation(geolocationDto);

    return await this.weatherService.getCurrentWeatherByGeolocation({
      lat,
      long,
    });
  }
}
