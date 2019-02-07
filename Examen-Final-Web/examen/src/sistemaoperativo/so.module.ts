import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';
import { SOEntity } from "./so.entity";
import { SOService } from "./so.service";
import { SOController } from "./so.controller";

@Module(
    {
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        SOEntity
                    ])
        ],
        controllers: [
            SOController
        ],
        providers: [
            SOService
        ],
        exports: [
          
        ]
    }
)
export class SOModule {
}







