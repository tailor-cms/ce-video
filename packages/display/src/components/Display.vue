<template>
  <div v-if="element.data.url" class="tce-video-root">
    <iframe
      v-if="sharedUrl"
      :src="sharedUrl"
      class="d-block w-100"
      frameborder="0"
      title="Video Preview"
    ></iframe>
    <video
      v-else :src="element.data.url"
      class="d-block w-100"
      controls
      @play="submit"
    >
      <track kind="captions" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Element } from '@tailor-cms/ce-video-manifest';

import { parseUrl } from './utils';

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits(['interaction']);

const sharedUrl = computed(() =>
  props.element.data.url && parseUrl(props.element.data.url)
);

const submit = () => emit('interaction', { id: props.element.id });
</script>

<style scoped>
.tce-video-root iframe {
  aspect-ratio: 16/9;
}
</style>
