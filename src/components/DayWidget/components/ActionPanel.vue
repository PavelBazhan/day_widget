<script setup>
import WidgetActionButton from './WidgetActionButton.vue';

const actionButtonList = [
  {
    icon: 'icon_code',
    action: () => {},
  },
  {
    icon: 'icon_code',
    action: () => {},
  },
  {
    icon: 'icon_code',
    action: () => {},
  },
  {
    icon: 'icon_code',
    action: () => {},
  },
  {
    icon: 'icon_code',
    action: () => {},
  },
];
</script>

<template>
  <div class="day-widget-action-panel">
    <WidgetActionButton
      class="action-button"
      v-for="(actionButton, index) in actionButtonList"
      :key="index"
    />
  </div>
</template>

<style scoped lang="scss">
.day-widget-action-panel {
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.action-button {
  flex: 1 1 0;
}
</style>