import { defineStore } from 'pinia'
import {StoryManager} from "./StoryManager";
import {Choice, Paragraph, StoryContinueEvent} from "./types";
import {last} from "underscore";

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
        async load(filename:string = "story.ink.json"){
            fetch(filename)
                .then((response) => {
                    return response.text();
                })
                .then((content: Object) => {
                    if(content){
                        storyManager = new StoryManager(content);
                        storyManager.on("data", (event:StoryContinueEvent)=>{
                            const paragraph = event.data.paragraph
                            this.paragraphs = [
                                ...this.paragraphs,
                                paragraph
                            ];
                            this.choices = event.data.choices;
                            console.log(event.data.variables["name"]);
                        });
                        storyManager.continue();
                    }
                });
        },
        continue(){
            storyManager.continue();
        },
        setVariable(varName:string, value: any){
            storyManager.setVariable(varName, value);
        },
        choose(choice: Choice){
            const ids = this.choices.map( (c: Choice) =>c.id);
            storyManager.choose(ids.indexOf(choice.id))
        },
        increment(){
            this.counter++
        }
    }
})

