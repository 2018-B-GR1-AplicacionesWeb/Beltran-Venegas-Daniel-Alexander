import { Injectable } from "@nestjs/common";


import { FindManyOptions, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { AplicacionEntity } from "./aplication.entity";


@Injectable()
export class AplicacionService {

    constructor(
        @InjectRepository(AplicacionEntity)
        private readonly _aplicacionRepository: Repository<AplicacionEntity>,
    ) {
    }
    crear(aplicacionnuevo: AplicacionEntity): Promise<AplicacionEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const aplicacioncreate: AplicacionEntity = this._aplicacionRepository
            .create(aplicacionnuevo);

        // Metodo Save Guarda en la BDD
        return this._aplicacionRepository.save(aplicacioncreate);

    }




}