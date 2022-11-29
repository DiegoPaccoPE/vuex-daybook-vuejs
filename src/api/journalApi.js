import axios from "axios";

const journalApi = axios.create({
  baseURL: 'https://vue-daybook-13aab-default-rtdb.firebaseio.com'
})

export default journalApi