/**
 * Common CSS utility classes for consistent styling
 */
export const cssClasses = {
  // Layout
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-20",
  sectionHeader: "text-center mb-16",

  // Typography
  heading1: "text-4xl md:text-6xl font-bold text-gray-900 dark:text-white",
  heading2: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white",
  heading3: "text-xl md:text-2xl font-semibold text-gray-900 dark:text-white",
  heading4: "text-lg font-semibold text-gray-900 dark:text-white",
  subtitle: "text-lg text-gray-600 dark:text-gray-300",
  body: "text-gray-600 dark:text-gray-300",
  bodySmall: "text-sm text-gray-600 dark:text-gray-300",

  // Backgrounds
  bgWhite: "bg-white dark:bg-gray-900",
  bgGray: "bg-gray-50 dark:bg-gray-800",
  bgDark: "bg-gray-900 dark:bg-gray-950",

  // Cards
  card: "bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
  cardHover: "transition-transform hover:scale-105",
  cardPadding: "p-6",
  cardPaddingSm: "p-4",
  cardPaddingLg: "p-8",

  // Buttons
  button:
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
  buttonSecondary:
    "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100",
  buttonOutline: "border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800",

  // Grid layouts
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-6",
  grid3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  grid4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",

  // Flex layouts
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexCol: "flex flex-col",

  // Spacing
  spacingXs: "space-y-2",
  spacingSm: "space-y-4",
  spacingMd: "space-y-6",
  spacingLg: "space-y-8",
  spacingXl: "space-y-12",

  // States
  loading: "animate-pulse",
  transition: "transition-all duration-200 ease-in-out",

  // Skills/Tags
  skillTag: "px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium",

  // Social links
  socialLink: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors",

  // Navigation
  navLink: "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors",
  navLinkActive: "text-blue-600 dark:text-blue-400",

  // Form elements
  input:
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white",
  textarea:
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white resize-none",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300",

  // Progress bars
  progressBar: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2",
  progressFill: "h-2 rounded-full transition-all duration-300",

  // Icons
  iconSm: "w-4 h-4",
  iconMd: "w-5 h-5",
  iconLg: "w-6 h-6",
  iconXl: "w-8 h-8",

  // Animations
  slideIn: "animate-in slide-in-from-bottom-4 duration-500",
  fadeIn: "animate-in fade-in duration-500",
  scaleIn: "animate-in zoom-in-95 duration-200",
} as const;

/**
 * Utility function to combine CSS classes with conditional logic
 */
export const cn = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Responsive grid helper
 */
export const responsiveGrid = (cols: 1 | 2 | 3 | 4 = 3) => {
  const gridMap = {
    1: "grid grid-cols-1 gap-6",
    2: cssClasses.grid2,
    3: cssClasses.grid3,
    4: cssClasses.grid4,
  };
  return gridMap[cols];
};

/**
 * Card variant helper
 */
export const cardVariant = (
  variant: "default" | "hover" | "bordered" = "default",
  padding: "sm" | "md" | "lg" = "md"
) => {
  const paddingMap = {
    sm: cssClasses.cardPaddingSm,
    md: cssClasses.cardPadding,
    lg: cssClasses.cardPaddingLg,
  };

  return cn(
    cssClasses.card,
    paddingMap[padding],
    variant === "hover" && cssClasses.cardHover,
    variant === "bordered" && "border-2"
  );
};
