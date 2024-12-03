import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsCep } from '../validators/cep-validator';

export default class WeatherGeolocationDTO {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsCep()
  cep: string;
}
