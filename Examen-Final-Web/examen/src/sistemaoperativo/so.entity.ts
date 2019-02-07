import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { AplicacionEntity } from "src/aplicacion/aplication.entity";


@Entity('sistemaoperativo')
export class SOEntity {

    @PrimaryGeneratedColumn()
    so_id: number;

    @Column()
    nombre: string;

    @Column()
    versionApi: string;

    @Column()
    fechalanzamiento: Date;

    @Column()
    pesoenGigas: string;

    @Column()
    instalado: string;

    @OneToMany(
        type => AplicacionEntity,  
        so => so.aplicacion_id
    )
    so: AplicacionEntity;


}