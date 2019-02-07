import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

//import * as httpserve from 'http-server';

//console.log(httpserve);

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser('Max super perro',//secreto
        {
        //opciones
    }));
    await app.listen(3000);
}

bootstrap();
