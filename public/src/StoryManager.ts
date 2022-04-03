import {Story} from "inkjs";

const _s = new Story({"inkVersion":20,"root":[[["done",{"#f":5,"#n":"g-0"}],null],"done",{"#f":1}],"listDefs":{}});

export function showAfter(delay:number, el:any) {
    setTimeout(function() {
        el.classList.add("show")
    }, delay);
}

export function scrollToBottom() {
    const start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const dist = document.body.scrollHeight - window.innerHeight - start;
    if( dist < 0 ){
        return;
    }
    const duration = 300 + 300*dist/100;
    let startTime:number = 0;
    function step(time: number) {
        if( startTime == null ){
            startTime = time;
        }
        const t = (time-startTime) / duration;
        const lerp = 3*t*t - 2*t*t*t;
        window.scrollTo(0, start + lerp*dist);
        if( t < 1 ){
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

export class StoryManager{

    storyContainer: any;
    
    constructor(private story: typeof _s){
        this.storyContainer = document.querySelectorAll('#story')[0];
    }
    continueStory() {
        let delay = 0;
        // Generate story text - loop through available content

        while(this.story.canContinue) {
            // Get ink to generate the next paragraph
            let paragraphText:any = this.story.Continue();
            // Create paragraph element
            let paragraphElement:any = document.createElement('p');
            paragraphElement.innerHTML = paragraphText;
            this.storyContainer.appendChild(paragraphElement);
            // Fade in paragraph after a short delay
            showAfter(delay, paragraphElement);
            delay += 200;
        }

        // Create HTML choices from ink choices
        this.story.currentChoices.forEach((choice: any) => {
            // Create paragraph with anchor element
            var choiceParagraphElement = document.createElement('p');
            choiceParagraphElement.classList.add("choice");
            choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
            this.storyContainer.appendChild(choiceParagraphElement);
            // Fade choice in after a short delay
            showAfter(delay, choiceParagraphElement);
            delay += 200;
            // Click on choice
            const choiceAnchorEl:any = choiceParagraphElement.querySelectorAll("a")[0];
            choiceAnchorEl.addEventListener("click", (event: any) => {
                // Don't follow <a> link
                event.preventDefault();
                const existingChoices:any[] = this.storyContainer.querySelectorAll('p.choice');
                for(let i=0; i < existingChoices.length; i++) {
                    const c:any = existingChoices[i];
                    c.parentNode.removeChild(c);
                }
                this.story.ChooseChoiceIndex(choice.index);
                this.continueStory();
            });
        });
    }
}
