import { Body, Controller, Get, Param, Post, Query, Res, BadRequestException } from "@nestjs/common";
import { FindManyOptions, Like } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";
import { validate } from "class-validator";
import { UsuarioDto } from "./usuario.dto";
import { RolesporusuarioService } from "src/rolesporusuario/rolesporusuario.service";

@Controller('usuario')
export class UsuarioController {

    constructor(
        private userservice: UsuarioService,
       
    ) {

    }
    @Post('ingresarusuario')
    async registrarusuarioController(
        @Body() usuario: UsuarioEntity,
        @Res() response,
    ) {
        console.log('valor nombre', usuario)

        const usuarionuevo = new UsuarioDto();
        usuarionuevo.usuario_id = usuario.usuario_id;
        usuarionuevo.password = usuario.password;
        usuarionuevo.nombre = usuario.nombre;
        usuarionuevo.fecha_nacimiento = new Date(usuario.fecha_nacimiento);
        usuarionuevo.correo = usuario.correo;
        const arregloErrores = await validate(usuarionuevo)
        const existenErrores = arregloErrores.length > 0
        console.log(arregloErrores)
        if (existenErrores) {
            console.error('errores: creando al usuario', arregloErrores[0].constraints)
            response.render(
                'register',
                {
                    mensaje: arregloErrores

                });

            throw new BadRequestException('Parametros incorrectos')
        }
        else {
            this.userservice.crear(usuarionuevo);            
            response.render(
                'register',
                {
                    mensajeok: usuarionuevo

                });
            return usuarionuevo;
        }

    }
    @Post('login')
    async autentificarController(
        @Body('correo') correo:string,
        @Body('password') password:string,
        @Res() response
    ): Promise<UsuarioEntity> {
        console.log('valor de correo', correo)
        console.log('valor de pasword', password)
        const usuarioEncontrado = await this.userservice.autenticar(correo,password);
      
        if (usuarioEncontrado) {
            const esPasswordCorrecto = usuarioEncontrado.password == password
            if (esPasswordCorrecto) {
                // const rolporusuario=this.rolesporusuarioservice.buscarRolesporusuario(usuarioEncontrado.usuario_id);
                // console.log('valores de respuesta',rolporusuario)
                 response.render(
                    'addroles',
                    {
                        mensajeok: usuarioEncontrado
    
                    });

                return usuarioEncontrado;
            }
            else {
                console.error('intento fallido:  paassword incorrecto', password)
               
                throw new BadRequestException('error loguin')
            }
        }
        else {
            console.error('intento fallido:  no existe usuario', correo)
            response.render(
                'login',
                {
                    mensajeerror: 'intento fallido:  no existe usuario', correo

                });

            throw new BadRequestException('error loguin')
        }
       

    }

}



