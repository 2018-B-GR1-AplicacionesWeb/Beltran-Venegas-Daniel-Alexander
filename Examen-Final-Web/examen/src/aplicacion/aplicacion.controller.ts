import {Body, Controller, Get, Param, Post, Query, Res, BadRequestException} from "@nestjs/common";
import {FindManyOptions, Like} from "typeorm";
import { AplicacionService } from "./aplication.service";
import { AplicacionEntity } from "./aplication.entity";
import { validate } from "class-validator";

@Controller('aplicacion')
export class AplicacionController {

    constructor(
        private aplicacionservicio:AplicacionService
       ) {

    }
    @Post('ingresoaplicacion')
    async registraraplicacionController(
        @Body() aplicacion: AplicacionEntity,
        @Res() response,
    ) {

        const aplicacionnuevo = new AplicacionEntity();
        aplicacionnuevo.pesoenGigas=aplicacion.pesoenGigas;
        aplicacionnuevo.version=aplicacion.version
        aplicacionnuevo.nombre=aplicacion.nombre
        aplicacionnuevo.urldescarga=aplicacion.urldescarga
        aplicacionnuevo.fechalanzamiento=new Date(aplicacion.fechalanzamiento);
        aplicacionnuevo.costo=aplicacion.costo;

        const arregloErrores = await validate(aplicacionnuevo)
        const existenErrores = arregloErrores.length > 0
        console.log(arregloErrores)
        if (existenErrores) {
            console.error('errores: creando al usuario', arregloErrores[0].constraints)
            response.render(
                'registroAplicacion',
                {
                    mensaje: arregloErrores

                });

            throw new BadRequestException('Parametros incorrectos')
        }
        else {
            this.aplicacionservicio.crear(aplicacionnuevo);
            console.log('variable fecha naciemineto', aplicacionnuevo)
            response.render(
                'registroAplicacion',
                {
                    mensajeok: aplicacionnuevo

                });
            return aplicacionnuevo;
        }

    }

   
}




