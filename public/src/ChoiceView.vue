<template>

   <p>
      1 {{choice.text}}
   </p>

</template>

<script lang="ts">

    import { defineComponent, PropType } from 'vue';
    import {Choice} from "@/types";

    export default defineComponent({
        name: 'ChoiceView',
        props: {
            choice: {
                type: Object as PropType<Choice>,
                required: true
            }
        },
        setup(props:any) {
            return {
                choice: props.choice
            };
        }
    });

</script>


<style lang="scss" scoped>
   p{
      background: lightblue;
      margin:40px;
      padding:40px;
   }
</style>