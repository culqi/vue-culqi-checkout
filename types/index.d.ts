import { PluginObject } from 'vue/types/plugin';

import './global';
import './plugin';

export type Token = {
  active: boolean;
  card_number: string;
  client: Record<string, unknown>;
  creation_date: number;
  email: string;
  id: string;
  iin: Record<string, unknown>;
  last_four: string;
  metadata: Record<string, unknown>;
  object: string;
  type: string;
};

export type SubOptions = Partial<{
  title: string;
  currency: 'PEN' | 'USD';
  description: string;
  amount: number;
}>;

export type Options = {
  publicKey: string;
} & Required<SubOptions>;

declare const plugin: PluginObject<Options>;
export default plugin;
