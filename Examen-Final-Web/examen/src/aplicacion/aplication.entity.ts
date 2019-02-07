import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { RolEntity } from "src/rol/rol.entity";
import { RolesporusuarioEntity } from "src/rolesporusuario/rolesporusuario.entity";
import { SOEntity } from "src/sistemaoperativo/so.entity";


@Entity('aplicacion')
export class AplicacionEntity {

    @PrimaryGeneratedColumn()
    aplicacion_id: number;

    @Column()
    pesoenGigas: number;

    @Column()
    version: number;

    @Column()
    nombre: string;

    @Column()
    urldescarga: string;

    @Column()
    fechalanzamiento: Date;

    @Column()
    costo: number;

    @ManyToOne(
        type => SOEntity,
        aplicacion => aplicacion.so_id
    )
    so_id: SOEntity;


}