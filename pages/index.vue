<template>
  <section class="container">
    <!-- блок товаров -->
    <goods />

    <!-- блок корзины -->
    <cart />
  </section>
</template>

<script>
import axios from "axios";
import goods from "@/components/goods";
import cart from "@/components/cart";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    goods,
    cart,
  },
  beforeMount() {
    // симулирую запрос на сервер
    // и сохраняю все в state
    this.save_data_to_store();
  },
  methods: {
    ...mapActions({
      save_data_to_store: "get_all_data",
    }),
  },
};
</script>

<style>
.container {
  width: 1080px;
  display: flex;
  margin: 0 auto;
}
@media (max-width: 1080px) {
  .container {
    width: 100%;
  }
}
</style>

