import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';
import { AplicacionEntity } from "./aplication.entity";
import { AplicacionController } from "./aplicacion.controller";
import { AplicacionService } from "./aplication.service";


@Module(
    {
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        AplicacionEntity
                    ])
        ],
        controllers: [
            AplicacionController
        ],
        providers: [
            AplicacionService
        ],
        exports: [
          
        ]
    }
)
export class AplicacionModule {
}







