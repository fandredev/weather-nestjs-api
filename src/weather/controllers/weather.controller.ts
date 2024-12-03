import { Body, Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import WeatherGeolocationDTO from '../dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current weather by city',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Weather returned successfully',
  })
  async getCurrentWeatherByCity(@Body() geolocationDto: WeatherGeolocationDTO) {
    const { lat, long } =
      await this.weatherService.getCurrentGeolocation(geolocationDto);

    return await this.weatherService.getCurrentWeatherByGeolocation({
      lat,
      long,
    });
  }
}
