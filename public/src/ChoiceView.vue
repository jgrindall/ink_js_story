<template>

   <div class="choice">
      <p>
         Choice: {{choice.text}}
      </p>
   </div>

</template>

<script lang="ts" setup>

    import {PropType } from 'vue';
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

