import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {Participante} from "../app.controller";
import {ParticipanteService} from "./participante.service";
import {ParticipanteEntity} from './participante.entity';
import {FindManyOptions, Like} from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { validate, ValidationError } from 'class-validator';

@Controller('participante')
export class ParticipanteController {
  constructor(private  readonly _participanteService: ParticipanteService) {
  }

  @Get('inicio')
  async inicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('participante') participante: string,
  ) {
    let mensaje = undefined;
    let clase = undefined;

    if (accion && participante) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${participante} eliminado`;
          clase = 'alert alert-danger';
          break;
        case 'actualizar':
          mensaje = `Registro ${participante} actualizado`;
          clase = 'alert alert-info';
          break;
        case 'crear':
          mensaje = `Registro ${participante} creado`;
          clase = 'alert alert-success';
          break;
      }
    }

    let participantes: ParticipanteEntity[];
    if (busqueda){
      const consulta: FindManyOptions<ParticipanteEntity> = {
        where: [
          {
            participante: Like(`%${busqueda}%`)
          }
        ]
      };
      participantes = await this._participanteService.buscar(consulta);
    } else {
      participantes = await this._participanteService.buscar();
    }
    response.render(
      'inicio',
      {
        usuario: 'alex',
        arreglo: participantes,
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Post('eliminar/:idParticipante')
  async elminar(
    @Res() response,
    @Param('idParticipante') idParticipante: string,
  ) {
    const participante = await this._participanteService.buscarPorId(+idParticipante);
    await this._participanteService.eliminar(Number(idParticipante));
    const parametrosConsulta = `?accion=borrar&participante=${
      participante.nombre
    }`;
    response.redirect('/participante/inicio' + parametrosConsulta)
  }

  @Get('crear-participante')
  crearParticipanteRuta(
    @Res() response
  ) {
    response.render(
      'crear-participante'
    )
  }

  @Post('crear-participante')
  async crearParticipanteFuncioin(
    @Res() response,
    @Body() participante: Participante
  ) {
    const objetoValidacionParticipante = new CreateNoticiaDto();

    objetoValidacionParticipante.nombre = participante.nombre;
    objetoValidacionParticipante.direccion = participante.direccion;
    objetoValidacionParticipante.edad = +participante.edad;

    const errores: ValidationError[] = await validate(
      objetoValidacionParticipante);

    const hayErrores = errores.length>0;

    if (hayErrores){
      console.error(errores);
      throw new BadRequestException({mensaje: 'Error de validacion'})
    } else {
      const respuesta = await this._participanteService.crear(participante);

      const parametrosConsulta = `?accion=crear&participante=${participante.nombre}`

      response.redirect(
        '/participante/inicio' + parametrosConsulta
      );
    }
  }

  @Get('actualizar-participante/:idParticipante')
  async actulizarParticipanteVista(
    @Res() response,
    @Param('idParticipante') idParticipante: string,
  ) {
    const participanteEncontrado = await this._participanteService
      .buscarPorId(+idParticipante);

    response.render(
      'crear-participante',
      {
        participante: participanteEncontrado
      }
    )
  }

  @Post('actualizar-participante/:idParticipante')
  async actualizarParticipanteMetodo(
    @Res() response,
    @Param('idParticipante') idParticipante: string,
    @Body() participante: Participante
  ) {
    participante.id = +idParticipante;
    await this._participanteService.actualizar(participante);

    const parametrosConsulta = `?accion=actualizar&participante=${participante.nombre}`

    response.redirect(
      '/participante/inicio' + parametrosConsulta
    );
  }

}