import { Injectable } from "@nestjs/common";


import { FindManyOptions, Repository, FindOneOptions } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { RolesporusuarioEntity } from "./rolesporusuario.entity";

@Injectable()
export class RolesporusuarioService {
    constructor(
        @InjectRepository(RolesporusuarioEntity)
        private readonly _rolesporusuarioRepository: Repository<RolesporusuarioEntity>,
    ) {
    }

    // async buscarRolesporusuario(usuario_id: number): Promise<RolesporusuarioEntity> {
    //     console.log('RESPPUESTA DE SERVICIO', usuario_id)
    //     const consulta: FindOneOptions<RolesporusuarioEntity> = {
    //         where: {
    //             usuarioUsuarioId: usuario_id
    //         }
    //     };

    //     const respuesta = await this._rolesporusuarioRepository.findOne(consulta);
        
    //     return respuesta;

    // }

    crear(rolesporusuriocrear: RolesporusuarioEntity): Promise<RolesporusuarioEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const rolesporusurioEntity: RolesporusuarioEntity = this._rolesporusuarioRepository
            .create(rolesporusuriocrear);

        // Metodo Save Guarda en la BDD
        return this._rolesporusuarioRepository.save(rolesporusurioEntity);

    }

    eliminar(rolesporusuario_iddelete: number): Promise<RolesporusuarioEntity> {

        const rolesporusuarioEliminar: RolesporusuarioEntity = this._rolesporusuarioRepository
            .create({
                rolesporusuarioid: rolesporusuario_iddelete
            });

        return this._rolesporusuarioRepository.remove(rolesporusuarioEliminar);
    }

    actualizar(rolesporusuarioU: RolesporusuarioEntity): Promise<RolesporusuarioEntity> {

        const rolesporusuarioUpdate: RolesporusuarioEntity = this._rolesporusuarioRepository
            .create(rolesporusuarioU);

        return this._rolesporusuarioRepository.save(rolesporusuarioUpdate);

    }
    buscarPorId(rolesporusurioid: number): Promise<RolesporusuarioEntity> {

        return this._rolesporusuarioRepository.findOne(rolesporusurioid);
    }


}