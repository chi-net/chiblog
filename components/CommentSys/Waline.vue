<script setup>
const props = defineProps({
  backend: String,
  path: String
})
import { Waline } from '@waline/client/component';
import '@waline/client/dist/waline.css';
</script>
<template>
  <Waline :serverURL="props.backend" :path="props.path" />
</template>
<style>
.wl-panel{
  background: transparent;
  border: 0;
}
.wl-input,.wl-editor:focus {
  background: transparent;
}
</style>
