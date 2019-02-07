import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';

@Entity('participante')
export class ParticipanteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    name: 'nombre_participante',
    type: 'varchar',
    length: 25
  })
  nombre: string;

  @Column({
    name: 'direccion',
    type: 'varchar',
    length: 50
  })
  direccion: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    length: 10

  })
  telefono: string;

  @Column({
    name: 'edad',
    type: 'int',
  })
  edad: number;

  @Column({
    name: 'talla',
    type: 'varchar',
    length: 3
  })
  talla: string;


}