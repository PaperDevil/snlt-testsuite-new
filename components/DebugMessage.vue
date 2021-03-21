<template>
  <div class="log" @click="showFullText">
    <small>{{ datetime }}</small>
    <pre>{{ outText }}</pre>
    <a href="#" v-if="!isShort">
      <v-icon>
        mdi-plus
      </v-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: "DebugMessage",
  props: ["type", "text", "meta", "datetime"],
  data () {
    return {fullText: '', full: false, outText: '', isShort: false}
  },
  mounted() {
    if (this.text.length < 68) {
      this.isShort = true
      this.outText = this.text
    } else {
      this.showFullText()
    }
  },
  methods: {
    showFullText() {
      if (this.full) {
        this.outText = this.fullText
      } else {
        this.fullText = this.text
        this.outText = this.text
        if (this.outText.length > 68) {
          this.outText = this.outText.slice(0, 68) + '...'
        } else {
          this.outText = this.outText.slice(0, 68)
        }
      }
      this.full = !this.full
    }
  }
}
</script>

<style scoped>
.log {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.log:hover {
  background: rgba(0, 0, 0, .3);
}
.log pre {
  padding-left: 2%;
  padding-right: 2%;
}
.log a {
  margin-left: auto;
}
</style>
