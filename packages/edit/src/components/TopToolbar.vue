<template>
  <div class="align-center justify-center">
    <UploadBtn
      :label="!element.data.url ? 'Upload mp4' : 'Replace mp4'"
      extensions=".mp4"
      @upload="upload"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { Element } from '@tailor-cms/ce-video-manifest';

import UploadBtn from './UploadBtn.vue';

const props = defineProps<{ element: Element }>();
const emit = defineEmits(['save']);

const upload = ({ url }: { key: string; url: string }) => {
  const assets = { url };
  emit('save', { ...props.element.data, assets });
};
</script>

<style scoped></style>
