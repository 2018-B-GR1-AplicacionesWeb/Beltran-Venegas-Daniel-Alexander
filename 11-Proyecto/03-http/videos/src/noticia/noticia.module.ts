import {Module} from "@nestjs/common";
import {NoticiaController} from "./noticia.controller";
import {NoticiaService} from "./noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia-entity";

@Module(
    {
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        NoticiaEntity
                    ])
        ],
        controllers: [
            NoticiaController
        ],
        providers: [
            NoticiaService
        ],
        exports: [
            // Servicios o Modulos a Compartirse
            NoticiaService
        ]
    }
)
export class NoticiaModule {

}


////////
// Noticia
// NoticiaService

// Principal
// AppService













