<template>
  <div class="align-center justify-center">
    <AssetInput
      :extensions="['.mp4']"
      :public-url="element.data.url"
      :url="element.data.assets.url"
      class="mx-auto"
      upload-label="Upload mp4"
      @input="save"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { AssetInput } from '@tailor-cms/core-components';
import cloneDeep from 'lodash/cloneDeep';
import type { Element } from '@tailor-cms/ce-video-manifest';

const props = defineProps<{ element: Element }>();
const emit = defineEmits(['save']);

const save = ({ url, publicUrl }: { url: string; publicUrl: string }) => {
  const assets = { url };
  const elementData = Object.assign(cloneDeep(props.element.data), {
    url: publicUrl,
    assets,
  });
  emit('save', elementData);
};
</script>

<style scoped></style>
