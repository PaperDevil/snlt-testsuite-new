<template>
  <div class="main">
    <div class="chat">

      <div class="chat-main">
        <div class="" v-for="message in allMessages" :key="allMessages.length">
          <ChatMessage :who='message.who' :out_text='message.out_text' :choices='message.choices' @choiced='sendChoice'/>
        </div>
      </div>

      <div class="chat-input">
        <ChatFooter @sendMessage='sendMessage'/>
      </div>
    </div>
    <div class="debug-main">
      <DebugMessage v-for="message in debugLog" :key="message.id" :type="message.type" :text="message.text" :meta="message.meta" :datetime="message.datetime"/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"

import ChatFooter from "~/components/ChatFooter";
import ChatMessage from "~/components/ChatMessage";
import DebugMessage from "@/components/DebugMessage";

export default {
  name: "chat.vue",
  components: {ChatMessage, ChatFooter, DebugMessage},
  computed: mapGetters(["vuetifyTheme", "allMessages", "debugLog"]),
  methods: mapActions(["sendMessage", "sendChoice"]),
  created() {
    setInterval(() => {this.$store.dispatch('updateSettings')}, 2000)
    setInterval(() => {
      this.$vuetify.theme.dark = this.vuetifyTheme === 'dark';
    }, 1000)
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: row;
}
.chat {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}
.chat-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  padding: 3%;
  overflow: auto;
  overflow-x: hidden
}
.chat-input {
  margin-top: auto;
}
.debug-main {
  width: 100%;
  height: 95%;
  padding: 3%;
  border: 1px darkgrey solid;
  border-radius: 1rem;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
}
</style>
