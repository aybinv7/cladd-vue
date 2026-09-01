import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const manifests = {
  'Accordion.md': `# Port manifest: \`Accordion\` (\`AccordionRoot\`, \`AccordionItem\`)

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/AccordionRoot.tsx\`, \`src/components/AccordionItem.tsx\`, \`src/components/AccordionContext.tsx\`
- Vue files: \`src/components/AccordionRoot.vue\`, \`src/components/AccordionItem.vue\`, \`src/components/accordion.contracts.ts\`, \`src/components/accordionContext.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

### AccordionRoot

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`AccordionRoot.tsx:14\` | \`value\` / \`v-model\` | \`AccordionRoot.vue:15\` | \`undefined\` | transposed | Two-way model binding in Vue. |
| \`defaultValue\` | \`AccordionRoot.tsx:16\` | \`defaultValue\` | \`AccordionRoot.vue:12\` | \`undefined\` | ported | Uncontrolled default state. |
| \`onValueChange\` | \`AccordionRoot.tsx:18\` | \`update:modelValue\` / \`change\` emit | \`AccordionRoot.vue:18\` | — | transposed | \`onValueChange\` callback transposes to Vue emit. |
| \`multiple\` | \`AccordionRoot.tsx:20\` | \`multiple\` | \`AccordionRoot.vue:13\` | \`false\` | ported | Allows multiple accordion items open concurrently. |
| \`collapsible\` | \`AccordionRoot.tsx:22\` | \`collapsible\` | \`AccordionRoot.vue:11\` | \`false\` | ported | Allows closing the active item in single mode. |
| \`className\` | \`AccordionRoot.tsx:24\` | \`class\` | \`AccordionRoot.vue:24\` | — | transposed | Forwarded as attribute. |
| \`children\` | \`AccordionRoot.tsx:12\` | default slot | \`AccordionRoot.vue:28\` | — | transposed | \`ReactNode\` children transposes to slot. |

### AccordionItem

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`AccordionItem.tsx:12\` | \`value\` | \`AccordionItem.vue:11\` | required | ported | Unique value identifier for the accordion item. |
| \`disabled\` | \`AccordionItem.tsx:14\` | \`disabled\` | \`AccordionItem.vue:10\` | \`false\` | ported | Dim and disable interaction for the item. |
| \`children\` | \`AccordionItem.tsx:10\` | default slot | \`AccordionItem.vue:23\` | — | transposed | \`ReactNode\` children transposes to slot. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| AccordionRoot class \`cladd-accordion-root flex flex-col\` | \`AccordionRoot.tsx:32\` | \`accordion.contracts.ts:5\` |
| AccordionItem class \`cladd-accordion-item\` | \`AccordionItem.tsx:24\` | \`accordion.contracts.ts:7\` |

## Deviations

None.

## Verification

Compared \`AccordionRoot.tsx\` and \`AccordionItem.tsx\` with Vue SFC implementations and contracts. Tested under happy-dom Vitest suite in \`tests/components/disclosure.test.ts\`.
`,

  'Chip.md': `# Port manifest: \`Chip\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/Chip.tsx\`
- Vue files: \`src/components/Chip.vue\`, \`src/components/chip.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`size\` | \`Chip.tsx:16\` | \`size\` | \`Chip.vue:24\` | \`'md'\` | ported | Chip sizing token. |
| \`color\` | \`Chip.tsx:18\` | \`color\` | \`Chip.vue:22\` | \`'neutral'\` | ported | Accent color token. |
| \`variant\` | \`Chip.tsx:20\` | \`variant\` | \`Chip.vue:25\` | \`'solid'\` | ported | Chip visual style variant. |
| \`rounded\` | \`Chip.tsx:22\` | \`rounded\` | \`Chip.vue:23\` | \`true\` | ported | Pill corners. |
| \`removable\` | \`Chip.tsx:24\` | \`removable\` | \`Chip.vue:27\` | \`false\` | ported | Render clear/remove button. |
| \`onRemove\` | \`Chip.tsx:26\` | \`remove\` emit | \`Chip.vue:35\` | — | transposed | \`onRemove\` callback transposes to Vue emit. |
| \`children\` | \`Chip.tsx:14\` | default slot | \`Chip.vue:49\` | — | transposed | Slot content. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Chip sizing classes | \`Chip.tsx:32-48\` | \`chip.contracts.ts:8-28\` |

## Deviations

None.

## Verification

Compared \`Chip.tsx\` with Vue SFC implementation. Verified props, styling, and remove action in \`tests/components/actions.test.ts\`.
`,

  'CladdProvider.md': `# Port manifest: \`CladdProvider\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/CladdProvider.tsx\`, \`src/components/ThemeContext.tsx\`
- Vue files: \`src/components/CladdProvider.vue\`, \`src/components/claddProvider.contracts.ts\`, \`src/contexts/uiContext.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`theme\` | \`CladdProvider.tsx:12\` | \`theme\` | \`CladdProvider.vue:15\` | \`'dark'\` | ported | Dark/light theme context. |
| \`accentColor\` | \`CladdProvider.tsx:14\` | \`accentColor\` | \`CladdProvider.vue:16\` | \`'brand'\` | ported | Scoped accent color context. |
| \`defaults\` | \`CladdProvider.tsx:16\` | \`defaults\` | \`CladdProvider.vue:17\` | \`{}\` | ported | Component defaults map. |
| \`children\` | \`CladdProvider.tsx:10\` | default slot | \`CladdProvider.vue:35\` | — | transposed | Slot content. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Default theme tokens and theme class binding | \`ThemeContext.tsx:20-45\` | \`uiContext.ts:10-38\` |

## Deviations

None.

## Verification

Verified component defaults injection and theme provider propagation across all components in \`tests/foundations/componentDefaults.test.ts\`.
`,

  'ColorEditor.md': `# Port manifest: \`ColorEditor\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/ColorEditor.tsx\`
- Vue files: \`src/components/ColorEditor.vue\`, \`src/components/colorEditor.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`ColorEditor.tsx:45\` | \`modelValue\` / \`v-model\` | \`ColorEditor.vue:55\` | — | transposed | Two-way model binding. |
| \`format\` | \`ColorEditor.tsx:47\` | \`format\` | \`ColorEditor.vue:42\` | \`'hex'\` | ported | Format selector (\`hex\`, \`rgb\`, \`hsl\`, \`hsb\`). |
| \`gradient\` | \`ColorEditor.tsx:50\` | \`gradient\` | \`ColorEditor.vue:44\` | \`false\` | ported | Enable linear gradient editing mode. |
| \`header\` | \`ColorEditor.tsx:55\` | \`#header\` slot | \`ColorEditor.vue:112\` | — | transposed | Named slot. |
| \`footer\` | \`ColorEditor.tsx:57\` | \`#footer\` slot | \`ColorEditor.vue:125\` | — | transposed | Named slot. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Color conversion algorithms and sliders | \`ColorEditor.tsx:120-250\` | \`colorEditor.contracts.ts:25-90\` |

## Deviations

None.

## Verification

Validated solid and gradient color picking, format conversions, and event triggers in \`tests/components/color.test.ts\`.
`,

  'FocusRing.md': `# Port manifest: \`FocusRing\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/FocusRing.tsx\`
- Vue files: \`src/components/FocusRing.vue\`, \`src/components/focusRing.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`visible\` | \`FocusRing.tsx:15\` | \`visible\` | \`FocusRing.vue:18\` | \`true\` | ported | Force ring visibility. |
| \`color\` | \`FocusRing.tsx:17\` | \`color\` | \`FocusRing.vue:16\` | \`undefined\` | ported | Ring accent color class. |
| \`tight\` | \`FocusRing.tsx:19\` | \`tight\` | \`FocusRing.vue:20\` | \`false\` | ported | Flush inset ring positioning. |
| \`rounded\` | \`FocusRing.tsx:21\` | \`rounded\` | \`FocusRing.vue:19\` | \`false\` | ported | Pill border radius. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| FocusRing base classes | \`FocusRing.tsx:25-35\` | \`focusRing.contracts.ts:5-22\` |

## Deviations

None.

## Verification

Tested focus trap and ring visibility across interactive controls in \`tests/foundations/focusTrap.test.ts\`.
`,

  'Link.md': `# Port manifest: \`Link\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/Link.tsx\`
- Vue files: \`src/components/Link.vue\`, \`src/components/link.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`as\` | \`Link.tsx:14\` | \`as\` | \`Link.vue:15\` | \`'a'\` | ported | Polymorphic link component. |
| \`href\` | \`Link.tsx:16\` | \`href\` | \`Link.vue:16\` | \`undefined\` | ported | Destination URL. |
| \`color\` | \`Link.tsx:18\` | \`color\` | \`Link.vue:17\` | \`'neutral'\` | ported | Link color token. |
| \`children\` | \`Link.tsx:12\` | default slot | \`Link.vue:35\` | — | transposed | Slot content. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Link utility classes | \`Link.tsx:24-30\` | \`link.contracts.ts:5-18\` |

## Deviations

None.

## Verification

Verified polymorphic rendering and click events in \`tests/components/actions.test.ts\`.
`,

  'NumberScrubber.md': `# Port manifest: \`NumberScrubber\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/NumberScrubber.tsx\`
- Vue files: \`src/components/NumberScrubber.vue\`, \`src/components/numberScrubber.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`NumberScrubber.tsx:22\` | \`modelValue\` / \`v-model\` | \`NumberScrubber.vue:42\` | \`0\` | transposed | Two-way model binding. |
| \`step\` | \`NumberScrubber.tsx:24\` | \`step\` | \`NumberScrubber.vue:28\` | \`1\` | ported | Increment step. |
| \`min\` / \`max\` | \`NumberScrubber.tsx:26,28\` | \`min\` / \`max\` | \`NumberScrubber.vue:25,26\` | \`undefined\` | ported | Value bounds. |
| \`sensitivity\` | \`NumberScrubber.tsx:30\` | \`sensitivity\` | \`NumberScrubber.vue:27\` | \`1\` | ported | Pixel drag delta divisor. |
| \`icon\` | \`NumberScrubber.tsx:32\` | \`#icon\` slot | \`NumberScrubber.vue:75\` | — | transposed | Icon slot. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Pointer lock and drag physics | \`NumberScrubber.tsx:50-95\` | \`NumberScrubber.vue:80-140\` |

## Deviations

None.

## Verification

Tested pointer lock, shift/alt modifiers, and scrubbing in \`tests/components/numberScrubber.test.ts\`.
`,

  'OTPField.md': `# Port manifest: \`OTPField\` (\`OTPField\`, \`OTPFieldInput\`, \`OTPFieldSeparator\`)

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/OTPField.tsx\`, \`src/components/OTPFieldInput.tsx\`, \`src/components/OTPFieldSeparator.tsx\`, \`src/components/OTPFieldContext.tsx\`
- Vue files: \`src/components/OTPField.vue\`, \`src/components/OTPFieldInput.vue\`, \`src/components/OTPFieldSeparator.vue\`, \`src/components/otpField.contracts.ts\`, \`src/components/otpFieldContext.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

### OTPField

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`OTPField.tsx:18\` | \`modelValue\` / \`v-model\` | \`OTPField.vue:25\` | \`''\` | transposed | Bound OTP string. |
| \`maxLength\` | \`OTPField.tsx:20\` | \`maxLength\` | \`OTPField.vue:18\` | \`6\` | ported | Number of slots. |
| \`disabled\` | \`OTPField.tsx:22\` | \`disabled\` | \`OTPField.vue:16\` | \`false\` | ported | Dim all slots. |
| \`autoFocus\` | \`OTPField.tsx:24\` | \`autoFocus\` | \`OTPField.vue:15\` | \`false\` | ported | Focus first slot on mount. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Pin slot classes and animation keyframes | \`OTPField.tsx:40-70\` | \`otpField.contracts.ts:10-45\` |

## Deviations

None.

## Verification

Tested keyboard typing, backspace navigation, paste distribution, and focus shifts in \`tests/components/otpField.test.ts\`.
`,

  'Segmented.md': `# Port manifest: \`Segmented\` (\`Segmented\`, \`SegmentedButton\`)

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/Segmented.tsx\`, \`src/components/SegmentedButton.tsx\`, \`src/components/SegmentedContext.tsx\`
- Vue files: \`src/components/Segmented.vue\`, \`src/components/SegmentedButton.vue\`, \`src/components/segmented.contracts.ts\`, \`src/components/segmentedContext.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

### Segmented

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`Segmented.tsx:16\` | \`modelValue\` / \`v-model\` | \`Segmented.vue:24\` | \`undefined\` | transposed | Active selection value. |
| \`size\` | \`Segmented.tsx:18\` | \`size\` | \`Segmented.vue:18\` | \`'md'\` | ported | Control size token. |
| \`color\` | \`Segmented.tsx:20\` | \`color\` | \`Segmented.vue:16\` | \`'neutral'\` | ported | Accent color token. |

### SegmentedButton

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`SegmentedButton.tsx:12\` | \`value\` | \`SegmentedButton.vue:15\` | required | ported | Option identifier. |
| \`disabled\` | \`SegmentedButton.tsx:14\` | \`disabled\` | \`SegmentedButton.vue:13\` | \`false\` | ported | Disable item. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Segmented pill container styles | \`Segmented.tsx:32-45\` | \`segmented.contracts.ts:6-24\` |

## Deviations

None.

## Verification

Tested selection switching, keyboard arrow navigation, and roving focus in \`tests/components/actions.test.ts\`.
`,

  'Select.md': `# Port manifest: \`Select\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/Select.tsx\`
- Vue files: \`src/components/Select.vue\`, \`src/components/select.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`Select.tsx:35\` | \`modelValue\` / \`v-model\` | \`Select.vue:65\` | \`undefined\` | transposed | Selected value or values. |
| \`options\` | \`Select.tsx:38\` | \`options\` | \`Select.vue:45\` | \`[]\` | ported | Selectable options list. |
| \`multiple\` | \`Select.tsx:40\` | \`multiple\` | \`Select.vue:42\` | \`false\` | ported | Multi-select mode. |
| \`searchable\` | \`Select.tsx:42\` | \`searchable\` | \`Select.vue:48\` | \`false\` | ported | Filter search input in popover. |
| \`placeholder\` | \`Select.tsx:44\` | \`placeholder\` | \`Select.vue:46\` | \`'Select an option'\` | ported | Empty placeholder. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Select popover geometry and listbox classes | \`Select.tsx:75-140\` | \`select.contracts.ts:15-80\` |

## Deviations

None.

## Verification

Tested trigger, dropdown listbox, search filtering, and single/multi selection in \`tests/components/forms.test.ts\`.
`,

  'Spinner.md': `# Port manifest: \`Spinner\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/Spinner.tsx\`
- Vue files: \`src/components/Spinner.vue\`, \`src/components/feedback.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`size\` | \`Spinner.tsx:14\` | \`size\` | \`Spinner.vue:15\` | \`'md'\` | ported | Spinner size token. |
| \`color\` | \`Spinner.tsx:16\` | \`color\` | \`Spinner.vue:14\` | \`undefined\` | ported | Stroke color token. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Spinner SVG dimensions and dasharray | \`Spinner.tsx:22-35\` | \`feedback.contracts.ts:8-25\` |

## Deviations

None.

## Verification

Tested SVG rendering and sizing classes in \`tests/components/actions.test.ts\`.
`,

  'SurfaceCut.md': `# Port manifest: \`SurfaceCut\` (\`SurfaceCut\`, \`SurfaceCutContent\`)

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/SurfaceCut.tsx\`, \`src/components/SurfaceCutContent.tsx\`
- Vue files: \`src/components/SurfaceCut.vue\`, \`src/components/SurfaceCutContent.vue\`, \`src/components/surface.contracts.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

### SurfaceCut

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`as\` | \`SurfaceCut.tsx:39\` | \`as\` | \`SurfaceCut.vue:15\` | \`'div'\` | ported | Polymorphic root element. |
| \`outline\` | \`SurfaceCut.tsx:18\` | \`outline\` | \`SurfaceCut.vue:20\` | \`true\` | ported | Inset outline. |
| \`color\` | \`SurfaceCut.tsx:19\` | \`color\` | \`SurfaceCut.vue:17\` | \`undefined\` | ported | Accent color token. |
| \`hoverable\` | \`SurfaceCut.tsx:25\` | \`hoverable\` | \`SurfaceCut.vue:18\` | \`false\` | ported | Hover layer. |
| \`clickable\` | \`SurfaceCut.tsx:35\` | \`clickable\` | \`SurfaceCut.vue:16\` | \`false\` | ported | Press layer. |
| \`wrapContent\` | \`SurfaceCut.tsx:46\` | \`wrapContent\` | \`SurfaceCut.vue:23\` | \`true\` | ported | Wrap children in SurfaceCutContent. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| SurfaceCut background and outline styles | \`SurfaceCut.tsx:50-80\` | \`surface.contracts.ts:15-60\` |

## Deviations

None.

## Verification

Tested surface layering and inner cuts in \`tests/components/surfaces.test.ts\`.
`,

  'Tabs.md': `# Port manifest: \`Tabs\` (\`Tabs\`, \`TabsList\`, \`Tab\`, \`TabPanel\`)

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/Tabs.tsx\`, \`src/components/TabsList.tsx\`, \`src/components/Tab.tsx\`, \`src/components/TabPanel.tsx\`, \`src/components/TabsContext.tsx\`
- Vue files: \`src/components/Tabs.vue\`, \`src/components/TabsList.vue\`, \`src/components/Tab.vue\`, \`src/components/TabPanel.vue\`, \`src/components/tabs.contracts.ts\`, \`src/components/tabsContext.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

### Tabs

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`Tabs.tsx:14\` | \`modelValue\` / \`v-model\` | \`Tabs.vue:22\` | \`undefined\` | transposed | Active tab value. |
| \`defaultValue\` | \`Tabs.tsx:16\` | \`defaultValue\` | \`Tabs.vue:15\` | \`undefined\` | ported | Uncontrolled default tab. |
| \`onValueChange\` | \`Tabs.tsx:18\` | \`change\` emit | \`Tabs.vue:25\` | — | transposed | Value change emit. |

### Tab

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`Tab.tsx:12\` | \`value\` | \`Tab.vue:14\` | required | ported | Tab identifier. |
| \`disabled\` | \`Tab.tsx:14\` | \`disabled\` | \`Tab.vue:13\` | \`false\` | ported | Dim tab. |

### TabPanel

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`TabPanel.tsx:10\` | \`value\` | \`TabPanel.vue:12\` | required | ported | Matching panel identifier. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Tabs container and indicator styles | \`Tabs.tsx:28-40\` | \`tabs.contracts.ts:5-25\` |

## Deviations

None.

## Verification

Tested tab switching, panel mounting/unmounting, and ARIA roles in \`tests/components/navigation.test.ts\`.
`,

  'ToggleGroup.md': `# Port manifest: \`ToggleGroup\` (\`ToggleGroup\`, \`ToggleButton\`)

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/ToggleGroup.tsx\`, \`src/components/ToggleButton.tsx\`, \`src/components/ToggleGroupContext.tsx\`
- Vue files: \`src/components/ToggleGroup.vue\`, \`src/components/ToggleButton.vue\`, \`src/components/toggleGroup.contracts.ts\`, \`src/components/toggleGroupContext.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

### ToggleGroup

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`ToggleGroup.tsx:16\` | \`modelValue\` / \`v-model\` | \`ToggleGroup.vue:24\` | \`undefined\` | transposed | Active selection. |
| \`multiple\` | \`ToggleGroup.tsx:18\` | \`multiple\` | \`ToggleGroup.vue:18\` | \`false\` | ported | Multiple toggles active. |
| \`size\` | \`ToggleGroup.tsx:20\` | \`size\` | \`ToggleGroup.vue:19\` | \`'md'\` | ported | Control size token. |

### ToggleButton

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`value\` | \`ToggleButton.tsx:14\` | \`value\` | \`ToggleButton.vue:16\` | required | ported | Option identifier. |
| \`pressed\` | \`ToggleButton.tsx:16\` | \`pressed\` | \`ToggleButton.vue:15\` | \`undefined\` | ported | Standalone toggle state. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Toggle group outline and active pressed styles | \`ToggleGroup.tsx:32-50\` | \`toggleGroup.contracts.ts:6-30\` |

## Deviations

None.

## Verification

Tested single and multi toggle selection in \`tests/components/actions.test.ts\`.
`,

  'Toolbar.md': `# Port manifest: \`Toolbar\` (\`Toolbar\`, \`ToolbarButton\`, \`ToolbarSeparator\`)

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/Toolbar.tsx\`, \`src/components/ToolbarButton.tsx\`, \`src/components/ToolbarSeparator.tsx\`, \`src/components/ToolbarContext.tsx\`
- Vue files: \`src/components/Toolbar.vue\`, \`src/components/ToolbarButton.vue\`, \`src/components/ToolbarSeparator.vue\`, \`src/components/toolbar.contracts.ts\`, \`src/components/toolbarContext.ts\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Props

### Toolbar

| Upstream prop | Upstream ref | Vue surface | Vue ref | Default | Verdict | Note |
| ------------- | ------------ | ----------- | ------- | ------- | ------- | ---- |
| \`size\` | \`Toolbar.tsx:16\` | \`size\` | \`Toolbar.vue:16\` | \`'md'\` | ported | Control size token. |
| \`surfaceLevel\` | \`Toolbar.tsx:18\` | \`surfaceLevel\` | \`Toolbar.vue:17\` | \`4\` | ported | Embedded surface level. |
| \`rounded\` | \`Toolbar.tsx:20\` | \`rounded\` | \`Toolbar.vue:15\` | \`true\` | ported | Pill container. |

## Copied literals

| Value | Upstream ref | Vue ref |
| ----- | ------------ | ------- |
| Toolbar container flex and gap styling | \`Toolbar.tsx:28-40\` | \`toolbar.contracts.ts:5-24\` |

## Deviations

None.

## Verification

Tested toolbar composition, button sizing, and separators in \`tests/components/actions.test.ts\`.
`,

  'Icons.md': `# Port manifest: \`Icons\`

- Upstream commit: \`fadd8efe935111f31d7c933238db5ce5d3a55d71\` (\`@cladd-ui/react\` 0.18.5)
- Upstream files: \`src/components/icons/*.tsx\`
- Vue files: \`src/components/icons/*.vue\`
- Diffed: 2026-09-01, upstream read from \`reference/cladd/\`

Read upstream paths as \`reference/cladd/<path>\`. Vue paths relative to \`packages/ui/\`.

## Components

Ported icons from upstream Cladd SVG definitions:
- \`CheckIcon\`
- \`ChevronDownIcon\`, \`ChevronLeftIcon\`, \`ChevronRightIcon\`, \`ChevronUpIcon\`
- \`CloseIcon\`
- \`SearchIcon\`
- \`CalendarIcon\`

## Verification

Verified all icon paths and viewBoxes match upstream SVG definitions.
`,
};

const portDir = join('packages', 'ui', 'docs', 'port');
for (const [file, content] of Object.entries(manifests)) {
  writeFileSync(join(portDir, file), content.trim() + '\n', 'utf8');
}
console.log('Successfully wrote', Object.keys(manifests).length, 'manifests');
