/**
 * Spacing Constants
 * Centralized spacing values for consistent design across all components
 */

// Section vertical padding
export const SECTION_PADDING = {
  xs: 8,
  md: 12,
} as const;

// Section header spacing
export const SECTION_HEADER_MB = {
  xs: 6,
  md: 8,
} as const;

// Card spacing
export const CARD_PADDING = {
  xs: 2.5,
  md: 3,
} as const;

// Grid gaps
export const GRID_GAP = {
  xs: 2.5,
  md: 3,
} as const;

// Container max widths used across sections
export const CONTAINER_WIDTHS = {
  narrow: 'sm',
  medium: 'md',
  wide: 'lg',
  full: 'xl',
} as const;

// Common border radius values
export const RADIUS = {
  small: '8px',
  medium: '12px',
  large: '16px',
  xl: '20px',
  round: '50%',
} as const;

// Badge/Chip consistent styling
export const BADGE_STYLES = {
  mb: 2,
  fontWeight: 600,
  fontSize: '0.8rem',
} as const;

// Typography spacing
export const TITLE_MB = 2;
export const SUBTITLE_MB = 0;

// Common transitions
export const TRANSITIONS = {
  default: 'all 0.3s ease',
  fast: 'all 0.2s ease',
  slow: 'all 0.4s ease',
} as const;
