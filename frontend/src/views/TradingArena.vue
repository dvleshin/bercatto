<template>
  <section v-if="ownerItem && owner">
    <div class="users-section">
      <div class="owner-section">
        <button class="close-deal-btn" v-if="owner._id===loggedInUser._id">Close Deal</button>
        <h2>Owner: {{owner.fullName}}</h2>
        <img :src="ownerItem.imgUrl[0]" alt />
      </div>
      <div class="buyer-section">
        <h2>Buyer</h2>
        <div v-if="owner._id!==loggedInUser._id" class="user-items-container">
          <div v-if="!userItems.length">
            <h2>Please Upload Items To Bargain</h2>
            <v-btn @click="addItem">Add Item</v-btn>
          </div>
          <img
            v-for="item in userItems"
            :class="{active: item.isPicked, 'not-active': !item.isPicked}"
            @click="togglePickItem(item)"
            :src="item.imgUrl[0]"
            alt
          />
        </div>
        <div v-else class="user-items-container">
          <img
            v-for="item in suggestedItems"
            :class="{active: item.isPicked, 'not-active': !item.isPicked}"
            :src="item.imgUrl[0]"
            alt
          />
        </div>
      </div>
    </div>
    <div class="chat"></div>
  </section>
</template>


<script>
import utilService from "../services/UtilsService.js";
export default {
  created() {
    this.initArena();
  },
  data() {
    return {
      loggedInUser: null,
      ownerItem: null,
      owner: null,
      userItems: [],
      suggestedItems: null,
      arena: {
        id: "",
        url: "",
        owner: null,
        buyer: null,
        status: ""
      }
    };
  },
  computed: {},
  methods: {
    initArena() {
      const arenaId = this.$route.query.arena;
      this.loggedInUser = JSON.parse(sessionStorage.loggedInUser);
      this.$store
        .dispatch({ type: "getItemById", itemId: this.$route.query.id })
        .then(item => {
          this.ownerItem = item;
          this.$store
            .dispatch({ type: "getUserById", userId: this.ownerItem.ownerId })
            .then(user => {
              this.owner = user;
              if (arenaId) {
                this.arena.id = arenaId;
                const arena = this.owner.arenas.find(
                  currArena => currArena.id === arenaId
                );
                this.suggestedItems = arena.buyer.items;
                console.log(this.suggestedItems);
              }
            });
        })
        .then(
          this.$store
            .dispatch({ type: "getUserItems", userId: this.loggedInUser._id })
            .then(items => {
              this.userItems = items;
            })
        )
    },
    addItem() {
      this.$router.push("add");
    },
    togglePickItem(item) {
      const editedItem = { ...item };
      editedItem.isPicked = !editedItem.isPicked;
      this.$store
        .dispatch({ type: "saveItem", item: { ...editedItem } })
        .then(() => {
          item.isPicked = !item.isPicked;
          this.saveArena();
        });
    },
    saveArena() {
      const arena = { ...this.arena };
      if (!arena.id) arena.id = utilService.makeId();
      this.arena.id = arena.id;
      arena.url = `arena?id=${this.ownerItem._id}&arena=${this.arena.id}`;
      arena.owner = { id: this.owner._id, item: this.ownerItem._id };
      if (this.suggestedItems) {
        arena.buyer = {
          id: this.suggestedItems[0].ownerId,
          items: this.suggestedItems
        };
      } else {
        arena.buyer = {
          id: this.loggedInUser._id,
          items: this.userItems
        };
      }
      arena.status = this.arena.status;
      // ------------------------------------------UPDATE ARENA TO USERS
      const newOwner = { ...this.owner };
      let arenaIdx = this.owner.arenas.findIndex(currArena => {
        currArena.id === this.arena.id;
      });
      
      if (arenaIdx) {
        newOwner.arenas.splice(arenaIdx, 1, arena);
      } else newOwner.arenas.push(arena);
      console.log(newOwner);

      this.$store.dispatch({ type: "saveUser", user: newOwner }).then(() => {});
      // const newBuyer = { ...arena.buyer };
      // arenaIdx = arena.buyer.arenas.findIndex(
      //   currArena => currArena.id === arena.id
      // );
      // if (arenaIdx) {
      //   newBuyer.arenas.splice(arenaIdx, 1, arena);
      // } else newBuyer.arenas.push(arena);
      // this.$store.dispatch({ type: "saveUser", user: newBuyer }).then(() => {});
      // -------------------------------------------------
    }
  }
};
</script>
<style lang="scss" scoped src="../styles/views/trading-arena.scss">
</style>


