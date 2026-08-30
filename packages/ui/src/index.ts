export { type Color } from './types.ts';

export {
  overlayPhases,
  surfaceLevels,
  surfaceVariants,
  uiSizes,
  uiThemes,
} from './foundations/contracts.ts';

export type {
  OverlayPhase,
  SurfaceLevel,
  SurfaceLevelInput,
  SurfaceVariant,
  UiSize,
  UiTheme,
} from './foundations/contracts.ts';

export {
  clampSurfaceLevel,
  resolveSurfaceLevel,
} from './foundations/surfaceLevel.ts';
export { useSurface } from './contexts/surfaceContext.ts';
export { useAccentColor, useTheme } from './contexts/uiContext.ts';
export { useComponentDefaults } from './composables/useComponentDefaults.ts';
export { useDevice } from './composables/useDevice.ts';
export type { DeviceInfo } from './composables/useDevice.ts';
export { useDialog } from './composables/useDialog.ts';
export type {
  DialogApi,
  UseDialogAlertOptions,
  UseDialogConfirmOptions,
  UseDialogOptions,
} from './composables/useDialog.ts';
export { useToast } from './composables/useToast.ts';
export type { UseToastOptions } from './composables/useToast.ts';
export { default as Toast } from './components/Toast.vue';
export { default as ToastClose } from './components/ToastClose.vue';
export { default as ToastRoot } from './components/ToastRoot.vue';
export { default as ToastTrigger } from './components/ToastTrigger.vue';
export type { ComponentDefaults } from './foundations/componentDefaults.ts';
export { default as CladdProvider } from './components/CladdProvider.vue';
export { default as Surface } from './components/Surface.vue';
export { default as SurfaceCut } from './components/SurfaceCut.vue';
export { default as Button } from './components/Button.vue';
export { buttonSpinnerSizes } from './components/button.contracts.ts';
export type { ButtonSurface } from './components/button.contracts.ts';
export { default as Segmented } from './components/Segmented.vue';
export { default as SegmentedButton } from './components/SegmentedButton.vue';
export { default as Toolbar } from './components/Toolbar.vue';
export { default as ToolbarButton } from './components/ToolbarButton.vue';
export { default as ToolbarSeparator } from './components/ToolbarSeparator.vue';
export { default as ToggleGroup } from './components/ToggleGroup.vue';
export { default as ToggleButton } from './components/ToggleButton.vue';
export { default as Tab } from './components/Tab.vue';
export { default as TabPanel } from './components/TabPanel.vue';
export { default as Tabs } from './components/Tabs.vue';
export { default as TabsList } from './components/TabsList.vue';
export { default as CollapsibleRoot } from './components/CollapsibleRoot.vue';
export { default as CollapsibleTrigger } from './components/CollapsibleTrigger.vue';
export { default as CollapsiblePanel } from './components/CollapsiblePanel.vue';
export { default as CollapsibleIndicator } from './components/CollapsibleIndicator.vue';
export type { CollapsibleIndicatorState } from './components/collapsible.contracts.ts';
export { default as AccordionRoot } from './components/AccordionRoot.vue';
export { default as AccordionItem } from './components/AccordionItem.vue';
export { default as AccordionTrigger } from './components/CollapsibleTrigger.vue';
export { default as AccordionPanel } from './components/CollapsiblePanel.vue';
export { default as AccordionIndicator } from './components/CollapsibleIndicator.vue';
export { default as Chip } from './components/Chip.vue';
export { default as List } from './components/List.vue';
export { default as ListButton } from './components/ListButton.vue';
export { default as ListItem } from './components/ListItem.vue';
export { default as ListSeparator } from './components/ListSeparator.vue';
export { default as ListTitle } from './components/ListTitle.vue';
export { default as SectionTitle } from './components/SectionTitle.vue';
export { default as Shortcut } from './components/Shortcut.vue';
export { default as Spinner } from './components/Spinner.vue';
export { default as Checkbox } from './components/Checkbox.vue';
export { default as Input } from './components/Input.vue';
export { default as Radio } from './components/Radio.vue';
export { default as SearchField } from './components/SearchField.vue';
export { default as Slider } from './components/Slider.vue';
export { default as Select } from './components/Select.vue';
export type {
  SelectOption,
  SelectOptionInput,
  SelectOptionParams,
  SelectProps,
  SelectValue,
} from './components/select.contracts.ts';
export { default as Switch } from './components/Switch.vue';
export { default as Textarea } from './components/Textarea.vue';
export {
  choiceSizes,
  fieldSizes,
  sliderVariants,
  switchSizes,
} from './components/form.contracts.ts';
export { default as Dialog } from './components/Dialog.vue';
export { default as DialogClose } from './components/DialogClose.vue';
export { default as DialogRoot } from './components/DialogRoot.vue';
export { default as DialogTrigger } from './components/DialogTrigger.vue';
export { default as Popover } from './components/Popover.vue';
export { default as PopoverClose } from './components/PopoverClose.vue';
export { default as PopoverRoot } from './components/PopoverRoot.vue';
export { default as PopoverTrigger } from './components/PopoverTrigger.vue';
export { default as Popup } from './components/Popup.vue';
export { default as PopupClose } from './components/PopupClose.vue';
export { default as PopupContent } from './components/PopupContent.vue';
export { default as PopupRoot } from './components/PopupRoot.vue';
export { default as PopupTrigger } from './components/PopupTrigger.vue';
export { default as Tooltip } from './components/Tooltip.vue';
export { default as TooltipPrimitive } from './components/TooltipPrimitive.vue';
export {
  popoverPositionConfigs,
  popoverPositions,
  tooltipPositions,
} from './components/overlay.contracts.ts';
export type {
  OverlayOffsetValue,
  PopoverOffset,
  PopoverPosition,
  TooltipPosition,
} from './components/overlay.contracts.ts';
export type {
  ChoiceSize,
  FieldSize,
  SliderScale,
  SliderVariant,
  SwitchSize,
} from './components/form.contracts.ts';

export { default as CloseIcon } from './components/icons/CloseIcon.vue';
export { default as SearchIcon } from './components/icons/SearchIcon.vue';
export { default as DropdownIcon } from './components/icons/DropdownIcon.vue';
export { default as CheckIcon } from './components/icons/CheckIcon.vue';

export { cn } from './shared/cn.ts';
export { nextTick } from './shared/nextTick.ts';
