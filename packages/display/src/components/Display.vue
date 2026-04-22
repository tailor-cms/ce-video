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
      v-else
      ref="video"
      :src="element.data.url"
      class="d-block w-100"
      controls
      @seeked="handleSeeked"
      @timeupdate="handleTimeUpdate"
    >
      <track kind="captions" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue';
import { debounce, throttle } from 'lodash-es';
import type { Element } from '@tailor-cms/ce-video-manifest';

import { parseUrl } from './utils';

const PROGRESS_UPDATE_INTERVAL = 5000;
const SEEK_DEBOUNCE_INTERVAL = 300;

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits<{ interaction: [data: any] }>();

const video = useTemplateRef<HTMLVideoElement>('video');

const sharedUrl = computed(
  () => props.element.data.url && parseUrl(props.element.data.url),
);

const interact = () => {
  const currentTime = video.value!.currentTime;
  const furthestTime = Math.max(
    props.userState?.furthestTime ?? 0,
    currentTime,
  );
  emit('interaction', { currentTime, furthestTime });
};
const handleTimeUpdate = throttle(interact, PROGRESS_UPDATE_INTERVAL);
const handleSeeked = debounce(interact, SEEK_DEBOUNCE_INTERVAL);

onMounted(() => {
  const currentTime = props.userState?.currentTime;
  if (!currentTime || !video.value) return;
  video.value.addEventListener(
    'loadedmetadata',
    () => (video.value!.currentTime = currentTime),
    { once: true },
  );
});
</script>

<style scoped>
.tce-video-root iframe {
  aspect-ratio: 16/9;
}
</style>
