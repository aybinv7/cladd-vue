import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/components/surfaces',
    },
    {
      path: '/components',
      component: () => import('./modules/playground/PlaygroundView.vue'),
      children: [
        {
          path: 'surfaces',
          component: () =>
            import('./modules/playground/sections/SurfacesSection.vue'),
        },
        {
          path: 'button',
          component: () =>
            import('./modules/playground/sections/ButtonSection.vue'),
        },
        {
          path: 'segmented',
          component: () =>
            import('./modules/playground/sections/SegmentedSection.vue'),
        },
        {
          path: 'toolbar',
          component: () =>
            import('./modules/playground/sections/ToolbarSection.vue'),
        },
        {
          path: 'toggle-group',
          component: () =>
            import('./modules/playground/sections/ToggleGroupSection.vue'),
        },
        {
          path: 'chip',
          component: () =>
            import('./modules/playground/sections/ChipSection.vue'),
        },
        {
          path: 'slider',
          component: () =>
            import('./modules/playground/sections/SliderSection.vue'),
        },
        {
          path: 'checkbox',
          component: () =>
            import('./modules/playground/sections/CheckboxSection.vue'),
        },
        {
          path: 'select',
          component: () =>
            import('./modules/playground/sections/SelectSection.vue'),
        },
        {
          path: 'dialog',
          component: () =>
            import('./modules/playground/sections/DialogSection.vue'),
        },
        {
          path: 'popover',
          component: () =>
            import('./modules/playground/sections/PopoverSection.vue'),
        },
        {
          path: 'tooltip',
          component: () =>
            import('./modules/playground/sections/TooltipSection.vue'),
        },
        {
          path: 'spinner',
          component: () =>
            import('./modules/playground/sections/SpinnerSection.vue'),
        },
        {
          path: 'tabs',
          component: () =>
            import('./modules/playground/sections/TabsSection.vue'),
        },
        {
          path: 'accordion',
          component: () =>
            import('./modules/playground/sections/AccordionSection.vue'),
        },
        {
          path: 'calendar',
          component: () =>
            import('./modules/playground/sections/CalendarSection.vue'),
        },
        {
          path: 'color',
          component: () =>
            import('./modules/playground/sections/ColorSection.vue'),
        },
        {
          path: 'link',
          component: () =>
            import('./modules/playground/sections/LinkSection.vue'),
        },
        {
          path: 'numbers',
          component: () =>
            import('./modules/playground/sections/NumbersSection.vue'),
        },
        {
          path: 'otp',
          component: () =>
            import('./modules/playground/sections/OtpSection.vue'),
        },
        {
          path: 'backdrop',
          component: () =>
            import('./modules/playground/sections/BackdropSection.vue'),
        },
        {
          path: 'collapsible',
          component: () =>
            import('./modules/playground/sections/CollapsibleSection.vue'),
        },
        {
          path: 'input',
          component: () =>
            import('./modules/playground/sections/InputSection.vue'),
        },
        {
          path: 'list',
          component: () =>
            import('./modules/playground/sections/ListSection.vue'),
        },
        {
          path: 'popup',
          component: () =>
            import('./modules/playground/sections/PopupSection.vue'),
        },
        {
          path: 'radio',
          component: () =>
            import('./modules/playground/sections/RadioSection.vue'),
        },
        {
          path: 'search-field',
          component: () =>
            import('./modules/playground/sections/SearchFieldSection.vue'),
        },
        {
          path: 'section-title',
          component: () =>
            import('./modules/playground/sections/SectionTitleSection.vue'),
        },
        {
          path: 'shortcut',
          component: () =>
            import('./modules/playground/sections/ShortcutSection.vue'),
        },
        {
          path: 'switch',
          component: () =>
            import('./modules/playground/sections/SwitchSection.vue'),
        },
        {
          path: 'textarea',
          component: () =>
            import('./modules/playground/sections/TextareaSection.vue'),
        },
        {
          path: 'toast',
          component: () =>
            import('./modules/playground/sections/ToastSection.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/components/surfaces',
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
