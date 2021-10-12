import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'
@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('AppGateway');
  afterInit(server: Server) {
    this.logger.log('Initialized');
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client Connected ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected ${client.id}`);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, text: string): void {
    // return { event: 'messageToClient', data: text };
    this.wss.emit('messageToClient', text);
  }
}
