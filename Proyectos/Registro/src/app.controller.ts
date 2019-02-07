import {
    Headers,
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Param,
    Body,
    Head, UnauthorizedException, Req, Res, Session
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import {Request, Response} from 'express';
import {ParticipanteService} from './participante/participante.service';
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {

  constructor(private readonly _appService: AppService,
              private readonly _participanteService: ParticipanteService,
              private readonly _usuarioService: UsuarioService) {

  }

  @Get()
  @HttpCode(204)
  raiz(
    @Query() todosQueryParams: any,
    @Query('nombre') nombre: string,
  ): string {
    console.log(todosQueryParams);
    return 'Hola mundo' + nombre;
  }
  @Get('segmentoUno/segmentoDos/:idUsuario')
  parametroRuta(
    @Param('idUsuario') id
  ) {
    return id;
  }
  
  @Post('adiosMundo')
  adiosMundoPost(
    @Res() response,
  ) {
    response.render(
      'inicio',
      {
        usuario: 'alex',
        arreglo: [],
        booleano: true,
      }
    );
  }
  
  @Get('adiosMundoPromesa')
  adiosMundoPromesa(): Promise<string> {
    const promesaAdios = (): Promise<string> => {
        return new Promise(
          (resolve) => {
            resolve('Adios Mundo');
          }
        )
    };
    return promesaAdios();
  }
  
  @Get('adiosMundoAsync')
  @HttpCode(201)
  async adiosMundoAsync() {
    const promesaAdios = (): Promise<string> => {
        return new Promise(
          (resolve, reject) => {
            reject('Adios Mundo');
          } 
        )
    };
    try {
      const respuesta: string = await promesaAdios();
      return respuesta;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({mensaje: 'Error servidor'})
    }
  }
  
  @Get('adiosMundoObservable')
  adiosMundoObservable(): Observable<string> {
    const respuesta$ = of('Adios Mundo');
    return respuesta$;
  }
  
  @Post('crearUsuario')
  @HttpCode(200)
  crearUsuario(
    @Body() usuario: Usuario,
    @Body('nombre') nombre: string,
    @Headers() cabeceras,
    @Headers('seguridad') codigo,
    @Res() res: Response,
    @Req() req: Request | any,    
  ) {
    console.log('Cookies', req.cookies);
    console.log('Cookies', req.secret);
    console.log('Cookies Seguras', req.signedCookies);
    console.log(usuario);
    console.log(cabeceras);

    if (codigo === '1234') {
      const bdd = this._appService.crearUsuario(usuario);

      res.append('token', '5678');
      res.cookie("app", "registros")
      res.cookie("segura","secreto", {
          signed: true
      });
      res.json(bdd);
    } else {
      throw new UnauthorizedException({
        mensaje: 'Error de autorizacion',
        error: 401
      })
    }
  }

  @Get('login')
  mostrarLogin(
    @Res() res
  ) {
    res.render('login');
  }

  @Post('login')
  @HttpCode(200)
  async ejecutarLogin(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res,
    @Session() sesion
  ) {
    const respuesta = await this._usuarioService
      .autenticar(username, password);

    console.log(sesion);

    if (respuesta) {
      sesion.usuario = username;
      //res.send('ok');
      res.redirect('/participante/inicio');
    } else {
      res.redirect('login');
    }

  }


  @Get('logout')
  logout(
    @Res() res,
    @Session() sesion
  ) {
    sesion.username = undefined;
    sesion.destroy();
    res.redirect('login');
  }

}

export interface Usuario {
  nombre: string;
}

export interface Participante {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  edad: number;
  talla: string;
  //evento: string;
  //categoria: string;
}