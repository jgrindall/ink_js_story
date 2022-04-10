<template>

   <p>
      1 {{choice.text}}
   </p>

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
   p{
      background: lightblue;
      margin:40px;
      padding:40px;
   }
</style>