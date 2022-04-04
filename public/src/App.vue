<template>

    <div>hi</div>

    <component :msg="name"></component>

</template>

<script lang="ts">

    import Component from "./Component.vue";

    export default {
        data() {
            return {
                name: 'John123'
            }
        },
        components: {
            Component
        }
    }

</script>


