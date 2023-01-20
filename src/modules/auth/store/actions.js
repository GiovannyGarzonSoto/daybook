import authApi from '@/api/authApi'

export const createUser = async({commit}, user) => {
    const {name, email, password} = user

    try{
        const {data} = await authApi.post(':signUp', {email, password, returnSecureToken: true})
        const { idToken, refreshToken } = data
        await authApi.post(':update', {displayName: name, idToken})
        delete user.password
        commit('loginUser', {user, idToken, refreshToken})

        return {ok: true}
    }catch(err) {
        return {ok: false, message: err.response.data.error.message}
    }
}

export const loginUser = async({commit}, user) => {
    try{
        const {email, password} = user
        const {data} = await authApi.post(':signInWithPassword', {email, password, returnSecureToken: true})
        const { displayName, idToken, refreshToken } = data
        user.name = displayName
        commit('loginUser', {user, idToken, refreshToken})
        return {ok: true}
    }catch(err) {
        return {ok: false, message: err.response.data.error.message}
    }
}

export const checkAuthentication = async({commit}, user) => {
    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if(!idToken) {
        commit('logout')
        return {ok: false, message: 'Sin token'}
    }

    try{
        const {data} = await authApi.post(':lookup', {idToken})
        const { displayName, email } = data.users[0]
        const user = {
            name: displayName,
            email
        }
        commit('loginUser', {user, idToken, refreshToken})
        return {ok: true}
    }catch(err){
        commit('logout')
        return {ok: false, message: err.response.data.error.message}
    }
}
