<script setup lang="ts">
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandShortcut,
  CommandList,
  DialogRoot,
  DialogTrigger,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{ accent: Color; interactionsEnabled: boolean }>();

const disableCreateTask = ref(false);
const code = computed(
  () => `<CommandDialog title="Commands">
  <CommandInput />
  <CommandList>
    <CommandGroup heading="Workspace">
      <CommandItem value="Open project">
        Open project
        <template #shortcut><CommandShortcut>⌘O</CommandShortcut></template>
      </CommandItem>
      <CommandItem value="Create task" ${disableCreateTask.value ? 'disabled' : ':disabled="false"'}>
        Create task
        <template #shortcut><CommandShortcut>⌘N</CommandShortcut></template>
      </CommandItem>
    </CommandGroup>
  </CommandList>
  <CommandEmpty>No matching commands.</CommandEmpty>
</CommandDialog>`,
);
</script>

<template>
  <CatalogSection
    description="Keyboard-first action discovery for consumer-owned command lists."
    eyebrow="Extension · Discovery"
    id="command"
    title="Command"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <DialogRoot>
          <DialogTrigger
            ><button
              class="rounded-cladd-xs bg-cladd-surface-highlight px-3 py-1.5 text-cladd-xs"
              :disabled="!props.interactionsEnabled"
            >
              Open command menu
            </button></DialogTrigger
          >
          <CommandDialog title="Commands">
            <CommandInput />
            <CommandList>
              <CommandGroup heading="Workspace">
                <CommandItem value="Open project"
                  >Open project<template #shortcut
                    ><CommandShortcut>⌘O</CommandShortcut></template
                  ></CommandItem
                >
                <CommandItem :disabled="disableCreateTask" value="Create task"
                  >Create task<template #shortcut
                    ><CommandShortcut>⌘N</CommandShortcut></template
                  ></CommandItem
                >
              </CommandGroup>
            </CommandList>
            <CommandEmpty>No matching commands.</CommandEmpty>
          </CommandDialog>
        </DialogRoot>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="disableCreateTask"
            label="disable 'Create task'"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
