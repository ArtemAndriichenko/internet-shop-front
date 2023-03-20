export const authModule = {
    state: () => ({
        isAdmin: false,
        isUser: true,
        userId: 0,
        username: "",
        password: "",
        cartId: 0
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
        },
        setUserId(state, userIdP){
            state.userId += userIdP
        },
        setUsername(state, usernameP){
            state.username += usernameP
        },
        setUserPassword(state, passwordP){
            state.password += passwordP
        },
        setCartId(state, cartIdP){
            state.cartId = cartIdP
        }
    },
    namespaced: true
}