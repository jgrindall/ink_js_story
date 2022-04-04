import {Story} from "inkjs";
import {StoryManager} from "./StoryManager";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'

fetch("ink.json")
    .then(function (response) {
        return response.text();
    })
    .then(function (content: any) {
        if(content){
            //const story = new Story(content);
            //const manager = new StoryManager(story);
            //onsole.log(manager);
            //manager.continueStory();
        }
    });


const app = createApp(App);

app.use(createPinia());

app.mount("#app");

