import {Module} from "@nestjs/common";
import {ParticipanteEntity} from './participante.entity';
import {ParticipanteService} from './participante.service';
import {ParticipanteController} from './participante.controller';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module(
  {
    imports: [
      TypeOrmModule
        .forFeature(
          [
            ParticipanteEntity
          ])
    ],
    controllers: [
      ParticipanteController
    ],
    providers: [
      ParticipanteService
    ],
    exports: [
      ParticipanteService
    ]
  }
)
export class ParticipanteModule {
  
}