<template>
  <div class="cart-item">
    <div class="cart-item__name">
      {{ names[item.G].G }} / {{ names[item.G].B[item.T].N }}
    </div>
    <div class="cart-item__add">
      <div class="cart-item__count">
        <span
          ><input
            type="number"
            v-model="counter"
            :max="item.P"
            min="1"
            name=""
            id=""
        /></span>
        шт
        <div
          :class="{ 'cart-item__max-count--red': isRed }"
          class="cart-item__max-count"
        >
          Количество ограничено ({{ item.P }})
        </div>
      </div>
      <div class="cart-item__price">
        {{ (item.C * currency).toFixed(2) }} руб.
      </div>
      <button
        @click="remove_from_cart([ind, item.index_of_goods])"
        class="cart-item__remove btn"
      >
        X
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "cartItem",
  data() {
    return {
      counter: this.item.counter,
      isRed: false,
    };
  },
  props: {
    item: Object,
    ind: Number, // index of cart array
  },
  computed: {
    ...mapState({
      names: (state) => state.names,
      currency: (state) => state.currency,
      cart: (state) => state.cart,
    }),
  },
  beforeMount() {
    // эта строка отправляет цену товара * количество к родительскому компоненту, где идет пересчет общей стоимости
    this.$emit(
      "new_count",
      (this.counter * this.item.C * this.currency).toFixed(2)
    );
  },
  watch: {
    counter() {
      // жестка валидация, пользователь строго ограничен диапазоном ввода от 1 до максимума
      if (this.counter == "" || this.counter < 1) {
        this.counter = 1;
      }
      if (this.counter > this.item.P) {
        this.counter = this.item.P;
      }

      // преобразование типа данных ввода
      this.counter = parseInt(this.counter);

      // установка нового значения счетчика в стейте
      this.NEW_COUNTER([this.ind, this.item.index_of_goods, this.counter]);

      // тоже самое отправляет данные родителю
      this.$emit(
        "new_count",
        (this.counter * this.item.C * this.currency).toFixed(2)
      );
    },
    cart: {
      deep: true,
      handler() {
        this.counter = this.cart[this.ind].counter;
      },
    },
  },
  methods: {
    ...mapMutations({
      NEW_COUNTER: "NEW_COUNTER",
    }),
    ...mapActions({
      remove_from_cart: "remove_from_cart",
    }),
  },
};
</script>
<style scoped>
.cart-item {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0;
}
.cart-item__name {
  font-size: 16px;
}
.cart-item__add {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 5px;
}
.cart-item__count input[type="number"] {
  width: 70px;
}
.cart-item__max-count {
  font-size: 12px;
}
.btn {
  font-size: 14px;
  width: 22px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.cart-item__max-count--red {
  color: red;
}
</style>