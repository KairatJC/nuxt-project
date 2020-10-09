<template>
    <!-- cart--opened - для мобильной версии -->
    <div :class="{'cart--opened': cart_opened}" class="cart">
        <h2>Корзина</h2>
        <div class="cart__items">
            <template v-if="cart.length != 0">
                <!-- рендерю товары в группе -->
                <cartItem @new_count="new_count()" v-for="(item, index) in cart" :item="item" :ind="index" :key="index" />
            </template>
            <div v-else class="empty-cart">Корзина пуста</div>
        </div>
        <div class="cart__total">
            Общая стоимость: <span>{{total}} руб.</span>
        </div>

        <button v-if="!cart_opened" class="open-cart" @click="cart_opened = true">Открыть корзину</button>
        <button v-else class="open-cart" @click="cart_opened = false">Закрыть корзину</button>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import cartItem from '~/components/cartItem'

export default {
    data() {
        return {
            total: 0,
            cart_opened: false
        }
    },
    components: {
        cartItem
    },
    computed: {
        ...mapState({
            cart: state => state.cart,
            currency: state => state.currency
        }),
    },
    watch: {
        currency() {
            // как только меняется курс валют, пересчитать общую стоимость
            this.get_total()
        },
        cart: {
            deep: true,
            handler(){
                // как только что-либо меняется в корзине, пересчитать общую стоимость
                this.get_total()
            }
        }
    },
    methods: {
        new_count() {
            // как только меняем количество товара, пересчитать общую стоимость
            this.get_total()
        },
        // пересчет общей стоимости
        get_total() {
            let _self = this
            this.total = this.cart.reduce((acc, curr)=>{
                acc += (curr.C * curr.counter * _self.currency);
                return parseFloat(acc.toFixed(2))
            }, 0)
        }
    }
}
</script>
<style scoped>

.cart {
    width: 350px;
    position: sticky;
    top: 0;
    height: 50px;
    padding: 25px 20px;
}
.cart__items {
    overflow-y: scroll;
    height: 70vh;
}
h2 {
    font-weight: 400;
    font-size: 18px;
}
.cart__total {
    padding-top: 20px;
}
.empty-cart {
    font-size: 14px;
    color: #777;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}
.open-cart {
    display: none;
    cursor: pointer;
}
.cart--opened {
    right: 0 !important;
}
@media (max-width: 1080px) {
    .cart {
        position: fixed;
        right: -360px;
        bottom: 0;
        background: #fff;
        transition: .1s linear;
        top: 60px;
        height: auto;
        box-shadow: 0px 0px 10px 0 rgba(0,0,0,0.1);
        padding-right: 0;
        width: 320px;
    }
    .open-cart {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        width: 100%;
        display: block;
        padding: 20px;
    }
    
}
</style>