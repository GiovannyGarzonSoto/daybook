import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-e663a-default-rtdb.firebaseio.com'
})

export default journalApi