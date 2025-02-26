// server.js эсвэл index.js файлын эхэнд
import consola from 'consola';

// Түүнд гарч буй алдааг лог хийнэ
consola.info('Төсөл амжилттай ажиллаж байна!');

export const state = () => ({
    products: [],
});

export const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
};

export const actions = {
    async fetchProducts({ commit }) {
        const response = await this.$axios.$get('https://your-api.com/products');
        commit('setProducts', response);
    },
};
