declare module 'midtrans-client' {
    export class Snap {
      constructor(config: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
      createTransaction(parameter: any): Promise<any>;
    }
  }