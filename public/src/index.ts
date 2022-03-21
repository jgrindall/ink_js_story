import {Story} from "inkjs";
import {StoryManager} from "./StoryManager";

fetch("ink.json")
    .then(function (response) {
        return response.text();
    })
    .then(function (content: any) {
        if(content){
            const story = new Story(content);
            const manager = new StoryManager(story);
            console.log(manager);
            manager.continueStory();
        }
    });