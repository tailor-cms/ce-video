<template>
  <div v-if="data.url" class="tce-root">
    <iframe
      v-if="sharedUrl"
      :src="sharedUrl"
      class="d-block w-100"
      frameborder="0"
      title="Video Preview"
    ></iframe>
    <video v-else :src="data.url" class="d-block w-100" controls @play="submit">
      <track kind="captions" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ElementData } from '@tailor-cms/ce-video-manifest';

import { parseUrl } from './utils';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const sharedUrl = computed(() => props.data.url && parseUrl(props.data.url));

const submit = () => emit('interaction', { id: props.id });
</script>

<style scoped>
.tce-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;

  iframe {
    aspect-ratio: 16/9;
  }
}
</style>
