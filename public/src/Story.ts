import { defineStore } from 'pinia'
import {StoryManager} from "./StoryManager";

let storyManager: StoryManager;

export const useStore = defineStore('Story', {
    state: () => {
        return {
            counter: 0,
            name: 'Eduardo',
            isAdmin: true,
            paragraphs: [],
            choices:[]
        }
    },
    getters: {
        gCount(state){
            return state.counter * 10
        }
    },
    actions:{
        continueStory(){

        },
        async load(){
            fetch("ink.json")
                .then((response) => {
                    return response.text();
                })
                .then((content: any) => {
                    if(content){
                        storyManager = new StoryManager(content);
                        storyManager.on("continue", (event:any)=>{
                            this.paragraphs = [
                                ...this.paragraphs,
                                ...event.data.paragraphs
                            ];
                            this.choices = event.data.choices;
                        });
                        storyManager.continueStory();
                    }
                });
        },
        choose(i:number){
            storyManager.choose(i)
        },
        increment(){
            this.counter++
        }
    }
})

