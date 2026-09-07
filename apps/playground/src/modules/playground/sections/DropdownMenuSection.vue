<script setup lang="ts">
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
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

const checked = ref(true);
const view = ref('list');
const disableNewFile = ref(false);

const code = computed(
  () => `<DropdownMenuRoot>
  <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem ${disableNewFile.value ? 'disabled' : ':disabled="false"'}>
      New file
    </DropdownMenuItem>
    <DropdownMenuItem>
      Duplicate
      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem v-model:checked="checked">
      Show hidden files
    </DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup v-model:value="view">
      <DropdownMenuRadioItem value="list">List view</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="grid">Grid view</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Archive</DropdownMenuItem>
        <DropdownMenuItem>Trash</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenuRoot>`,
);
</script>

<template>
  <CatalogSection
    description="Keyboard-first action menu with checked items, a radio group, and a submenu."
    eyebrow="Extension · Actions"
    id="dropdown-menu"
    title="Dropdown Menu"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <div class="flex flex-wrap items-center gap-3">
          <DropdownMenuRoot>
            <DropdownMenuTrigger
              class="rounded-cladd-xs bg-cladd-surface-highlight px-3 py-1.5 text-cladd-xs"
              :disabled="!interactionsEnabled"
            >
              Actions
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem :disabled="disableNewFile"
                >New file</DropdownMenuItem
              >
              <DropdownMenuItem>
                Duplicate
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem v-model:checked="checked">
                Show hidden files
              </DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup v-model:value="view">
                <DropdownMenuRadioItem value="list"
                  >List view</DropdownMenuRadioItem
                >
                <DropdownMenuRadioItem value="grid"
                  >Grid view</DropdownMenuRadioItem
                >
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenuRoot>

          <span class="text-cladd-2xs text-cladd-fg-softer">
            {{ checked ? 'Hidden files visible' : 'Hidden files hidden' }} ·
            {{ view }} view
          </span>
        </div>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="disableNewFile"
            label="disable 'New file'"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
