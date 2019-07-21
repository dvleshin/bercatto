<template>
  <section>
    <div class="chat-list">
       <ul id="messages"></ul>
    </div>
    <!-- <template v-if="isTyping">
      <span class="typing-msg">typing...</span>
    </template> -->
    <div class="form">
      <form>
        <v-text-field id="txt" placeholder="Your message..."></v-text-field>
        <button @click.prevent="">
          <v-icon>send</v-icon>
        </button>
      </form>
    </div>
  </section>
</template>


<script>

</script>
<style lang="scss" scoped src="../styles/components/chat-app.scss">
</style>