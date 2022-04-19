<template>

   <div class="choice" ref="element">
      <p>
         {{choice.id}}
         Choice: {{choice.text}} {{visible}}
      </p>
   </div>

</template>

<script lang="ts" setup>

    import {PropType, ref } from 'vue';
    import {Choice} from "./types";

    const props = defineProps({
       choice:  {
          type: Object as PropType<Choice>,
          required: true
       },
       visible:{
          type: Boolean,
          required: true
       }
    })
    const element = ref<HTMLElement | null>(null);
    defineExpose({ element })

</script>

<style lang="scss" scoped>
   .choice{
      p{
         background: lightblue;
         margin:40px;
         padding:40px;
      }
   }
</style>

