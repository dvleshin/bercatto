import itemService from '../services/ItemService.js'


export default {
  state: {
    items: [],
    trendingItems: [],
    filterBy: null,
  },
  mutations: {
    setItems(state, { items }) {
      state.items = items
    },
    setTrendingItems(state, { items }) {
      state.trendingItems = items
    },
    deleteItem(state, { itemId }) {
      let idx = state.items.findIndex(item => item._id === itemId)
      state.items.splice(idx, 1);
      idx = state.trendingItems.findIndex(item => item._id === itemId)
      state.trendingItems.splice(idx, 1);
    },
    saveItem(state, { item }) {
      const idx = state.items.findIndex(currItem => currItem._id === item._id)
      state.items.splice(idx, 1, item);
    },

  },
  actions: {
    async loadItems(context, ) {
      const items = await itemService.query()
      try {
        context.commit({ type: 'setItems', items })
      }
      catch (err) {
        console.log(err);
      }
    },

    async getTrendingItems(context, ) {
      const items = await itemService.getTrendingItems()
      try {
        context.commit({ type: 'setTrendingItems', items })
      }
      catch (err) {console.log(err)}

    },
    getItemById(context, { itemId }) {
      return itemService.getById(itemId)
    },
    async deleteItem(context, { itemId }) {
      await itemService.remove(itemId)
      try { context.commit({ type: 'deleteItem', itemId }) }
      catch (err) { console.log(err) }
    },
    async saveItem(context, { item }) {
      const savedItem = await itemService.save(item)
      try {
        context.commit({ type: 'saveItem', item: savedItem })
      }
      catch (err) {console.log(err)}
    },

  },
  getters: {
    itemsToshow(state) {
      return state.items
    },
    trendingItems(state) {


      return state.trendingItems
    },
  },
}