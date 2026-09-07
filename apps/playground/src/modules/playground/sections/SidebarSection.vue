<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  type SidebarSide,
  type SidebarVariant,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{ accent: Color; interactionsEnabled: boolean }>();

const activePage = ref('reports-quarterly');
const simulateMobile = ref(false);
const desktopOpen = ref(true);
const side = ref<SidebarSide>('inline-start');
const variant = ref<SidebarVariant>('sidebar');
const sides = ['inline-start', 'inline-end'] as const;
const variants = ['sidebar', 'floating', 'inset'] as const;
const collapsed = computed(() => !simulateMobile.value && !desktopOpen.value);

function select(page: string): void {
  if (!props.interactionsEnabled) return;
  activePage.value = page;
}

const code = computed(
  () => `<SidebarProvider :collapsible="true" :keyboard-shortcut="true" side="${side.value}">
  <Sidebar collapsible variant="${variant.value}">
    <SidebarHeader>...</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Overview">
              <template #icon><HomeIcon /></template>
              Overview
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
  <!-- Collapsed to the icon rail: the label becomes sr-only, the group
       label/item action/nested sub-menu disappear, the button turns square. -->
    </SidebarContent>
  </Sidebar>
  <SidebarInset><SidebarTrigger /></SidebarInset>
</SidebarProvider>`,
);
</script>

<template>
  <CatalogSection
    description="Responsive application shell with nested navigation, item action menus, and an icon-collapsed desktop rail."
    eyebrow="Extension · Application shell"
    id="sidebar"
    title="Sidebar"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <div class="flex w-full flex-col gap-3">
          <label class="flex items-center gap-2 text-cladd-xs">
            <input
              v-model="simulateMobile"
              :disabled="!interactionsEnabled"
              type="checkbox"
            />
            Simulate mobile presentation
          </label>

          <div
            class="h-96 w-full overflow-hidden rounded-cladd-dialog border border-cladd-outline"
          >
            <SidebarProvider
              v-model:open="desktopOpen"
              :collapsible="true"
              :keyboard-shortcut="true"
              :mobile="simulateMobile"
              :side="side"
              :variant="variant"
            >
              <Sidebar collapsible>
                <SidebarHeader>
                  <span class="text-cladd-xs font-semibold">Astrolabe</span>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                    <SidebarGroupAction
                      :disabled="!interactionsEnabled"
                      aria-label="Add workspace item"
                      >+</SidebarGroupAction
                    >
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            :active="activePage === 'overview'"
                            tooltip="Overview"
                            @click="select('overview')"
                          >
                            <template #icon>
                              <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </template>
                            Overview
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            :active="activePage.startsWith('reports')"
                            tooltip="Reports"
                            @click="select('reports-quarterly')"
                          >
                            <template #icon>
                              <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M4 19V5a1 1 0 0 1 1-1h9l6 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M8 13h8M8 17h5"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </template>
                            Reports
                          </SidebarMenuButton>
                          <DropdownMenuRoot v-if="!collapsed">
                            <DropdownMenuTrigger
                              :disabled="!interactionsEnabled"
                              aria-label="Reports actions"
                              class="absolute end-1 top-1 flex size-6 items-center justify-center rounded-cladd-2xs text-cladd-xs"
                              >⋯</DropdownMenuTrigger
                            >
                            <DropdownMenuContent>
                              <DropdownMenuItem>Export</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenuRoot>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                :aria-current="
                                  activePage === 'reports-quarterly'
                                    ? 'page'
                                    : undefined
                                "
                                @click="select('reports-quarterly')"
                                >Quarterly</SidebarMenuSubButton
                              >
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                :aria-current="
                                  activePage === 'reports-annual'
                                    ? 'page'
                                    : undefined
                                "
                                @click="select('reports-annual')"
                                >Annual</SidebarMenuSubButton
                              >
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarSeparator />
                  <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            :active="activePage === 'billing'"
                            tooltip="Billing"
                            @click="select('billing')"
                          >
                            <template #icon>
                              <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  height="14"
                                  rx="2"
                                  width="18"
                                  x="3"
                                  y="5"
                                />
                                <path d="M3 10h18" />
                              </svg>
                            </template>
                            Billing
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  <span class="text-cladd-2xs text-cladd-fg-softer"
                    >Signed in as Ada</span
                  >
                </SidebarFooter>
                <SidebarRail />
              </Sidebar>
              <SidebarInset>
                <div
                  class="flex items-center gap-2 border-b border-cladd-outline p-3"
                >
                  <SidebarTrigger />
                  <Separator class="h-4" orientation="vertical" />
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <BreadcrumbPage class="text-cladd-xs capitalize">{{
                        activePage.replace('-', ' ')
                      }}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
                <div class="flex flex-col gap-3 p-4">
                  <Skeleton class="h-5 w-1/3" />
                  <Skeleton class="h-3 w-full" />
                  <Skeleton class="h-3 w-5/6" />
                  <Skeleton class="mt-2 h-24 w-full" />
                </div>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </div>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented v-model="side" :items="sides" label="Side" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="variant"
            :items="variants"
            label="Variant"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
