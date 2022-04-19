import {Story} from "inkjs";
import {EventEmitter} from "@billjs/event-emitter";
import {Choice, Paragraph, ParagraphContent, Tags} from "@/types";

const _s = new Story({"inkVersion":20,"root":[[["done",{"#f":5,"#n":"g-0"}],null],"done",{"#f":1}],"listDefs":{}});

const merge = <T>(arr:T[]) : T => {
    return arr.reduce((memo: T, current: T)=>{
        return {
            ...current,
            ...memo
        };
    }, {} as T)
};

let id = 0;

//BindExternalFunctin
//ObserveVariable
//https://klaudiabronowicka.com/blog/2020-12-15-making-a-visual-novel-with-unity-4-5-variables-and-state-management/

export class StoryManager extends EventEmitter {

    private story: typeof _s;
    
    constructor(content: Object){
        super();
        this.story = new Story(content);
    }
    public choose(index:number){
        this.story.ChooseChoiceIndex(index);
        //this.continue();
    }
    public divert(knotName: string){
        //this.story.
    }
    private getData(){
        const text:string = this.story.Continue() || "";
        let contents:ParagraphContent[] = [
            {
                type: "text",
                text: text
            }
        ];
        // merge tag objects into one JSON object
        const tagsArray:Tags[] = (this.story.currentTags || []).map(s => JSON.parse(s) as Tags);
        const tags = merge(tagsArray);
        if(tags.link) {
            //also load the next one
            contents = [
                ...contents,
                {
                    type: "link",
                    text: tags.link
                },
                {
                    type: "text",
                    text: this.story.Continue() || ""
                }
            ]
        }
        const paragraph: Paragraph = {
            contents: contents,
            tags,
            id: "" + id
        };
        id++;
        const choices: Choice[] = [];
        this.story.currentChoices.forEach((choice: any) => {
            choices.push({
                text: choice.text,
                type: "choice",
                id: "" + id
            });
            id++;
        });
        const variables = this.story.variablesState;
        return {
            paragraph,
            choices,
            variables
        };
    }
    public continue(){
        if(this.story.canContinue){
            const data = this.getData();
            this.fire("data", data);
        }
    }
    public setVariable(varName:string, value: any){
        this.story.EvaluateFunction("changeName", [value]);
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