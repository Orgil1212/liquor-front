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
