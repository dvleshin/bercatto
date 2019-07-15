<template>
  <section v-if="ownerItem && owner">
    <div class="users-section">
    <div class="owner-section">
      <button class="close-deal-btn" v-if="owner._id===loggedInUser._id">Close Deal</button>
    <h1>Owner: {{owner.fullName}}</h1>
    <img :src="ownerItem.imgUrl[0]" alt />
    </div>
    <div class="buyer-section">
    <h1>buyer: {{loggedInUser.fullName}}</h1>
    <div class="user-items-container">
    
      <img v-for="item in userItems" :class="{active: item.isPicked}" @click="togglePickItem(item)" :src="item.imgUrl[0]" alt="">
      
      
    
      
    </div>
    </div>
    </div>
    <div class="chat"></div>
  </section>
</template>


<script>

export default {
  created() { 
    this.loggedInUser = JSON.parse(sessionStorage.loggedInUser).user;
    this.$store
      .dispatch({ type: "getItemById", itemId: this.$route.query.id })
      .then(item => {
        this.ownerItem = item;
        this.$store
          .dispatch({ type: "getUserById", userId: this.ownerItem.ownerId })
          .then(user => {
            this.owner = user;
          });
      }).then( this.$store.dispatch({ type: "getUserItems", userId: this.loggedInUser._id })
      .then(items => {
        
        
        this.userItems = items;
      }))
  },
  data() {
    return {
      loggedInUser: null,
      ownerItem: null,
      owner: null,
      userItems:[]
    };
  },
  computed: {},
  methods: {
    togglePickItem(item){
      
      const editedItem = {...item}
      editedItem.isPicked = !editedItem.isPicked
    this.$store
        .dispatch({ type: "saveItem", item: { ...editedItem }})
        .then(() => {
         item.isPicked=!item.isPicked
        });
    }
  }
};
</script>
<style lang="scss" scoped src="../styles/views/trading-arena.scss">
</style>


