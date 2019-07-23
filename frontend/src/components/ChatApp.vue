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
    socket.on("chat newMsg", msg => {
      this.msgs.push(msg);
      console.log(this.messages);
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
      const msg = { txt: this.msgTxt };
      socket.emit("chat msg", msg, 12);
      this.msgTxt = "";
    }
  }
};
</script>
<style lang="scss" scoped src="../styles/components/chat-app.scss">
</style>