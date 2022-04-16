<template>
    <div>
        {{ msg }} {{ counter }} {{ store.gCount }}
    </div>

   <Wrapper :items="items">
        <template #default="{ item: item }">
            <ParagraphView v-if="(item as any).type === 'paragraph'" :paragraph="(item as any)"/>
            <ChoiceView v-else-if="(item as any).type === 'choice'" :choice="(item as any)" @click="store2.choose((item as any))"/>
        </template>
    </Wrapper>

    <button @click="toggleVis">Toggle</button>
    <div v-if="visible">
        <p>visible</p>
    </div>
</template>

<script lang="ts" setup>

    import {ref, onMounted, onUnmounted, PropType, computed} from "vue";
    import { storeToRefs } from 'pinia'
    import {useStore as useCounterStore} from './Counter';
    import {useStore as useStoryStore} from './Story';
    import ChoiceView from "./ChoiceView.vue";
    import ParagraphView from "./ParagraphView.vue";
    import {Paragraph} from "./types";
    import Wrapper from "./Wrapper.vue";

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

    const items = computed(() => {
        const paragraphsWithType = paragraphs.value.map((p:Paragraph) => {
            return {
                ...p,
                type: "paragraph"
            }
        })
        const choicesWithType = choices.value.map(c => {
            return {
                ...c,
                type:"choice"
            }
        });
        return [
            ... paragraphsWithType,
            ... choicesWithType
        ];
    });

    const toggleVis = () => {
        visible.value = !visible.value;
        store.increment();
    };

</script>
