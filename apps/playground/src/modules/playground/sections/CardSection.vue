<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const showFooter = ref(true);

const code = computed(
  () => `<Card class="max-w-sm">
  <CardHeader>
    <CardTitle>Team members</CardTitle>
    <CardDescription>3 people have access</CardDescription>
    <template #action>
      <CardAction>
        <Button size="xs">Invite</Button>
      </CardAction>
    </template>
  </CardHeader>
  <CardContent>
    <AvatarGroup>
      <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>BK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
    </AvatarGroup>
  </CardContent>${
    showFooter.value
      ? `
  <Separator />
  <CardFooter>
    <button>View all members</button>
  </CardFooter>`
      : ''
  }
</Card>`,
);
</script>

<template>
  <CatalogSection
    description="Card composes Surface and adds semantic structure — a plain flex header with a named #action slot, not a separate visual-token system."
    eyebrow="Extension · Data display"
    id="card"
    title="Card"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <Card class="max-w-sm">
          <CardHeader>
            <CardTitle>Team members</CardTitle>
            <CardDescription>3 people have access</CardDescription>
            <template #action>
              <CardAction>
                <button
                  class="rounded-cladd-xs bg-cladd-surface-highlight px-2 py-1 text-cladd-2xs"
                  :disabled="!props.interactionsEnabled"
                >
                  Invite
                </button>
              </CardAction>
            </template>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2">
              <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>BK</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
            </div>
          </CardContent>
          <template v-if="showFooter">
            <Separator />
            <CardFooter>
              <button
                class="text-cladd-xs text-cladd-fg-soft"
                :disabled="!props.interactionsEnabled"
              >
                View all members
              </button>
            </CardFooter>
          </template>
        </Card>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="showFooter" label="footer" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
