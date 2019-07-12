import userService from '../services/UserService.js'


export default {
  state: {
    users: [],
    filterBy: null,
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users
    },
   
    deleteUser(state, { userId }) {
      let idx = state.users.findIndex(user => user._id === userId)
      state.users.splice(idx, 1);
     
    },
    saveUser(state, { user }) {
      const idx = state.users.findIndex(currUser => currUser._id === user._id)
      state.users.splice(idx, 1, user);
    },

  },
  actions: {
    loadUsers(context, ) {
      return userService.query()
        .then(users => {
          context.commit({ type: 'setUsers', users })
        })
    },
    getUserById(context, { userId }) {
      return userService.getById(userId)
    },
    deleteUser(context, { userId }) {
      return userService.remove(userId)
        .then(() => context.commit({
          type: 'deleteUser',
          userId
        }))
    },
    saveUser(context, { user }) {
      return userService.save(user)
        .then(savedUser => {
          context.commit({ type: 'saveUser', user: savedUser })
        })
    },

  },
  getters: {
    usersToshow(state) {
      return state.users
    },
  },
}