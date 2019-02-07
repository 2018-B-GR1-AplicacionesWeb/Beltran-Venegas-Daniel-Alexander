// BDD Ya existe -> synchronize:false
// BDD No existe -> synchronize:true

import {Column, Entity, PrimaryGeneratedColumn, Index, OneToMany, BeforeInsert} from "typeorm";
import {PaginaEntity} from "../pagina/pagina.entity";


@Entity('noticia')
export class NoticiaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        name: 'titulo_noticia',
        type: 'varchar',
        length: 50
    })
    titulo: String;

    @Column({
        name: 'descripcion_noticia',
        type: 'text',
        nullable: true
    })
    descripcion: String;

    @OneToMany(
        type => PaginaEntity, //qoe tabla vamos a relcionar

        pagina => pagina.noticia // campo que hce referencia
    )
    paginas: PaginaEntity[];

    @BeforeInsert() //triger
    primerConsole() {

        console.log('esta es le primer console');
    }

    @BeforeInsert()
    segundoConsole() {

        console.log('el titulo es ${this.titulo}');
    }


}