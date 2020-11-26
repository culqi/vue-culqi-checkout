import { Token } from '.';

export {}

declare global {
  interface Window {
    Culqi?: {
      publicKey: string;
      settings: (options: Record<string, unknown>) => void;
      open: () => void;
      token?: Token;
      error?: {
        user_message: string;
      };
    },
    culqi?: () => void;
  }
}
