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

    <p>Story</p>


    <!--

    https://v2.vuejs.org/v2/guide/transitions.html#Staggering-List-Transitions
    <transition name="fade">
        <p v-if="show">hello</p>
    </transition>
    -->

    <ul>
        <li v-for="para in paragraphs" :key="para.id">
            <paragraph ref="fade" class="fade-in" :para="para"></paragraph>
        </li>
    </ul>

    <p>Choices</p>

    <ul>
        <li v-for="(choice, i) in choices" :key="choice.id" @click="store2.choose(i)">
            <choice class="fade-in" :choice="choice"></choice>
        </li>
    </ul>

    <button @click="toggleVis">Toggle</button>

    <div v-if="visible">
        <p>visible</p>
    </div>


</template>

<script lang="ts">

    import { defineComponent, ref, onMounted, onUnmounted } from "vue";


    import { storeToRefs } from 'pinia'
    import {useStore as useCounterStore} from './Counter';
    import {useStore as useStoryStore} from './Story';
    import {Paragraph, Choice} from "@/types";
    import ChoiceView from "./ChoiceView.vue";
    import ParagraphView from "./ParagraphView.vue";

    export default defineComponent({
        name: 'ComponentView',
        components: {
            paragraph: ParagraphView,
            choice: ChoiceView
        },
        props: {
            msg: {
                type: String,
                required: true
            }
        },
        setup(props:any) {
            const store = useCounterStore();
            const store2 = useStoryStore();

            const els = ref<HTMLInputElement | null>(null)

            store2.load();
            const { name, counter } = storeToRefs(store);
            const { paragraphs, choices } = storeToRefs(store2);

            const c1 = ref(store2.choices);

            const printMsg = (msg: string) => {
                console.log(`The message is: ${msg}`);
            };

            const age = ref<number>(20);
            const visible = ref(false);

            const toggleVis = () => {
                visible.value = !visible.value;
                printMsg("hello");
                store.increment();
            };

            const markForTransition = ()=>{

            };

            const isElemVisible = (el: HTMLElement): boolean => {
                var rect = el.getBoundingClientRect()
                var elemTop = rect.top + 100;
                var elemBottom = rect.bottom;
                return elemTop < window.innerHeight && elemBottom >= 0
            };

            onMounted(() => {
                window.addEventListener("scroll", handleScroll)
                handleScroll(null);
            });

            onUnmounted(() => {
                window.removeEventListener("scroll", handleScroll)
            });

            const handleScroll = (e:any) => {
                console.log(e);
                //const els = this.$refs.fade;
                //console.log(els);
            };

            return {
                store,
                store2,
                paragraphs,
                choices,
                //name,
                counter,
                age,
                toggleVis,
                printMsg,
                visible
            };
        }
    });

</script>
