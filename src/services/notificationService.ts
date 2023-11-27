import { Server, Socket } from 'socket.io';

class NotificationService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Socket connected: ${socket.id}`);
    });
  }

  public emitNotification(userId: string, message: string) {
    this.io.to(userId).emit('notification', message);
  }
}

export default NotificationService;
