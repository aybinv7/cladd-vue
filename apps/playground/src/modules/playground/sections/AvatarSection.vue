<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Chip,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const showImage = ref(true);

const avatarCode = computed(
  () => `<Avatar>
  ${showImage.value ? `<AvatarImage alt="Ada" src="/ada.jpg" />\n  ` : ''}<AvatarFallback>AL</AvatarFallback>
</Avatar>`,
);

const groupCode = `<AvatarGroup>
  <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>BK</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
  <Chip size="xs">+2</Chip>
</AvatarGroup>`;
</script>

<template>
  <CatalogSection
    description="A fixed-size identity marker with zero-layout-shift fallback switching; group overflow is composed with Chip, not automatic."
    eyebrow="Extension · Data display"
    id="avatar"
    title="Avatar"
  >
    <ComponentPlayground :code="avatarCode" preview-surface>
      <template #preview>
        <Avatar>
          <AvatarImage v-if="showImage" alt="Ada" src="data:," />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="showImage"
            label="simulateBrokenImage"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <ComponentPlayground :code="groupCode" preview-surface>
      <template #preview>
        <AvatarGroup>
          <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>BK</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
          <Chip size="xs">+2</Chip>
        </AvatarGroup>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
