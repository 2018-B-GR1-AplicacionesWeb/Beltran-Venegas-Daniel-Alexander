import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNoticiaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsNumber()
  edad: number;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsString()
  talla: string;

}
