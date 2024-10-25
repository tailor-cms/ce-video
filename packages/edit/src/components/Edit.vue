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
      <iframe
        v-if="sharedUrl"
        :src="sharedUrl"
        class="d-block w-100"
        frameborder="0"
        title="Video Preview"
      ></iframe>
      <video v-else :src="element.data.url" class="d-block w-100" controls>
        <track kind="captions" />
      </video>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { Element } from '@tailor-cms/ce-video-manifest';
import { ElementPlaceholder } from '@tailor-cms/core-components';
import manifest from '@tailor-cms/ce-video-manifest';

import { parseUrl } from './utils';

const props = defineProps<{
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
}>();
defineEmits(['save']);

const sharedUrl = computed(
  () => props.element.data.url && parseUrl(props.element.data.url),
);
</script>

<style lang="scss" scoped>
.tce-video {
  text-align: left;
  position: relative;

  iframe {
    aspect-ratio: 16/9;
  }
}
</style>
