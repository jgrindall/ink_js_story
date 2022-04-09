import {Story} from "inkjs";
import {EventEmitter} from "@billjs/event-emitter";
import {Choice, Paragraph} from "@/types";

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
    public choose(index:number){
        this.story.ChooseChoiceIndex(index);
        this.continue();
    }
    public continue() {
        const paragraphs:Paragraph[] = [];
        const choices:Choice[] = [];

        console.log(this.story.currentDebugMetadata);
        console.log(this.story.currentFlowName);
        console.log(this.story.currentTags);

        while(this.story.canContinue) {
            const c:string = this.story.Continue() || "";
            console.log(c);
            console.log(this.story.currentDebugMetadata);
            console.log(this.story.currentFlowName);
            console.log();
            paragraphs.push({
                text: c,
                tags: this.story.currentTags || [],
                id: "" + Math.random()*100000000000
            });
        }
        this.story.currentChoices.forEach((choice: any) => {
            console.log(choice);
            choices.push({
                text: choice.text,
                id: "" + Math.random()*100000000000
            })
        });
        this.fire("continue", {paragraphs, choices})
    }
}
