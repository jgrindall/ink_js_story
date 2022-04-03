<template>

    <div>
        {{ msg }}
    </div>

    <button @click="toggleVis">Toggle</button>

    <div v-if="visible">
        <p>visible</p>
    </div>


</template>

<script lang="ts">

    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        name: 'Component',
        props: {
            msg: {
                type: String,
                required: true
            }
        },
        setup(props) {
            const printMsg = (msg: string) => {
                console.log(`The message is: ${msg}`);
            };

            const name = ref('John');

            const age = ref<number>(20);

            const visible = ref(false);

            const toggleVis = () => {
                visible.value = !visible.value;
                printMsg("hello");
            };

            return {
                name,
                age,
                toggleVis,
                printMsg,
                visible
            };
        }
    });

</script>
