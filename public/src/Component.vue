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
        <li v-for="(p, i) in paragraphs" :key="i">{{ p }}</li>
    </ul>

    <ul>
        <li v-for="(c, i) in choices" :key="i" @click="store2.choose(i)">{{ c }}</li>
    </ul>

    <button @click="toggleVis">Toggle</button>

    <div v-if="visible">
        <p>visible</p>
    </div>


</template>

<script lang="ts">

    import { defineComponent, ref } from 'vue';
    import { storeToRefs } from 'pinia'
    import {useStore as useCounterStore} from './Counter';
    import {useStore as useStoryStore} from './Story';

    export default defineComponent({
        name: 'Component',
        props: {
            msg: {
                type: String,
                required: true
            }
        },
        setup(props:any) {
            const store = useCounterStore();
            const store2 = useStoryStore();
            store2.load();
            const { name, counter } = storeToRefs(store);
            const { paragraphs, choices } = storeToRefs(store2);

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
