<template>
  <div>
    <Header></Header>
    <section v-if="ownerItem && owner">
      <div class="users-section">
        <div class="owner-section">
          <button class="close-deal-btn" v-if="owner._id===loggedInUser._id">Close Deal</button>
          <h2>Owner: {{owner.fullName}}</h2>
          <img :src="ownerItem.imgUrl[0]" alt />
        </div>
        <div class="buyer-section">
          <div v-if="owner._id!==loggedInUser._id" class="user-items-container">
            <h2>Buyer: {{this.loggedInUser.fullName}}</h2>
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
            <h2>Buyer: {{this.arena.buyer.id}}</h2>
            <img v-for="item in suggestedItems" :src="item.imgUrl[0]" alt />
          </div>
        </div>
      </div>
      <div class="chat"></div>
    </section>
  </div>
</template>


<script>
import Header from "../components/Header.vue";
import utilService from "../services/UtilsService.js";
export default {
  created() {
    //  this.loggedInUser = JSON.parse(sessionStorage.loggedInUser)
    this.loggedInUser = this.$store.getters.loggedInUser;
    if (!this.loggedInUser) {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: JSON.parse(sessionStorage.loggedInUser)._id
        })
        .then(user => {
          this.loggedInUser = user;
          this.$store.dispatch({
            type: "setLoggedInUser",
            userCreds: user
          });
        })
        .then(() => {
          this.initArena();
        });
    } else this.initArena();
  },
  data() {
    return {
      // loggedInUser: null,
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

      this.$store
        .dispatch({ type: "getItemById", itemId: this.$route.query.id })
        .then(item => {
          this.ownerItem = item;
          this.$store
            .dispatch({ type: "getUserById", userId: this.ownerItem.ownerId })
            .then(user => {
              this.owner = user;
              const arenaId = this.$route.query.arena;
              if (arenaId) {
                this.arena.id = arenaId;

                const arena = this.owner.arenas.find(
                  currArena => currArena.id === arenaId
                );
                this.suggestedItems = arena.buyer.items;
                this.arena = arena;
              } else this.arena.id = utilService.makeId();
            })
            .then(
              this.$store
                .dispatch({
                  type: "getUserItems",
                  userId: this.loggedInUser._id
                })
                .then(items => {
                  this.userItems = items;
                })
            );
        });
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
      // this.arena.id = arena.id;
      arena.url = `arena?id=${this.ownerItem._id}&arena=${arena.id}`;
      arena.owner = { id: this.owner._id, item: this.ownerItem._id };
      if (this.suggestedItems) {
        arena.buyer = {
          id: this.suggestedItems[0].ownerId,
          items: this.userItems.filter(item => item.isPicked)
        };
      } else {
        arena.buyer = {
          id: this.loggedInUser._id,
          items: this.userItems.filter(item => item.isPicked)
        };
      }
      console.log('@@@',arena.buyer.items.length);
      arena.status = this.arena.status;
      // ------------------------------------------UPDATE ARENA TO USERS
      const newOwner = { ...this.owner };

      const ownerArenaIdx = newOwner.arenas.findIndex(
        currArena => currArena.id === this.arena.id
      );

      if (ownerArenaIdx >= 0) {
        newOwner.arenas.splice(ownerArenaIdx, 1, arena);
      } else {
        newOwner.arenas.push(arena);
      }
      this.$store
        .dispatch({ type: "updateUser", user: newOwner })
        .then(() => {});

      this.$store
        .dispatch({ type: "getUserById", userId: arena.buyer.id })
        .then(buyer => {
          const newBuyer = { ...buyer };

          const buyerArenaIdx = newBuyer.arenas.findIndex(
            currArena => currArena.id === this.arena.id
          );

          if (buyerArenaIdx >= 0) {

            newBuyer.arenas.splice(buyerArenaIdx, 1, arena);
          } else {
            newBuyer.arenas.push(arena);
          }
          this.$store
            .dispatch({ type: "updateUser", user: newBuyer })
            .then(() => {});
        }); // -------------------------------------------------
    }
  },
  components: {
    Header
  }
};
</script>
<style lang="scss" scoped src="../styles/views/trading-arena.scss">
</style>


