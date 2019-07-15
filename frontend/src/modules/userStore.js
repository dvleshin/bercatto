import userService from '../services/UserService.js'
import utilsService from '../services/UtilsService.js'


export default {
  state: {
    users: [],
    filterBy: null,
    loggedInUser: null
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users
    },

    setLoggedInUser(state, { user }) {
      state.loggedInUser = user
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

    async signup(context, {userCred}) {
      const user = await UserService.save(userCred)
      try {
        context.commit({ type: 'setLoggedInUser', user })
      } catch (err) {console.log(err);
      }
    },

    async loadUsers(context, ) {
     const users = await userService.query()
       try {
         context.commit({ type: 'setUsers', users })
       } catch (err) {console.log(err);
       }
    },
    getUserById(context, { userId }) {
      return userService.getById(userId)
    },
    getUserItems(context, { userId }) {
      return userService.getUserItems(userId)
    },
    async deleteUser(context, { userId }) {
      await userService.remove(userId)
      try {context.commit({
          type: 'deleteUser',
          userId
        })}
        catch (err) {console.log(err);
        }
    },
    async saveUser(context, { user }) {
      const savedUser = await userService.save(user)
      try{
        context.commit({ type: 'saveUser', user: savedUser })
      } catch (err) {console.log(err);
      }
    },
    async getCordsByName(context, {location}) {
    const cords = await utilsService.getCordsByName(location)
      try {
        return cords
      } catch (err) {
        console.log(err);
        
      }
    }

  },
  getters: {
    usersToshow(state) {
      return state.users
    },
  },
}