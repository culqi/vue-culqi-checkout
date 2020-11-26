import * as Vue from 'vue';
import { SubOptions, Token } from '.';

declare module 'vue/types/vue' {
  interface Vue {
    $culqi: {
      openCheckout: (options?: SubOptions) => Promise<Token>,
    };
  }
}
