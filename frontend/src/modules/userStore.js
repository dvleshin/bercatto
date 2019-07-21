import userService from '../services/UserService.js'
import utilsService from '../services/UtilsService.js'
import UserService from '../services/UserService.js';

export default {
  state: {
    users: [],
    filterBy: null,
    loggedInUser: userService.getLoggedinUser()
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users
      console.log('finished loading users');

    },
    setLoggedInUser(state, { userCreds }) {
      state.loggedInUser = userCreds
    },

    deleteUser(state, { userId }) {
      let idx = state.users.findIndex(user => user._id === userId)
      state.users.splice(idx, 1);
    },
    updateUsers(state, { user }) {
      // console.log('user is: ', user);
      // console.log('users are: ', state.users);


      const idx = state.users.findIndex(currUser => currUser._id === user._id)
      state.users.splice(idx, 1, user);
      console.log('after change: ', idx, state.users);
    },
    updateLoggedInUser(state, { loggedInUser }) {
      state.loggedInUser = loggedInUser
    },

    logOutUser(state) {
      state.loggedInUser = null
    }
  },
  actions: {
    async doSignup(context, { userCred }) {
      try {
        const user = await userService.save(userCred)
        context.commit({ type: 'setLoggedInUser', user })
      } catch (err) {
        console.log(err);
      }
    },
    setLoggedInUser(context, { userCreds }) {
      context.commit({ type: 'setLoggedInUser', userCreds })
    },
    async doLogin(context, { userCred }) {
      try {
        const userCreds = await userService.doLogin(userCred)
        context.commit({ type: 'setLoggedInUser', userCreds })

      } catch (err) {
        console.log(err);
      }
    },
    async doLogout(context) {
      try {
        const userLoggetOut = await userService.doLogout()
        console.log('Logout Success:', userLoggetOut);
        context.commit({ type: 'logOutUser', userLoggetOut })
      } catch (err) {
        console.log('Logout error:', err);

      }
    },

    async loadUsers(context) {
      try {
        const users = await userService.query()
        context.commit({ type: 'setUsers', users })
      } catch (err) {
        console.log(err);
      }
    },
    loadLoggedInUser(context, { userId }) {
      let userCreds = UserService.getById(userId)
      context.commit({ type: 'setLoggedInUser', userCreds })

    },
    getUserById(context, { userId }) {
      return userService.getById(userId)
    },
    getUserItems(context, { userId }) {
      return userService.getUserItems(userId)
    },
    async deleteUser(context, { userId }) {
      try {
        await userService.remove(userId)
        context.commit({ type: 'deleteUser', userId })
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(context, { user }) {
      // console.log('got to update user');
      
      try {
        const savedUser = await userService.update(user)
        context.commit({ type: 'updateUsers', user: savedUser })
        let id = context.state.loggedInUser._id
        let loggedInUser = await userService.getById(id)
        console.log('loggedin: ', loggedInUser);

        context.commit({ type: 'updateLoggedInUser', loggedInUser })
      } catch (err) {
        console.log(err);
      }
    },
    async getCordsByName(context, { location }) {
      try {
        const cords = await utilsService.getCordsByName(location)
        return cords
      } catch (err) {
        console.log(err);
      }
    },

  },
  getters: {
    usersToshow(state) {
      return state.users
    },
    loggedInUser(state) {
      console.log('in getter, state is: ', state.loggedInUser.arenas);
      return state.loggedInUser
    }
  },
}