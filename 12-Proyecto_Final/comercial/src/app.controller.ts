import {
    Body,
    Controller,
    Get,
    HttpCode,
    InternalServerErrorException,
    Param,
    Post,
    Query,
    Headers, UnauthorizedException, Req, Res, Session, Head
} from '@nestjs/common';
import {AppService} from './app.service';
import {get} from "https";
import {Observable, of} from "rxjs";
import {Request, Response} from "express";

@Controller()//decoradores
//Controlle('usuario')
//http://localhost:3000/usuario
export class AppController {
    constructor(private readonly _appService: AppService) {
    }

    @Get() // http://ip:puerto METODO QUE SE VA AJECUTAR DESDE EL NAVEGADOR
    //@Get('crear')
    // http://localhost:3000/usuario/crear?nombre=Javier
    @HttpCode(204)//status
    raiz(
        @Query()todosQueryParams: any, //{nombre:'Javier'}
        @Query('nombre')nombre: string,//mandar un QueryParam
    ): string {
        console.log(todosQueryParams);//nombre del método :raiz
        return 'hola mundo Ibarra' + nombre;
    }

    @Get('segmentoUno/segmentoDos/:idUsuario')//parametro de ruta
    // http://localhost:3000/usuario/segmentoUno/segmentoDos/pepito
    parametroRuta(
        @Param('idUsuario')id) {
        return id;
    }

    @Post('adiosMundo')
    @HttpCode(205)
    adiosMundoPost(): string {
        return 'adios mundo post';
    }

    @Get('adiosMundo') //url
    adiosMundo(): string {
        return 'adios mundo de quito';

    }

    @Get('adiosMundoPromesa') //url
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve('adios mundo con promesa ')
                }
            )
        };
        return promesaAdios();
    }


    @Get('adiosMundoAsync') //url
    @HttpCode(201)
    async adiosMundoAsync() {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('adios Mundo world ')
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            console.log(e);
            throw  new InternalServerErrorException({mensaje: 'Error del servidor'})
        }
    }

    @Get('adiosMundoObservable')
    adiosMundoObservable(): Observable<string> {//tipar
        const respueta$ = of('Adios Mundo');
        return respueta$;

    }

    @Post('crearUsuario')
    crearUsuario(
        @Body()usuario: Usuario, //nombre de la interface usuario
        @Body('nombre')nombre: string, //solo podemos recibir nombre
        @Headers() cabeceras,
        @Headers('seguridad') codigo,
        @Res() res: Response,
        @Req() req: Request | any,
    ) {
        //Crear Usuario
        console.log('Cookies', req.cookies);  // LEIDO
        console.log('Cookies', req.secret);
        console.log('Cookies Seguras', req.signedCookies);  // LEIDO
        console.log(usuario);
        console.log(cabeceras);//npm install cookie-parser

        if (codigo === '1234') { //seguridad en la cabecera

            const bdd = this._appService.crearUsuario(usuario);
            //"le agregamos al usuario a la base"
            res.append('token', '5678');
            res.cookie("app", "web");//insegura
            res.cookie("segura", "secreto", {

                signed: true,
            });

            res.json(bdd);

        } else {
            throw  new UnauthorizedException({
                mensaje: 'Error de autorización',
                error: 401
            })
        }


    }

}

export interface Usuario {
    nombre: string;

}




