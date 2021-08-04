import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rewards:[
      {
        image: "https://s-media-cache-ak0.pinimg.com/originals/d9/81/bf/d981bfc4892112521efb88e880f86e20.png",
        name: 'My Melody Doll',
        points: 5000,
        amount: 2,
      },
      {
        image: "https://sites.google.com/site/tawkartunsanrixoyxdhit04/_/rsrc/1517160022195/kuromi/a0410c5472371291fe4e4d7028610550.png"
        ,name: 'Kuromi Doll',
        points: 3000,
        amount: 10,
      },          
      {
        image: "http://f.lnwfile.com/7mgmwg.png" ,
        name: 'Kitty Doll',
        points: 1000,
        amount: 4,
      }
    ],
    
  },
  mutations: {
    addReward(state,payload){
      state.rewards.push(payload)
    },
    editReward(state,payload){
      state.rewards[payload.index] = payload.data
    },
    removeReward(state,index){
      state.rewards.splice(index,1)
    },
  },
  actions: {
  },
  modules: {
  }
})
