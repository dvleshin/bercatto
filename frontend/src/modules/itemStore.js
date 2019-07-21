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
    setFilter(state, {filterBy}){
        state.filterBy = filterBy
    }

  },
  actions: {
    async loadItems(context, {filterBy}) {      
      try {
        const items = await itemService.query(filterBy)
        context.commit({ type: 'setItems', items })
      }
      catch (err) {
        console.log(err);
      }
    },
    async getTrendingItems(context, {limit}) {
      try {
        const items = await itemService.query({limit: limit, tranding: true, gt: 50, byViews: 1})      
        context.commit({ type: 'setTrendingItems', items })
      }
      catch (err) {console.log(err)}

    },
    async onFilter(context, {filterBy}){
      try {
        const items = await itemService.query(filterBy)
        //console.log('Got filtered items', items); 
        context.commit({ type: 'setItems', items })
        context.commit({ type: 'setFilter', filterBy})
      } catch (err) {
        console.log('Got error', err);
      }
    },
    async onSort(context, {filterBy}){
      try {
        const items = await itemService.query(filterBy)
        context.commit({ type: 'setItems', items })
        context.commit({ type: 'setFilter', filterBy})
      } catch (err) {
        console.log('Got error', err);
      }
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
      try {
        const savedItem = await itemService.save(item)
        context.commit({ type: 'saveItem', item: savedItem })
      }
      catch (err) {console.log(err)}
    },
    uploadImgs(context, {imgs}){    
      const formData = new FormData()
      for (var i = 0; i < imgs.length; i++) {
        let imgFile = imgs[i];
        formData.append(`imgs`, imgFile);        
      }      
      return itemService.uploadImage(formData)
        .then (uploadedImgs => {
          return uploadedImgs
        })
    }

  },
  getters: {
    itemsToshow(state) {
      return state.items
    },
    trendingItems(state) {
      return state.trendingItems
    },
    getFilterBy(state){
      return state.filterBy
    }
  },
}