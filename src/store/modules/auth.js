import axios from "axios";

export default {
  state: {
    logged_user: {},

  },
  mutations: {
    setUserData(state, data) {
      return state.logged_user = data;
    },

  },
  getters: {
    getUser(state) {
      return state.logged_user
    }
  },
  actions: {
    LOGIN_USER(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/login', data)
          .then(result => {
            resolve(true)
          }).catch(error => {
            reject(error)
        })
      })
    },


    GET_USER_DATA(context){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then((res) => {
            if (res.status === 200){
              context.commit('setUserData', res.data.user)
              return resolve(true);
            }
          })
          .catch((error) => {
            return reject(error)
          })
      })
    }
  },
}
