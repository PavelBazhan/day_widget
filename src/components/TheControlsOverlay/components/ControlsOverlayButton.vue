<script setup>
import { computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const computedControlsOverlayButtonClass = computed(() => ({
  'controls-overlay-button_disabled': props.disabled,
  'controls-overlay-button_selected': props.selected,
}));
</script>

<template>
  <button class="controls-overlay-button" :class="computedControlsOverlayButtonClass" :tabindex="disabled ? -1 : 0">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.controls-overlay-button {
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: #ECFEFF;
  padding: 4px 8px;
  font-size: 14px;
  line-height: 18px;

  &:hover {
    cursor: pointer;
  }

  &_disabled {
    pointer-events: none;
    &:hover {
      cursor: default;
    }
  }

  &_selected {
    text-decoration: underline;
  }
}
</style>