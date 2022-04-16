<template>

   <div class="choice"
        :class="{'shown': choice.shown}"
        :style="{'animation-delay' : choice.delay + 's'}">
      <p>
         Choice: {{choice.text}}
         <span>delay = {{choice.delay}}</span>
      </p>

   </div>

</template>

<script lang="ts" setup>

    import {PropType, defineProps } from 'vue';
    import {Choice} from "@/types";

    const props = defineProps({
       choice:  {
          type: Object as PropType<Choice>,
          required: true
       }
    })

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

