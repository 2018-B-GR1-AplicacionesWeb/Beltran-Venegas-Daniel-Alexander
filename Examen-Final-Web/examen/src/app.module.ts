import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesporusuarioEntity } from './rolesporusuario/rolesporusuario.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { RolEntity } from './rol/rol.entity';
import { RolesporusuarioModule } from './rolesporusuario/rolesporusurio.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SOModule } from './sistemaoperativo/so.module';
import { AplicacionModule } from './aplicacion/aplication.module';
import { SOEntity } from './sistemaoperativo/so.entity';
import { AplicacionEntity } from './aplicacion/aplication.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          database: 'sistemaoperativo',
          username: 'root',
          password: 'David2985.',
          synchronize: true,
          dropSchema: true,
          entities: [
            RolEntity,
            RolesporusuarioEntity,
            UsuarioEntity,
            SOEntity,
            AplicacionEntity
          ]
      }
  ),
  RolModule,
  RolesporusuarioModule,
  UsuarioModule,
  SOModule,
  AplicacionModule
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
