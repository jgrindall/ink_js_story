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
    div, canvas{
        width:100%;
        height:100%;
    }
    canvas{
        background: red;
        background-image: url("./bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>