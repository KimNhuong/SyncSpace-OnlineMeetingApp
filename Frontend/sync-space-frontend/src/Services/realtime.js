import { io } from "socket.io-client";
import SimplePeer from "simple-peer";

// Khởi tạo socket và các hàm realtime chung
class RealtimeService {
  constructor(serverUrl, token) {
    this.socket = io(serverUrl, {
      auth: { token },
    });
    this.peers = {};
  }

  joinRoom(roomCode) {
    this.socket.emit("JoinRoom", { code: roomCode });
  }

  onUserConnected(callback) {
    this.socket.on("user-connected", callback);
  }

  onSignal(callback) {
    this.socket.on("signal", callback);
  }

  onUserDisconnected(callback) {
    this.socket.on("user-disconnected", callback);
  }

  onRoomMessage(callback) {
    this.socket.on("roomMessage", callback);
  }

  sendSignal(to, signal) {
    this.socket.emit("signal", { to, signal });
  }

  sendMessage(roomCode, message, sender) {
    this.socket.emit("SendMessage", { code: roomCode, message, sender });
  }

  disconnect() {
    this.socket.disconnect();
  }

  // Peer logic có thể tách riêng nếu muốn
  createPeer(userId, stream, onSignal, onStream, onError) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream || undefined,
    });
    peer.on("signal", (signal) => onSignal(userId, signal));
    peer.on("stream", onStream);
    peer.on("error", onError);
    this.peers[userId] = peer;
    return peer;
  }

  addPeer(incomingSignal, userId, stream, onSignal, onStream, onError) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream || undefined,
    });
    peer.on("signal", (signal) => onSignal(userId, signal));
    peer.on("stream", onStream);
    peer.on("error", onError);
    peer.signal(incomingSignal);
    this.peers[userId] = peer;
    return peer;
  }

  destroyPeer(userId) {
    if (this.peers[userId]) {
      this.peers[userId].destroy();
      delete this.peers[userId];
    }
  }

  destroyAllPeers() {
    Object.values(this.peers).forEach((peer) => peer.destroy());
    this.peers = {};
  }
}

export default RealtimeService;
