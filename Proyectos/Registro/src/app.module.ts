import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {TypeOrmModule} from '@nestjs/typeorm';
import { ParticipanteEntity } from './participante/participante.entity';
import {ParticipanteModule} from './participante/participante.module';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 32769,
        database: 'registros',
        username: 'alex',
        password: '123456',
        synchronize: true,
        dropSchema: false,
        entities: [
          ParticipanteEntity,
          UsuarioEntity
        ]
      }
    ),
    ParticipanteModule,
    UsuarioModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {

}
