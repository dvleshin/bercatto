<template>
  <div>
    <Header></Header>
    <div class="chat-area">
      <div @click="onToggleChat" v-if="toggleChat" class="open-chat">
        Live chat with {{owner._id==loggedInUser._id ? this.arena.buyer.fullName: this.owner.fullName}}
        <span>▼</span>
      </div>
      <div class="chat animated fadeIn faster" :class="{hide: toggleChat}" @keyup.esc="onToggleChat">
        <div class="chat-header">
          <div>Chat with {{owner._id==loggedInUser._id ? this.arena.buyer.fullName: this.owner.fullName}}</div>
          <div @click="onToggleChat">
            <span>▲</span>
          </div>
        </div>
        <ChatApp></ChatApp>
      </div>
    </div>
    <section v-if="ownerItem && owner">
      <div class="users-section">
        <div class="owner-section">
          <button
            @click="closeDeal"
            class="close-deal-btn"
            v-if="owner._id===loggedInUser._id && !arena.isDone"
          >Close Deal</button>
          <div class="owner-arena-area">
            <div class="owner-arena-area-items">
              <div>
                <h2 class="owner-title">{{owner._id===loggedInUser._id ? "You suggested:": this.owner.fullName + " suggested:"}}</h2>
                <img class="owner-item" :src="ownerItem.imgUrl[0]" alt />
              </div>
              <div class="barter-arrow">
                <img src="../../public/img/arrows.png" v-if="!arena.isDone" />
                <img src="../../public/img/deal.png" v-if="arena.isDone" class="done"/>
              </div>
              <div class="user-items" v-if="owner._id!==loggedInUser._id || !suggestedItems">
                  <h2 class="owner-title">You suggested:</h2>
                <div class="suggested-items-container" v-if="owner._id!==loggedInUser._id && suggestedItems">
                  <img
                    class="suggested-item animated fadeIn"
                    v-for="item in suggestedItems"
                    :src="item.imgUrl[0]"
                  />
                </div>
              </div>
              <div v-if="owner._id===loggedInUser._id" class="user-items">
                  <h2 class="owner-title">{{this.arena.buyer.fullName}} suggested:</h2>
                  <div class="suggested-items-container">
                      <img v-if="!item.isSold" class="suggested-item animated fadeIn" v-for="item in suggestedItems" :src="item.imgUrl[0]"/>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <center>
          <hr class="hr" />
        </center>
        <div class="buyer-section">
          <div v-if="owner._id!==loggedInUser._id" class="user-items-container">
            <h2>Your items to suggest:</h2>
            <div v-if="!userItems.length">
              <h2>Please Upload Items To Bargain</h2>
              <v-btn @click="addItem">Add Item</v-btn>
            </div>
            <div class="img-container hvr-glow" v-for="item in userItems" @click="togglePickItem(item)">
              <img :class="{active : item.isPicked , item}" :src="item.imgUrl[0]" alt />
              <img v-if="item.isPicked" class="selected" src="../../public/img/selected.png" alt />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import io from "socket.io-client";
import socketService from '../services/SocketService.js'
const socket = io(socketService.BASE_URL);
import Header from "../components/Header.vue";
import ChatApp from "../components/ChatApp.vue";
import utilService from "../services/UtilsService.js";

export default {
  created() {
    socket.on("arena itemSelected", arenaId => {
      console.log(arenaId);

      this.initArena();
    });

    if (!this.loggedInUser) {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: JSON.parse(sessionStorage.loggedInUser)._id
        })
        .then(user => {
          this.$store.dispatch({ type: "setLoggedInUser" });
        })
        .then(() => {
          this.initArena();
        });
    } else this.initArena();
  },
  data() {
    return {
      pickedItems: [],
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
        mainItemImgUrl: ""
      },
      toggleChat: true
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
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
        editedItem.isSold = true;
        this.$store.dispatch({ type: "saveItem", item: { ...editedItem } });
      });
      const editedOwnerItem = { ...this.ownerItem };
      editedOwnerItem.isSold = true;
      this.$store.dispatch({ type: "saveItem", item: { ...editedOwnerItem } });
    },
    togglePickItem(item) {
      const editedItem = { ...item };
      editedItem.isPicked = !editedItem.isPicked;
      this.$store
        .dispatch({ type: "saveItem", item: { ...editedItem } })
        .then(() => {
          item.isPicked = !item.isPicked;
          if (editedItem.isPicked) this.pickedItems.push(editedItem);
          else {
            const idx = this.pickedItems.findIndex(
              currItem => currItem._id === editedItem._id
            );
            this.pickedItems.splice(idx, 1);
          }
          this.saveArena();
        });
    },
    saveArena() {
      const arena = { ...this.arena };
      if (!arena.id) arena.id = utilService.makeId();
      arena.url = `arena?id=${this.ownerItem._id}&arena=${arena.id}`;
      arena.mainItemImgUrl = this.ownerItem.imgUrl[0];
      arena.owner = { id: this.owner._id, item: this.ownerItem._id };
      if (this.suggestedItems) {
        arena.buyer = {
          fullName: this.arena.buyer.fullName,
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
            .then(() => {
              () => {};
            });
        }); // -------------------------------------------------
      this.$router.push(
        `arena?id=${this.ownerItem._id}&arena=${this.arena.id}`
      );
      socket.emit("arena itemSelected", this.arena.id);
    },
    onToggleChat() {
      this.toggleChat = !this.toggleChat;
    }
  },

  destroyed() {
    socket.removeListener("arena itemSelected");
  },
  components: {
    Header,
    ChatApp
  },
  watch: {
    "$route.fullPath": function(newVal, oldVal) {
      this.initArena();
    }
  }
};
</script>
<style lang="scss" scoped src="../styles/views/trading-arena.scss">
@import "../styles/lib/vuejs-noty.css";
</style>


