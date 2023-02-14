import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: CreateUserRequest[] = []

  constructor(
    @Inject('DETAIL_COMMUNICATION') private readonly detailClient: ClientProxy,
    @Inject('PAYMENT_COMMUNICATION') private readonly paymentClient: ClientProxy
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest)
    this.detailClient.emit('user_created', new CreateUserEvent(createUserRequest.email))
    this.paymentClient.emit('user_created', new CreateUserEvent(createUserRequest.email))
  }

  getAnalytics() {
    return this.paymentClient.send({ cmd: 'get_analytics' }, {});
  }
}
