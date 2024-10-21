<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <div class="tce-video">
    <ElementPlaceholder
      v-if="!element.data.url"
      :icon="manifest.ui.icon"
      :name="manifest.name"
    />
    <video v-else :src="element.data.url" class="w-100" controls></video>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import type { Element } from '@tailor-cms/ce-video-manifest';
import manifest from '@tailor-cms/ce-video-manifest';

import ElementPlaceholder from './ElementPlaceholder.vue';

defineEmits(['save']);
defineProps<{ element: Element; isFocused: boolean; isDisabled: boolean }>();
</script>

<style lang="scss" scoped>
.tce-video {
  text-align: left;
}
</style>
