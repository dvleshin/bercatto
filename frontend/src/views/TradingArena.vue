<template>
  <div>
    <Header></Header>
    <section v-if="ownerItem && owner">
      <div class="users-section">
        <div class="owner-section">
          <img class="done " v-if="arena.isDone" src="../../public/img/deal.png" alt="">
          <button
            @click="closeDeal"
            class="close-deal-btn"
            v-if="owner._id===loggedInUser._id && !arena.isDone">Close Deal</button>
          <h2>Owner: {{owner.fullName}}</h2>
          <img class="owner-item" :src="ownerItem.imgUrl[0]" alt />
          <div v-if="owner._id!==loggedInUser._id && suggestedItems" >
            <h2 v-if="suggestedItems.length">You suggested :</h2>
            <img class="suggested-items" v-for="item in suggestedItems" :src="item.imgUrl[0]" alt="">
             </div>
        </div>
        <div class="buyer-section">
          <div v-if="owner._id!==loggedInUser._id" class="user-items-container">
            <h2>Buyer: {{this.loggedInUser.fullName}}</h2>
            <div v-if="!userItems.length">
              <h2>Please Upload Items To Bargain</h2>
              <v-btn @click="addItem">Add Item</v-btn>
            </div>
            <div class="img-container hvr-glow" v-for="item in userItems" @click="togglePickItem(item)">
              <img :class="{active : item.isPicked , item}"  :src="item.imgUrl[0]" alt />
              <img v-if="item.isPicked" class="selected" src="../../public/img/selected.png" alt />
            </div>
          </div>
          <div v-else class="user-items-container">
            <h2>Buyer: {{this.arena.buyer.fullName}}</h2>
            <img class="item" v-for="item in suggestedItems" :src="item.imgUrl[0]" alt />
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
      pickedItems: [],
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
        isDone: false,
        mainItemImgUrl:''
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
                this.arena.id = arenaId;//not needed
                const arena = this.owner.arenas.find(
                  currArena => currArena.id === arenaId
                );
                this.suggestedItems = arena.buyer.items;
                this.pickedItems = arena.buyer.items; 
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

    closeDeal() {
      this.arena.isDone = true;
      this.saveArena();
      this.suggestedItems.forEach(item => {
         const editedItem = { ...item };
      editedItem.isPicked = false;
      this.$store
        .dispatch({ type: "saveItem", item: { ...editedItem } })
      });
    },
    togglePickItem(item) { 
      const editedItem = { ...item };
      editedItem.isPicked = !editedItem.isPicked;
      this.$store
        .dispatch({ type: "saveItem", item: { ...editedItem } })
        .then(() => {
          item.isPicked = !item.isPicked;
          if(editedItem.isPicked) this.pickedItems.push(editedItem)
          else {
            const idx = this.pickedItems.findIndex(currItem=>currItem._id===editedItem._id)
            this.pickedItems.splice(idx , 1)
          }
          this.saveArena();
        });
    },
    saveArena() {
      const arena = { ...this.arena };
      if (!arena.id) arena.id = utilService.makeId();
      // this.arena.id = arena.id;
      arena.url = `arena?id=${this.ownerItem._id}&arena=${arena.id}`;
      arena.mainItemImgUrl = this.ownerItem.imgUrl[0];
      arena.owner = { id: this.owner._id, item: this.ownerItem._id };
      if (this.suggestedItems) { 
        arena.buyer = {
          fullName: this.loggedInUser.fullName,
          id: this.suggestedItems[0].ownerId,
          items: this.pickedItems
        };
      } else {
        arena.buyer = {
          fullName: this.loggedInUser.fullName,
          id: this.loggedInUser._id,
          items: this.pickedItems
        };
      }
      arena.isDone = this.arena.isDone;
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
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.initArena()
    }
  }
};
</script>
<style lang="scss" scoped src="../styles/views/trading-arena.scss">
@import "../styles/lib/vuejs-noty.css";
</style>


