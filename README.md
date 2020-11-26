<p align="center">
  <h1 align="center">Vue Culqi Checkout 💳</h1>
</p>

Welcome to the Vue Culqi Checkout!

## Install

```bash
yarn add vue-culqi-checkout
```

```bash
npm install vue-culqi-checkout
```

## Import

javascript
```js
import CulqiCheckout from "vue-culqi-checkout";

Vue.use(CulqiCheckout, {
  publicKey: "INSERTE_SU_LLAVE_PUBLICA",
  title: "Mi tiendita",
  currency: "PEN",
  description: "Mi super venta",
  amount: 500
});
```
typescript
```ts
import CulqiCheckout, { Options } from "vue-culqi-checkout";

Vue.use<Options>(CulqiCheckout, {
  publicKey: "INSERTE_SU_LLAVE_PUBLICA",
  title: "Mi tiendita",
  currency: "PEN",
  description: "Mi super venta",
  amount: 500
});
```

## Usage

```html
<template>
  <div id="app">
    <button @click="pay">Pagar</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  async pay() {
    const token = await this.$culqi.openCheckout();
    console.log(token.id);
  }
}
</script>

```

### [Token object](https://apidocs.culqi.com/#/tokens)
