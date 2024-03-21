<script setup>
import WidgetActionButton from './WidgetActionButton.vue';

const actionButtonList = [
  {
    icon: 'calendar',
    action: () => {},
  },
  {
    icon: 'message',
    action: () => {},
  },
  {
    icon: 'post',
    action: () => {},
  },
  {
    icon: 'search',
    action: () => {},
  },
  {
    icon: 'notes',
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
      :icon="actionButton.icon"
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