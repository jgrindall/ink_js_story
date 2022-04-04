import {Story} from "inkjs";
import {EventEmitter} from "@billjs/event-emitter";

const _s = new Story({"inkVersion":20,"root":[[["done",{"#f":5,"#n":"g-0"}],null],"done",{"#f":1}],"listDefs":{}});

export function showAfter(delay:number, el:any) {
    setTimeout(function() {
        el.classList.add("show")
    }, delay);
}

export class StoryManager extends EventEmitter{

    private story: typeof _s;
    
    constructor(content: any){
        super();
        this.story = new Story(content);
    }

    choose(index:number){
        this.story.ChooseChoiceIndex(index);
        this.continueStory();
    }

    continueStory() {
        // Generate story text - loop through available content

        const paragraphs:any[] = [];
        const choices:any[] = [];

        while(this.story.canContinue) {
            // Get ink to generate the next paragraph
            paragraphs.push(this.story.Continue());
        }

        // Create HTML choices from ink choices
        this.story.currentChoices.forEach((choice: any) => {
            choices.push(choice.text);


            // Create paragraph with anchor element
            //var choiceParagraphElement = document.createElement('p');
            //choiceParagraphElement.classList.add("choice");
            //c/hoiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
            //this.storyContainer.appendChild(choiceParagraphElement);
            // Fade choice in after a short delay
            //showAfter(delay, choiceParagraphElement);
            //delay += 200;
            // Click on choice
            //const choiceAnchorEl:any = choiceParagraphElement.querySelectorAll("a")[0];
            //choiceAnchorEl.addEventListener("click", (event: any) => {
                // Don't follow <a> link
                //event.preventDefault();
                //const existingChoices:any[] = this.storyContainer.querySelectorAll('p.choice');
                //for(let i=0; i < existingChoices.length; i++) {
                    //const c:any = existingChoices[i];
                    //c.parentNode.removeChild(c);
                //}
                //this.story.ChooseChoiceIndex(choice.index);
                //this.continueStory();
            //});
        });


        this.fire("continue", {paragraphs, choices})

    }
}
