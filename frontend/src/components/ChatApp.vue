<template>
  <section>
    <div class="chat-list">
      <ul id="messages">
        <li v-for="msg in msgs">{{msg.txt}}</li>
      </ul>
    </div>
    <!-- <template v-if="isTyping">
      <span class="typing-msg">typing...</span>
    </template>-->
    <div class="form">
      <form>
        <v-text-field v-model="msgTxt" id="txt" placeholder="Your message..."></v-text-field>
        <button @click.prevent="sendMsg">
          <v-icon>send</v-icon>
        </button>
      </form>
    </div>
  </section>
</template>


<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default {
  created() {
    
    const arenaId = this.$route.query.arena   
    socket.emit("chat join",this.loggedInUser.fullName ,arenaId);
    socket.on("chat newMsg", msg => {
      console.log(this.msgs);
      
      this.msgs.push(msg);
    });
    socket.on("chat history", msgs => {      
      this.msgs = msgs;
    });

  },

  data() {
    return {
      msgs: [],
      msgTxt: ""
    };
  },

methods: {
   sendMsg() {
     const arenaId = this.$route.query.arena 
      const msg = { txt: this.msgTxt };
      socket.emit("chat msg", msg );
      this.msgTxt = "";
    },
},

destroyed() {
  socket.removeListener('chat newMsg')
  socket.removeListener('chat history')
},

computed: {
  loggedInUser() {
    return this.$store.getters.loggedInUser
  }
},
}

</script>
<style lang="scss" scoped src="../styles/components/chat-app.scss">
</style>


{
userOneId
userTwoId
arenaId
msgs[
  {
    from
    to
    at
    txt
  }
]
}