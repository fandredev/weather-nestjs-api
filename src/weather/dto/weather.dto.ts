import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsCep } from '../validators/cep-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class WeatherGeolocationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'City name',
    example: 'São Paulo',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @ApiProperty({
    description: 'State name',
    example: 'SP',
  })
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsCep()
  @ApiProperty({
    description: 'CEP number',
    example: '05535-050',
  })
  cep: string;
}
