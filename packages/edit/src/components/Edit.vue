<template>
  <div class="tce-video">
    <ElementPlaceholder
      v-if="!element.data.url"
      :icon="manifest.ui.icon"
      :is-disabled="isDisabled"
      :is-focused="isFocused"
      :name="`${manifest.name} component`"
      active-icon="mdi-arrow-up"
      active-placeholder="Use toolbar to upload the video"
    />
    <template v-else>
      <PreviewOverlay :show="!isDisabled && !isFocused" />
      <video :src="element.data.url" class="d-block w-100" controls>
        <track kind="captions" />
      </video>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import {
  ElementPlaceholder,
  PreviewOverlay,
} from '@tailor-cms/core-components-next';
import type { Element } from '@tailor-cms/ce-video-manifest';
import manifest from '@tailor-cms/ce-video-manifest';

defineProps<{ element: Element; isFocused: boolean; isDisabled: boolean }>();
defineEmits(['save']);
</script>

<style lang="scss" scoped>
.tce-video {
  text-align: left;
  position: relative;
}
</style>
