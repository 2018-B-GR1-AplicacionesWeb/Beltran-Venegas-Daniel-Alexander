import {IsNotEmpty, IsEmail, Matches, IsString, IsNumberString, IsNumber, IsEnum, IsOptional, Length} from 'class-validator'

export class AplicacionDto {
    
    // @IsNumber()
    aplicacion_id: number;

    @IsNotEmpty()
    @IsNumber()
    pesoenGigas:number;

    @IsNotEmpty()
    @IsNumber()
    version:number;

    @IsString()
    @IsNotEmpty()
    nombre: string; 

    @IsString()
    @IsNotEmpty()
    urldescarga: string;

    @IsNotEmpty()
    fechalanzamiento: Date;

    @IsNotEmpty()
    @IsNumber()
    costo: number;



    
}
