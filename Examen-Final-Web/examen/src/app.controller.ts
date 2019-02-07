import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('inicio')
  LlamarVistaInicio( 
    @Res() res
    )
  {
    res.render('inicio');
  }
  @Get('login')
  LlamarVistaLogin( 
    @Res() res
    )
  {
    res.render('login');
  }
  @Get('register')
  LlamarVistaRegistro( 
    @Res() res
    )
  {
    res.render('register');
  }
  @Get('addroles')
  LlamarVistao( 
    @Res() res
    )
  {
    res.render('addroles');
  }
  @Get('tablausuariosconrol')
  LlamarVistatablausuariosconrol( 
    @Res() res
    )
  {
    res.render('tablausuariosconrol');
  }
  @Get('tablaeventos')
  LlamarVistatablaeventos( 
    @Res() res
    )
  {
    res.render('tablaeventos');
  }
  @Get('registroSO')
  LlamarVistaRegistrarSO( 
    @Res() res
    )
  {
    res.render('registroSO');
  }
  @Get('registroAplicacion')
  LlamarVistaRegistraAplicacion( 
    @Res() res
    )
  {
    res.render('registroAplicacion');
  }
}
