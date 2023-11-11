<script setup>
const props = defineProps({
  backend: String,
  path: String
})
import { Waline } from '@waline/client/component';
import '@waline/client/dist/waline.css';
</script>
<template>
  <Waline :serverURL="props.backend" :path="path" />
</template>
