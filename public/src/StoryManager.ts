import {Story} from "inkjs";
import {EventEmitter} from "@billjs/event-emitter";
import {Choice, Paragraph} from "@/types";

const _s = new Story({"inkVersion":20,"root":[[["done",{"#f":5,"#n":"g-0"}],null],"done",{"#f":1}],"listDefs":{}});

let id = 0;

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
        while(this.story.canContinue) {
            const text:string = this.story.Continue() || "";
            paragraphs.push({
                text: text,
                tags: this.story.currentTags || [],
                id: "" + id,
                shown: false,
                delay:0
            });
            id++;
        }
        this.story.currentChoices.forEach((choice: any) => {
            choices.push({
                text: choice.text,
                id: "" +id,
                shown: false,
                delay:0
            });
            id++;
        });
        this.fire("continue", {paragraphs, choices})
    }
}
