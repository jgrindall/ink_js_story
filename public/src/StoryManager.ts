import {Story} from "inkjs";
import {EventEmitter} from "@billjs/event-emitter";
import {Choice, Paragraph, Tags} from "@/types";

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
    public setVariable(varName:string, value: any){
        this.story.EvaluateFunction("changeName", [value]);
    }
    public continue() {
        const paragraphs:Paragraph[] = [];
        const choices:Choice[] = [];
        while(this.story.canContinue) {
            const text:string = this.story.Continue() || "";
            // merge tag objects
            const tagsArray:Tags[] = (this.story.currentTags || []).map(s => JSON.parse(s) as Tags);
            const tags = tagsArray.reduce((memo: Tags, current: Tags)=>{
                return {
                    ...current,
                    ...memo
                };
            }, {} as Tags);

            paragraphs.push({
                text,
                tags,
                id: "" + id
            });
            id++;
        }
        this.story.currentChoices.forEach((choice: any) => {
            choices.push({
                text: choice.text,
                id: "" + id
            });
            id++;
        });
        const variables = this.story.variablesState;
        this.fire("continue", {
            paragraphs,
            choices,
            variables
        })
    }
}






/**

 VAR x = 20
 VAR y = 20
 VAR water = 20

 The desert was vast. My steps were erased soon after I placed them, but I had to continue. I knew that with every movement on the map, I would drink water — and I was quickly running out.
 -> Choices

 === Choices ===

 { water < 1: -> Out_Of_Water }

 + [Keep going]
 -> Choices

 === Out_Of_Water ===
 I shook my canteen, but could tell it was empty. This… this was the last step in my journey.
 -> DONE

 === function goNorth() ===
 { setY(y – 1) }
 { drinkWater() }

 === function goSouth() ===
 { setY(y + 1) }
 { drinkWater() }

 === function goWest() ===
 { setX(x – 1) }
 { drinkWater() }

 === function goEast() ===
 { setX(x + 1) }
 { drinkWater() }

 === function setX(newX) ===
 {

    – newX > 100:
        ~ x = 100
    – newX < 0:
        ~ x = 0
    – else:
        ~ x = newX
}

 === function setY(newY) ===
 {
    – newY > 100:
        ~ y = 100
    – newY < 0:
        ~ y = 0
    – else:
        ~ y = newY
}

 === function currentPosition() ===
 (Currently at {x} and {y}.)

 === function drinkWater() ===
 ~ water = water – 1

 === function currentWater() ===
 (Remaining water {water})

 **/