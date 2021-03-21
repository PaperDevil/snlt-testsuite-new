import error from "@/layouts/error";

export const state = () => ({
  skill_working_url: 'http://localhost:8080',
  skill_name: 'skill-name',
  global_id: 0,
  input_text: '',
  client_type: 'text',
  test_context: {},
  debug_log: [],
  messages: [],
  theme: 'dark',

  client_app: 'testsuite',
  user_id: 0
});

export const getters = {
  vuetifyTheme: (store) => {
    return store.theme
  },
  allMessages: (store) => {
    return store.messages
  },
  debugLog: (store) => {
    return store.debug_log
  }
};

const axios = require('axios');

export const actions = {
  async sendMessage({commit, state, dispatch}, message) {
    commit('appendMessage', {'who': 'me', 'out_text': message})
    let data = {
      "User": {
        "user_id": state.user_id,
        "global_id": state.global_id,
        "client": {
          "name": state.client_app,
          "type": state.client_type
        }
      },
      "Update": {
        "in_text": message
      },
      "Context": state.test_context
    }
    commit('appendLogMessage', {message: `Message data: ${JSON.stringify(data, null, 2)}`})
    axios.post(state.skill_working_url + '/skill', data)
      .then((response) => {
        commit('appendLogMessage', {message: `Response data: ${JSON.stringify(response.data, null, 2)}`})
        if (response.data.status === 'exit') {
          dispatch('refresh')
        } else {
          commit('appendMessage', {
            'who': 'bot',
            'out_text': response.data.out_text,
            'choices': response.data.choices
          })
          commit('updateContext', response.data.context)
        }
        state.input_text = ''
      })
  },
  async sendChoice({commit, state, dispatch}, choice) {
    let data = {
    User: {
      user_id: state.user_id,
      global_id: state.global_id,
      client: {
        name: state.client_app,
        type: state.client_type
      }
    },
    Update: {
      in_choice: choice
    },
    Context: state.test_context
    }
    commit('appendLogMessage', {message: `Message data: ${JSON.stringify(data, null, 2)}`})
    axios.post(state.skill_working_url + '/skill', data)
      .then((response) => {
        commit('appendLogMessage', {message: `Response data: ${JSON.stringify(response.data, null, 2)}`})
        if (response.data.status === 'exit') {
          dispatch('refresh')
        } else {
          commit('appendMessage',{
            'who': 'bot',
            'out_text': response.data.out_text,
            'choices': response.data.choices
          })
          commit('updateContext', response.data.context)
        }
      })
  },
  async updateSettings({commit, state}) {
    await axios.get(state.skill_working_url + '/snlt')
      .then((response) => {
        if (response.status === 200) {
          commit('updateSettings', {
            skill_name: response.data.skill_name,
            skill_working_url: response.data.skill_working_url,
            theme: response.data.testsuite.theme,
            client_type: response.data.testsuite.client_type,
            global_id: response.data.testsuite.global_id,
            client_app: response.data.testsuite.client_app
          })
        } else {
          commit('appendLogMessage', {message: "Error when updating .snlt"})
        }
      })
      .catch((error) => {
        commit('appendLogMessage', {message: error.message + ` ${state.skill_working_url}`})
      })
  },
  refresh({commit, state}) {
    commit('deleteContext')
    commit('deleteAllMessages')
    commit('appendLogMessage', {message: 'User context was deleted!'})
  }
};

export const mutations = {
  appendMessage: (state, message) => {
    state.messages.unshift(message)
  },
  deleteAllMessages: (state) => {
    state.messages = []
  },
  deleteContext: (state) => {
    state.test_context = {}
  },
  updateContext: (state, context) => {
    state.test_context = context
  },
  appendLogMessage: (state, {message, type='info', meta}) => {
    console.log(JSON.stringify({message, type, meta}))
    let currentdate = new Date();
    state.debug_log.unshift({
      id: state.debug_log.length + 1,
      text: message,
      datetime: `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
      type,
      meta
    })
  },
  clearLog: (state) => {
    state.debug_log = []
  },
  updateSettings: (state, {skill_name, skill_working_url, client_type, client_app, global_id, theme}) => {
    console.log({skill_name, skill_working_url, client_type, client_app, global_id})
    state.skill_name = skill_name
    state.skill_working_url = skill_working_url
    state.client_type = client_type
    state.global_id = global_id
    state.client_app = client_app
    state.theme = theme
  }
};

