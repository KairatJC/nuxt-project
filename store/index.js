import axios from 'axios'

const state = () => ({
    goods: [],
    names: {},
    currency: getRandomInt(20, 80),
    cart: []
})

const actions = {
    get_goods({ commit, state }) {
        axios({
            method: 'GET',
            url: '/data.json'
        }).then(res => {
            let temp = res.data.Value.Goods
            temp.forEach((el, ind) => {
                el.index_of_goods = ind;
                el.counter = 0;

                if (state.cart) {
                    state.cart.forEach(cart_item => {
                        if (cart_item.index_of_goods === el.index_of_goods)
                            el.counter = cart_item.counter
                    })
                }
            })
            commit('SAVE_GOODS', temp)
        })
    },
    get_names({ commit }) {
        axios({
            method: 'GET',
            url: '/names.json'
        }).then(res => {
            commit('SAVE_NAMES', res.data)
        })
    },
    get_all_data({ dispatch, commit }) {
        dispatch('get_names')
        dispatch('get_goods')

        setInterval(function () {
            dispatch('get_names')
            dispatch('get_goods')
            commit("SET_CURRENCY", getRandomInt(20, 80))
        }, 15000)
    },
    add_to_cart({ commit, state, dispatch }, index) {
        let isUpdate = false

        if (state.cart.length !== 0) {
            state.cart.forEach((el, ind) => {

                if (el.index_of_goods == index) {
                    commit("INCREASE_COUNTER", [ind, index])
                    isUpdate = true
                }
            })
        }
        if (!isUpdate) commit('PUSH_TO_CART', state.goods[index])
    },
    remove_from_cart({ commit, state }, arr) {
        commit("REMOVE_FROM_CART", arr)
    },
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


const mutations = {
    SAVE_GOODS(state, goods) {
        state.goods = goods
    },
    SAVE_NAMES(state, names) {
        state.names = names
    },
    SET_CURRENCY(state, cur) {
        state.currency = cur
    },

    PUSH_TO_CART(state, data) {
        data.counter += 1
        state.cart.push(data)
    },
    UPDATE_CART(state, new_data) {
        state.cart = new_data
    },
    INCREASE_COUNTER(state, arr) {
        state.cart[arr[0]].counter += 1;
        state.goods[arr[1]].counter = state.cart[arr[0]].counter
    },
    NEW_COUNTER(state, arr) {
        state.cart[arr[0]].counter = arr[2]
        state.goods[arr[1]].counter = state.cart[arr[0]].counter
    },
    REMOVE_FROM_CART(state, arr) {
        state.cart.splice(arr[0], 1)
        state.goods[arr[1]].counter = 0
    }
}

export default {
    state, actions, mutations
}