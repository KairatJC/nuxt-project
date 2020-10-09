<template>
  <div class="good-item">
    <!-- название типа товара -->
    <p>{{ name }}</p>
    <p class="good-item__info">
      <!-- частьзадания, если isLow == true, то значение увеличилось -->
      <!-- если isLow == false, то значение уменьшилось -->
      <span
        class="good__price"
        :class="[isLow ? 'good__price--red' : 'good__price--green']"
        >Цена: {{ (dat.C * currency).toFixed(2) }}р.</span
      >
      <span class="good__count" :class="{ 'good__count--red': isRed }"
        >Количество: {{ parseInt(count) }}шт.</span
      >
    </p>
    <button :disabled="!canAdd" @click="add_to_cart()">
      Добавить в корзину
    </button>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "goodItem",
  data() {
    return {
      oldPrice: 0,
      isLow: false,
      canAdd: true,
      // количество оставшегося товара = общее количество товара - товары в корзине
      count: this.dat.P - this.dat.counter,
      item: {},
      name: "Загрузка...",
      isRed: false,
    };
  },
  props: {
    dat: Object,
  },
  computed: {
    ...mapState({
      names: (state) => state.names,
      currency: (state) => state.currency,
      cart: (state) => state.cart,
      goods: (state) => state.goods,
    }),
  },
  beforeMount() {
    if (this.dat.G && this.names[this.dat.G].B[this.dat.T].N) {
      this.name = this.names[this.dat.G].B[this.dat.T].N;
    }
  },
  methods: {
    ...mapActions({
      _add_to_cart: "add_to_cart",
    }),

    add_to_cart(index) {
      this.count--;
      this._add_to_cart(this.dat.index_of_goods);

      if (this.count > 0) {
        this.canAdd = true;
      } else {
        this.canAdd = false;
        this.isRed = true;
      }
    },
  },
  watch: {
    currency(newValue, oldValue) {
      if (newValue > oldValue) this.isLow = true;
      else this.isLow = false;
    },
    cart: {
      deep: true,
      handler() {
        this.cart.forEach((el) => {
          if (el.index_of_goods == this.dat.index_of_goods) {
            this.count = el.P - el.counter;
          }
        });
      },
    },
    goods: {
      deep: true,
      handler() {
        this.count =
          this.goods[this.dat.index_of_goods].P -
          this.goods[this.dat.index_of_goods].counter;
        if (this.count > 0) {
          this.canAdd = true;
        } else {
          this.canAdd = false;
        }

        if (this.name === "Загрузка...") {
          this.name = this.names[this.dat.G].B[this.dat.T].N;
        }
      },
    },
    count() {
      if (this.count < 0) {
        this.isRed = true;
      } else {
        this.isRed = false;
      }
    },
  },
};
</script>

<style scoped>
.good-item {
  border-bottom: 1px solid #ddd;
  padding: 5px;
}
.good-item__info {
  font-size: 12px;
  padding: 10px 0;
}
.good__price {
  padding: 2px 5px;
  color: #fff;
}
.good__price--red,
.good__count--red {
  background-color: #ce5d5d;
}
.good__price--green {
  background-color: #379237;
}
</style>