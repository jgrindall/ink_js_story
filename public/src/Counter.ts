import { defineStore } from 'pinia'

export const useStore = defineStore('Counter', {
    state: () => {
        return {
            counter: 0,
            name: 'Eduardo',
            isAdmin: true,
        }
    },
    getters: {
        gCount(state){
            return state.counter * 10
        }
    },
    actions:{
        increment(){
            this.counter++
        }
    }
})
