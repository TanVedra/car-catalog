export interface IConnectionOptions {
  databaseName?: string;
  connectionString: string;
  reconnectInterval: number;
}

interface IConnectionCallback {
  (): void;
}

export interface IConnection {
  connectToMongo: IConnectionCallback;
}

export enum CONNECTION_EVENTS {
  STOP = "stop", // custom event to close connection
  ERROR = "error",
  CONNECTED = "connected",
  RECONNECTED = "reconnected",
  DISCONNECTED = "disconnected",
}
