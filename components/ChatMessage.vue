<template>
  <div class="message">
      <div class="me accent" v-if="who === 'me'">
          <p class="text">{{ out_text }}</p>
      </div>
      <div class="bot error" v-else>
          <p class="text">{{ out_text }}</p>
          <v-btn block v-for="choice in choices" :key="choice" class="choice secondary" @click="choice_val(choice[1])">
              {{ choice[0] }}
          </v-btn>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ChatMessage',
    props: ['who', 'out_text', 'choices'],
    methods: {
        choice_val (choice_value) {
            this.$emit('choiced', choice_value)
        }
    }
}
</script>

<style scoped>
.message {
    width: 100%;
    margin: 5px;
    font-size: 1.4rem;
    display: flex;
}
.me {
    margin-left: auto;
    padding: 12px;
    padding-bottom: 0;
    border-radius: 10px;
}
.bot {
    margin-right: auto;
    padding: 12px;
    border-radius: 10px;
}
.choice {
    margin-top: .5rem;
    font-size: 1.4rem;
    width: 100%;
    padding-top: .2rem;
    padding-bottom: .2rem;
    border-radius: .5rem;
    border: none;
    transition: 200ms ease;
}
.choice:hover {
    background: rgba(54, 68, 143, 0.3);
}
</style>
