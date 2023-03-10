import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'DETAIL_COMMUNICATION',
      transport: Transport.TCP
    },
    {
      name: 'PAYMENT_COMMUNICATION',
      transport: Transport.TCP,
      options: { port : 3334 }
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
