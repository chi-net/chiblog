<script setup>
import { defineProps } from 'vue'
import { mdiAccount, mdiClockOutline, mdiAccountArrowUp, mdiComment, mdiBook, mdiTag, mdiFountainPenTip, mdiPin, mdiEye } from '@mdi/js'
const props = defineProps({
  name: String,
  width: Number,
  Height: Number
})
const mdiArray = {
  account: mdiAccount,
  clockoutline: mdiClockOutline,
  accountarrowup: mdiAccountArrowUp,
  comment: mdiComment,
  book: mdiBook,
  tag: mdiTag,
  textCount: mdiFountainPenTip,
  pin: mdiPin,
  views: mdiEye
}
const read = mdiArray[props.name] || ''
const width = props.width || 24
const height = props.height || 24
</script>
<template>
<svg fill="currentColor" :width="width" :height="height" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path :d="read"></path>
</svg>
</template>
