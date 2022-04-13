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
   @keyframes fading {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
   .choice{
      opacity: 0;
      &.shown{
         background: lightgreen;
         animation: fading ease-in 1s;
         animation-fill-mode: forwards;
         animation-duration: 1s;
      }
      p{
         background: lightblue;
         margin:40px;
         padding:40px;
      }
   }
</style>

