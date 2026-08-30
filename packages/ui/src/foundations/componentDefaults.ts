import type {
  AccordionItemDefaultProps,
  AccordionRootDefaultProps,
} from '../components/accordion.contracts.ts';
import type { ButtonDefaultProps } from '../components/button.contracts.ts';
import type { CheckboxDefaultProps } from '../components/checkbox.contracts.ts';
import type {
  CollapsibleIndicatorDefaultProps,
  CollapsiblePanelDefaultProps,
  CollapsibleRootDefaultProps,
} from '../components/collapsible.contracts.ts';
import type {
  ChipDefaultProps,
  ListButtonDefaultProps,
  ListDefaultProps,
  ListItemDefaultProps,
  ListSeparatorDefaultProps,
  ListTitleDefaultProps,
  SectionTitleDefaultProps,
  ShortcutDefaultProps,
} from '../components/dataDisplay.contracts.ts';
import type {
  FocusRingDefaultProps,
  SpinnerDefaultProps,
  ToastDefaultProps,
} from '../components/feedback.contracts.ts';
import type { InputDefaultProps } from '../components/input.contracts.ts';
import type { LinkDefaultProps } from '../components/link.contracts.ts';
import type {
  OTPFieldDefaultProps,
  OTPFieldInputDefaultProps,
  OTPFieldSeparatorDefaultProps,
} from '../components/otpField.contracts.ts';
import type {
  DialogDefaultProps,
  PopoverDefaultProps,
  TooltipDefaultProps,
  TooltipPrimitiveDefaultProps,
} from '../components/overlay.contracts.ts';
import type {
  PopupContentDefaultProps,
  PopupDefaultProps,
} from '../components/popup.contracts.ts';
import type { RadioDefaultProps } from '../components/radio.contracts.ts';
import type { SearchFieldDefaultProps } from '../components/searchField.contracts.ts';
import type {
  SegmentedButtonDefaultProps,
  SegmentedDefaultProps,
} from '../components/segmented.contracts.ts';
import type { SelectDefaultProps } from '../components/select.contracts.ts';
import type { SliderDefaultProps } from '../components/slider.contracts.ts';
import type {
  SurfaceContentDefaultProps,
  SurfaceCutContentDefaultProps,
  SurfaceCutDefaultProps,
  SurfaceDefaultProps,
} from '../components/surface.contracts.ts';
import type { SwitchDefaultProps } from '../components/switch.contracts.ts';
import type {
  TabDefaultProps,
  TabPanelDefaultProps,
  TabsDefaultProps,
  TabsListDefaultProps,
} from '../components/tabs.contracts.ts';
import type { TextareaDefaultProps } from '../components/textarea.contracts.ts';
import type {
  ToggleButtonDefaultProps,
  ToggleGroupDefaultProps,
} from '../components/toggleGroup.contracts.ts';
import type {
  ToolbarButtonDefaultProps,
  ToolbarDefaultProps,
} from '../components/toolbar.contracts.ts';

/**
 * Registry of per-component default props that can be supplied to `CladdProvider` via the `defaults`
 * prop — upstream's `ComponentDefaults` on `CladdProvider`.
 *
 * Each entry is a partial of that component's props, with polymorphic and per-instance props
 * excluded (see each component's `*DefaultProps` type). Explicit props on an instance always win
 * over these defaults, which in turn win over the component's built-in defaults.
 *
 * Add entries here as components opt into context defaults.
 */
export interface ComponentDefaults {
  AccordionItem?: AccordionItemDefaultProps;
  AccordionRoot?: AccordionRootDefaultProps;
  Button?: ButtonDefaultProps;
  Checkbox?: CheckboxDefaultProps;
  Chip?: ChipDefaultProps;
  CollapsibleIndicator?: CollapsibleIndicatorDefaultProps;
  CollapsiblePanel?: CollapsiblePanelDefaultProps;
  CollapsibleRoot?: CollapsibleRootDefaultProps;
  Dialog?: DialogDefaultProps;
  FocusRing?: FocusRingDefaultProps;
  Input?: InputDefaultProps;
  List?: ListDefaultProps;
  ListButton?: ListButtonDefaultProps;
  ListItem?: ListItemDefaultProps;
  ListSeparator?: ListSeparatorDefaultProps;
  ListTitle?: ListTitleDefaultProps;
  Popover?: PopoverDefaultProps;
  Popup?: PopupDefaultProps;
  PopupContent?: PopupContentDefaultProps;
  Radio?: RadioDefaultProps;
  SearchField?: SearchFieldDefaultProps;
  SectionTitle?: SectionTitleDefaultProps;
  Segmented?: SegmentedDefaultProps;
  SegmentedButton?: SegmentedButtonDefaultProps;
  Select?: SelectDefaultProps;
  Shortcut?: ShortcutDefaultProps;
  Slider?: SliderDefaultProps;
  Spinner?: SpinnerDefaultProps;
  Link?: LinkDefaultProps;
  OTPField?: OTPFieldDefaultProps;
  OTPFieldInput?: OTPFieldInputDefaultProps;
  OTPFieldSeparator?: OTPFieldSeparatorDefaultProps;
  Surface?: SurfaceDefaultProps;
  SurfaceContent?: SurfaceContentDefaultProps;
  SurfaceCut?: SurfaceCutDefaultProps;
  SurfaceCutContent?: SurfaceCutContentDefaultProps;
  Switch?: SwitchDefaultProps;
  Tab?: TabDefaultProps;
  TabPanel?: TabPanelDefaultProps;
  Tabs?: TabsDefaultProps;
  TabsList?: TabsListDefaultProps;
  Textarea?: TextareaDefaultProps;
  Toast?: ToastDefaultProps;
  ToggleButton?: ToggleButtonDefaultProps;
  ToggleGroup?: ToggleGroupDefaultProps;
  Toolbar?: ToolbarDefaultProps;
  ToolbarButton?: ToolbarButtonDefaultProps;
  Tooltip?: TooltipDefaultProps;
  TooltipPrimitive?: TooltipPrimitiveDefaultProps;
}
