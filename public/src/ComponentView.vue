<template>
    <div>
        {{ msg }}
    </div>

    <div>
        {{ counter }}
    </div>

    <div>
        {{ store.gCount }}
    </div>

    <ul>

        <li v-for="(paragraph, i) in paragraphs" :key="paragraph.id">
            <ParagraphView :ref="(el:any) => paragraphRefs[i] = el.$el" class="fade-in" :paragraph="paragraph"/>
        </li>
    </ul>

    <ul>
        <li v-for="(choice, i) in choices" :key="choice.id" @click="store2.choose(i)">
            <ChoiceView :ref="(el:any) => choiceRefs[i] = el.$el" class="fade-in" :choice="choice"/>
        </li>
    </ul>

    <button @click="toggleVis">Toggle</button>
    <div v-if="visible">
        <p>visible</p>
    </div>
</template>

<script lang="ts" setup>

    import {
        ref,
        onMounted, onUnmounted, PropType, computed, defineExpose, defineProps
    } from "vue";

    import { storeToRefs } from 'pinia'
    import {useStore as useCounterStore} from './Counter';
    import {useStore as useStoryStore} from './Story';
    import ChoiceView from "./ChoiceView.vue";
    import ParagraphView from "./ParagraphView.vue";
    import {Paragraph} from "./types";

    const paragraphRefs = ref<( (typeof ParagraphView) | null)[]>([]);
    const choiceRefs = ref<( (typeof ChoiceView) | null)[]>([]);

    const props = defineProps({
        msg:  {
            type: String,
            required: true
        }
    });

    const visible = ref(false);

    const store = useCounterStore();
    const store2 = useStoryStore();

    const { name, counter } = storeToRefs(store);
    const { paragraphs, choices } = storeToRefs(store2);

    const printMsg = (msg: string) => {
        console.log(`The message is: ${msg}`);
    };

    const toggleVis = () => {
        visible.value = !visible.value;
        printMsg("hello");
        store.increment();
    };

    defineExpose({
        getRects:()=>{
            return [
                ...Object.values(paragraphRefs?.value || []),
                ...Object.values(choiceRefs?.value || [])
            ]
        }
    });


</script>
