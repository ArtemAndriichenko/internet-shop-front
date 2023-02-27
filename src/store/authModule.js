export const authModule = {
    state: () => ({
        isAuth: true
    }),
    mutations: {
        setFalse(state){
            state.isAuth = false
        },
        setTrue(state){
            state.isAuth = true
        }
    },
    namespaced: true
}