export const authModule = {
    state: () => ({
        isAdmin: false,
        isUser: false
    }),
    mutations: {
        setAuthAdmin(state){
            state.isAdmin = true
            state.isUser = false
        },
        setAuthUser(state){
            state.isAdmin = false
            state.isUser = true
        },
        setNotUser(state){
            state.isAdmin = false
            state.isUser = false
        }
    },
    namespaced: true
}