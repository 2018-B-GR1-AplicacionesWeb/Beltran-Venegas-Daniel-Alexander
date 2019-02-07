import {Injectable} from '@nestjs/common';
import {Usuario} from './app.controller';

@Injectable()
export class AppService {
    bdd: Usuario [] = [];//luego le remplazamos por Json

    crearUsuario(usuario: Usuario) {//se necesita resibir un usuario de tipo Usuario
        this.bdd.push(usuario);
        return this.bdd;//devolbemos a la bdd para hacer cualquier cosa
    }

}
