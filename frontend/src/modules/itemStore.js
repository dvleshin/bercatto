import itemService from '../services/ItemService.js'


export default {
  state: {
    items: [],
    filterBy: null,
  },
    mutations: {
      setItems(state, {items}) {
        state.items = items
      },
      deleteItem(state, {itemId}) {
        const idx = state.items.findIndex(item => item._id === itemId)
        state.items.splice(idx, 1);
      },
      saveItem(state, {item}) {
        const idx = state.items.findIndex(currItem => currItem._id === item._id)
        state.items.splice(idx, 1, item);
      },
      
    },
    actions: {
      loadItems(context, ) {
        return itemService.query()
          .then(items => {
            context.commit({type: 'setItems', items})
          })
      },
      getItemById(context, {itemId}) {
        return itemService.getById(itemId)
      },
      deleteItem(context, {itemId}) {
        return itemService.remove(itemId)
          .then(() => context.commit({
            type: 'deleteItem',
            itemId
          }))
      },
      saveItem(context, {item}) {
        return itemService.save(item)
          .then(savedItem => {
            context.commit({ type: 'saveItem', item: savedItem })
          })
      },
  
    },
    getters: {
      itemsToshow(state) {
        return state.items
      },
     trendingItems(state) {
        return state.items
      },
    },
  }