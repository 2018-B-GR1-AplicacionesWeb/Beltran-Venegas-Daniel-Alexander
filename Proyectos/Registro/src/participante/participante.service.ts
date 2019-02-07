import {Injectable} from "@nestjs/common";
import {Participante} from "../app.controller";
import {ParticipanteEntity} from './participante.entity';
import {FindManyOptions, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ParticipanteService {
  arreglo: Participante[] = [
    {
      id: 1,
      nombre: 'Alex',
      direccion: 'Carapungo',
      telefono: '1234567890',
      edad: 27,
      talla: 'S'
    },
    {
      id: 2,
      nombre: 'Edwin',
      direccion: 'Solanda',
      telefono: '132456789',
      edad: 42,
      talla: 'L'
    }
  ];
  numeroRegistro = 2;

  constructor(
    @InjectRepository(ParticipanteEntity)
    private readonly _participanteRepository: Repository<ParticipanteEntity>,
  ) {
  }

  buscar(parametrosBusqueda?: FindManyOptions<ParticipanteEntity>)
    : Promise<ParticipanteEntity[]> {
    return this._participanteRepository.find(parametrosBusqueda);
  }

  crear(participante: Participante): Promise<ParticipanteEntity>{
    const participanteEntity : ParticipanteEntity = this._participanteRepository
      .create(participante);

    return this._participanteRepository.save(participanteEntity);
  }

  eliminar(idParticipante: number): Promise<ParticipanteEntity> {
    const participanteEliminar : ParticipanteEntity = this._participanteRepository
      .create({
        id: idParticipante
      });
    return this._participanteRepository.remove(participanteEliminar);
  }

  actualizar(nuevoParticipante: Participante): Promise<ParticipanteEntity> {
    const participanteEntity: ParticipanteEntity = this._participanteRepository
      .create(nuevoParticipante);

    return this._participanteRepository.save(participanteEntity);
  }

  buscarPorId(idParticipante: number): Promise<ParticipanteEntity> {
    return this._participanteRepository.findOne(idParticipante);
  }

}