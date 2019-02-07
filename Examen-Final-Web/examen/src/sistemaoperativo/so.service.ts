import {Injectable} from "@nestjs/common";


import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import { SOEntity } from "./so.entity";
import { SODto } from "./so.dto";


@Injectable()
export class SOService {
   
    constructor(
        @InjectRepository(SOEntity)
        private readonly _SORepository: Repository<SOEntity>,
    ) {
    }
    crear(sonuevo: SODto): Promise<SOEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const socreate: SOEntity = this._SORepository
            .create(sonuevo);

        // Metodo Save Guarda en la BDD
        return this._SORepository.save(socreate);

    }


}