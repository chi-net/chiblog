<template>
  <div class="card">
    <div>
      <slot></slot>      
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../styles/cardback.scss';
.card div {
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
}
</style>