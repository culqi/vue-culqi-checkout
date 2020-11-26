import { PluginObject } from 'vue/types/plugin';
import { VueConstructor } from 'vue/types/vue';
import { Options, Token } from '../types';

const plugin: PluginObject<Options> = {
  install(Vue: VueConstructor, options?) {
    const vue = Vue;

    this.loadScript('culqi-lib')
      .then((win: Window) => {
        if (win.Culqi && options) {
          win.Culqi.publicKey = options.publicKey;

          let qResolve: (token: Token) => void;
          let qReject: (error: Error) => void;

          win.culqi = () => {
            if (win.Culqi?.token) {
              qResolve(win.Culqi?.token);
            } else {
              qReject(new Error(win.Culqi?.error?.user_message));
            }
          };

          vue.prototype.$culqi = {
            openCheckout(subOptions: Record<string, unknown> = {}): Promise<Token> {
              win.Culqi?.settings({
                ...options,
                ...subOptions,
              });

              win.Culqi?.open();

              return new Promise((resolve, reject) => {
                qResolve = resolve;
                qReject = reject;
              });
            },
          };
        }
      })
      .catch(window.alert);
  },
  loadScript(id: string): Promise<Window> {
    return new Promise((resolve, reject) => {
      let c = 0;
      const win = window;

      if (!document.getElementById(id)) {
        const doc = document;
        const script = doc.createElement('script');
        script.async = true;
        script.src = 'https://checkout.culqi.com/js/v3';
        script.id = id;
        doc.body.appendChild(script);
      }

      const checkCulqi = setInterval(() => {
        c += 1;
        if (c > 10) {
          clearInterval(checkCulqi);
          reject(new Error('The Culqi plugin could not be loaded.'));
        }
        if (win.Culqi) {
          clearInterval(checkCulqi);
          resolve(win);
        }
      }, 1000);
    });
  },
};

export default plugin;
