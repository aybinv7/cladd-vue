<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuTrigger,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const code = `<ContextMenuRoot>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Rename</ContextMenuItem>
    <ContextMenuItem>Copy path</ContextMenuItem>
  </ContextMenuContent>
</ContextMenuRoot>`;
</script>

<template>
  <CatalogSection
    description="Pointer-anchored context actions opened by right-click, Shift+F10, or the Context Menu key."
    eyebrow="Extension · Actions"
    id="context-menu"
    title="Context Menu"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <ContextMenuRoot>
          <ContextMenuTrigger
            class="rounded-cladd-xs border border-cladd-outline px-3 py-1.5 text-cladd-xs"
            :disabled="!interactionsEnabled"
          >
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Copy path</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenuRoot>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
