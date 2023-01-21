import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-e663a-default-rtdb.firebaseio.com'
})

journalApi.interceptors.request.use((config) => {
   config.params = {
    auth: localStorage.getItem('idToken')
   } 
})

export default journalApi