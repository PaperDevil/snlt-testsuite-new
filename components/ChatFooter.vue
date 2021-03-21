<template>
        <v-text-field
            v-model="inText"
            clearable
            outlined
            label="Message"
            class="input-block"
            type="text"
            :append-outer-icon="'mdi-send'"
            @click:append-outer="sendMessage()"
            @keydown.enter="sendMessage()"
        >
        </v-text-field>
</template>

<script>
export default {
    name: 'ChatFooter',
    data () {
        return {
            inText: ''
        }
    },
    methods: {
        sendMessage () {
            if (this.inText) {
                this.$emit('sendMessage', this.inText)
                this.inText = ''
            }
        }
    }
}
</script>

<style scoped>
.input-block {
  width: 100%;
  bottom: auto;
  padding: 2%;
}
</style>
