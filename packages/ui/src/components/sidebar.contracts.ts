export type SidebarSide = 'inline-start' | 'inline-end';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export interface SidebarProviderProps {
  /** Uncontrolled desktop open state. */
  defaultOpen?: boolean;
  /** Controlled desktop open state. */
  open?: boolean;
  /** Uncontrolled mobile drawer state. */
  defaultMobileOpen?: boolean;
  /** Forces the mobile drawer presentation. */
  mobile?: boolean;
  /** Controlled mobile drawer state. */
  mobileOpen?: boolean;
  /** Logical side where the sidebar is placed. */
  side?: SidebarSide;
  /** Surface treatment for the sidebar. */
  variant?: SidebarVariant;
  /** Enables the collapsed desktop state. */
  collapsible?: boolean;
  /** Enables the Ctrl/Cmd+B desktop shortcut. */
  keyboardShortcut?: boolean;
}
export type SidebarProviderDefaultProps = Partial<SidebarProviderProps>;
export interface SidebarProps {
  /** Overrides the provider logical side. */
  side?: SidebarSide;
  /** Overrides the provider surface treatment. */
  variant?: SidebarVariant;
  /** Overrides the provider collapsed behavior. */
  collapsible?: boolean;
}
export type SidebarDefaultProps = Partial<SidebarProps>;
export interface SidebarMenuButtonProps {
  /** Marks the navigation item as current. */
  active?: boolean;
  /** Accessible label displayed while the sidebar is collapsed. */
  tooltip?: string;
}
export type SidebarMenuButtonDefaultProps = Partial<SidebarMenuButtonProps>;
