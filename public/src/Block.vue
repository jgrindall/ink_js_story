<template>

   <div class="block" :class="{visible: block.visible}">
      <p>Block</p>
      <p>{{block.content}}</p>
   </div>

</template>

<script lang="ts" setup>

    import {PropType, defineProps } from 'vue';

    const props = defineProps({
       block:  {
          type: Object,
          required: true
       }
    })

</script>

<style lang="scss" scoped>
   .block{
      width:200px;
      height:150px;
      background:red;
      margin:50px;
      padding:50px;
      &.visible{
         background: green;
      }
   }
</style>

