<template>

    <div>
        <canvas></canvas>
    </div>

</template>

<script lang="ts">

    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'CanvasView',
        setup(props:any) {

        }
    });

</script>

<style scoped lang="scss">
    canvas{
        background: red;
        background-image: url("./bg.jpg");
    }
</style>