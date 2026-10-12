<template>
  <div class="tce-video text-left">
    <TailorElementPlaceholder
      v-if="!element.data.url && isReadonly"
      :icon="manifest.ui.icon"
      :name="`${manifest.name} component`"
      is-readonly
    />
    <TailorFileInput
      v-else
      :allowed-extensions="EXTENSIONS"
      :file-key="element.data.assets?.url || element.data.url"
      :public-url="element.data.url"
      :readonly="isReadonly"
      :show-actions="isFocused"
      mode="dropzone"
      allow-url-source
      @delete="onDelete"
      @input="save"
      @upload="save"
    >
      <iframe
        v-if="sharedUrl"
        :src="sharedUrl"
        class="d-block w-100"
        frameborder="0"
        title="Video Preview"
      ></iframe>
      <video
        v-else
        :src="element.data.url ?? ''"
        class="d-block w-100"
        controls
      >
        <track kind="captions" />
      </video>
    </TailorFileInput>
  </div>
</template>

<script lang="ts" setup>
import type { Element, ElementData } from '@tailor-cms/ce-video-manifest';
import { computed } from 'vue';
import manifest from '@tailor-cms/ce-video-manifest';

import { parseUrl } from './utils';

const EXTENSIONS = ['.mp4', '.webm', '.mov'];

const props = defineProps<{
  element: Element;
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();
const emit = defineEmits<{ save: [data: ElementData] }>();

const sharedUrl = computed(
  () => props.element.data.url && parseUrl(props.element.data.url),
);

const save = (payload: Record<string, any> | null) => {
  if (!payload) return;
  const { url, publicUrl } = payload;
  const assets = { url };
  emit('save', { ...props.element.data, url: publicUrl ?? url, assets });
};

const onDelete = () => {
  emit('save', { ...props.element.data, url: null, assets: {} });
};
</script>

<style lang="scss" scoped>
.tce-video iframe {
  aspect-ratio: 16/9;
}
</style>
