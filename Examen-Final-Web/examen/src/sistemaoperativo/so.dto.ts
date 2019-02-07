import { IsNotEmpty, IsEmail, Matches, IsString, IsNumberString, IsNumber, IsEnum, IsOptional, Length } from 'class-validator'

export class SODto {


    so_id: number;


    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    // @IsNumber()
    versionApi: string;

    @IsNotEmpty()
    fechalanzamiento: Date;

    // @IsNumber()
    @IsNotEmpty()
    pesoenGigas: string


    @IsNotEmpty()
    instalado: string;


}
