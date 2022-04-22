<template>
    <div>
        {{ counter }} {{ store.gCount }}
    </div>
    <div>
        visible>
        {{visible}}
    </div>

    <div class="wrapper" ref="wrapperRef">
        <div class="scroll" ref="scrollRef">
            <ParagraphView
                    v-for="paragraph in paragraphs"
                    :paragraph="paragraph"
                    :visible="visible[paragraph.id]"
                    @seen="onSeen"
                    :ref="(el:any) => addChild(paragraph, el)"
            />
            <ChoiceView
                    v-for="choice in choices"
                    :choice="choice"
                    :visible="visible[choice.id]"
                    @click="store2.choose(choice)"
                    :ref="(el:any) => addChild(choice, el)"
            />
            </div>
    </div>

</template>

<script lang="ts" setup>

    import {ref, Ref, onMounted, onBeforeUnmount, PropType, computed} from "vue";
    import { storeToRefs } from 'pinia'
    import {useStore as useCounterStore} from './Counter';
    import {useStore as useStoryStore} from './Story';
    import ChoiceView from "./ChoiceView.vue";
    import ParagraphView from "./ParagraphView.vue";
    import {Paragraph} from "./types";
    import Wrapper from "./Wrapper.vue";
    import {isContained} from "./Layout";

    const props = defineProps({
        msg:  {
            type: String,
            required: true
        }
    });

    const store = useCounterStore();
    const store2 = useStoryStore();

    const wrapperRef = ref<HTMLElement | null>(null);
    const scrollRef = ref<HTMLElement | null>(null);
    const visible : Ref<{[key:string]: boolean}> = ref({});

    const { name, counter } = storeToRefs(store);
    const { paragraphs, choices } = storeToRefs(store2);

    const emit = defineEmits(['continue']);

    const onSeen = ()=>{
        emit('continue');
    };

    onMounted(()=>{
        scrollRef?.value?.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
        scrollRef?.value?.removeEventListener("scroll", handleScroll);
    });

    let children: {[key: string] : HTMLElement} = {};

    const addChild = (item: {id: string}, el:any) =>{
        if(!children[item.id] && el.element){
            children[item.id] = el.element;
            updateVis();
        }
    }

    const isElemVisible = (el: HTMLElement): boolean => {
        return isContained(el.getBoundingClientRect(), wrapperRef?.value?.getBoundingClientRect())
    };

    const updateVis = ()=>{
        Object.keys(children).forEach((id: string)=>{
            visible.value[id] = isElemVisible(children[id]);
        })
    };

    const handleScroll = () => {
        updateVis();
    };

</script>

<style lang="scss" scoped>
    .wrapper{
        position: absolute;
        top:0px;
        left:0px;
        width:100%;
        height:100%;
        .scroll{
            overflow-y: auto;
            position: absolute;
            top: 0;
            height: 100%;
            left: 0;
            width: 100%;
        }
    }
</style>


