export interface PaginationLinkProps {
  /** Marks the page as the current page. */
  active?: boolean;
  /** Accessible name for icon-only controls. */
  label?: string;
}
export type PaginationLinkDefaultProps = Partial<PaginationLinkProps>;
