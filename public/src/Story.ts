import { defineStore } from 'pinia'
import {StoryManager} from "./StoryManager";
import {Choice, Paragraph} from "@/types";

let storyManager: StoryManager;

type StoryState = {
    counter:number,
    name:string,
    isAdmin:boolean,
    paragraphs: Paragraph[],
    choices: Choice[]
}

export const useStore = defineStore('Story', {
    state: (): StoryState => {
        return {
            counter: 0,
            name: 'Eduardo',
            isAdmin: true,
            paragraphs: [],
            choices: []
        }
    },
    getters: {
        gCount(state){
            return state.counter * 10
        }
    },
    actions:{
        async load(filename:string = "ink.json"){
            fetch(filename)
                .then((response) => {
                    return response.text();
                })
                .then((content: any) => {
                    if(content){
                        storyManager = new StoryManager(content);
                        storyManager.on("continue", (event:any)=>{
                            console.log(event.data);
                            this.paragraphs = [
                                ...this.paragraphs,
                                ...event.data.paragraphs
                            ];
                            this.choices = event.data.choices;
                        });
                        storyManager.continue();
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

