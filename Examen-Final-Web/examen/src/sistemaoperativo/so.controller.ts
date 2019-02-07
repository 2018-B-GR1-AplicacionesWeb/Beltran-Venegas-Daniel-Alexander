import { Body, Controller, Get, Param, Post, Query, Res, BadRequestException } from "@nestjs/common";
import { SODto } from "./so.dto";
import { validate } from "class-validator";
import { SOService } from "./so.service";

@Controller('sistemaoperativo')
export class SOController {

    constructor(
        private soservice:SOService
    ) {
        
    }
    @Post('ingresoSO')
    async registrarsoController(
        @Body() sistemaoperativo: SODto,
        @Res() response,
    ) {
        console.log('valores que llego al sistema operativo',sistemaoperativo)
        const sistemaoperativonuevo : SODto= new SODto();
        sistemaoperativonuevo.nombre=sistemaoperativo.nombre;
        sistemaoperativonuevo.versionApi = sistemaoperativo.versionApi;
        sistemaoperativonuevo.pesoenGigas = sistemaoperativo.pesoenGigas;
        sistemaoperativonuevo.instalado= sistemaoperativo.instalado;
        sistemaoperativonuevo.fechalanzamiento= new Date(sistemaoperativo.fechalanzamiento);
        
        console.log('valores a ingresa',sistemaoperativonuevo)
        const arregloErrores = await validate(sistemaoperativonuevo)
        const existenErrores = arregloErrores.length > 0
        console.log(arregloErrores)
        if (existenErrores) {
            console.error('errores: creando al usuario', arregloErrores[0].constraints)
            response.render(
                'registroSO',
                {
                    mensaje: arregloErrores
                });
            throw new BadRequestException('Parametros incorrectos')
        }
        else {
            this.soservice.crear(sistemaoperativonuevo);
          
            response.render(
                'registroSO',
                {
                    mensajeok: sistemaoperativonuevo

                });
            return sistemaoperativonuevo;
        }

    }


}




