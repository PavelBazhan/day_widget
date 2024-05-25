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
    <div
      class="day-widget-action-panel__button-wrapper"
      v-for="(actionButton, index) in actionButtonList"
      :key="index"
    >
      <WidgetActionButton class="action-button" :icon="actionButton.icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.day-widget-action-panel {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  overflow: hidden;
  &__button-wrapper {
    height: 48px;
    flex: 1 1 0%;
    overflow: hidden;
  }
}
.action-button {
  flex: 1 1 0;
}
</style>