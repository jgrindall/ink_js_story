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
            <ParagraphView :ref="el => elements[i] = el.$el" class="fade-in" :paragraph="paragraph"/>
        </li>
    </ul>

    <ul>
        <li v-for="(choice, i) in choices" :key="choice.id" @click="store2.choose(i)">
            <ChoiceView class="fade-in" :choice="choice"/>
        </li>
    </ul>

    <button @click="toggleVis">Toggle</button>
    <div v-if="visible">
        <p>visible</p>
    </div>
</template>

<script lang="ts" setup>

    import {
        defineComponent, ComponentPublicInstance, ref, ComputedRef,
        onMounted, onUnmounted, PropType, computed, defineExpose, defineProps
    } from "vue";

    import { storeToRefs } from 'pinia'
    import {useStore as useCounterStore} from './Counter';
    import {useStore as useStoryStore} from './Story';
    import ChoiceView from "./ChoiceView.vue";
    import ParagraphView from "./ParagraphView.vue";
    import {Paragraph} from "./types";

    type PType = (typeof ParagraphView) | null;
    const elements = ref<PType[]>([]);

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
            return Object.values(elements?.value || []);
        }
    });


</script>
