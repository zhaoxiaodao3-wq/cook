---
name: Fresh Harvest Narrative
colors:
  surface: '#fbf8fd'
  surface-dim: '#dbd9dd'
  surface-bright: '#fbf8fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7ec'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1f'
  on-surface-variant: '#45464e'
  inverse-surface: '#303034'
  inverse-on-surface: '#f2f0f4'
  outline: '#76767f'
  outline-variant: '#c6c6cf'
  surface-tint: '#515d88'
  primary: '#17244c'
  on-primary: '#ffffff'
  primary-container: '#2e3a63'
  on-primary-container: '#98a5d4'
  inverse-primary: '#b9c5f6'
  secondary: '#595e71'
  on-secondary: '#ffffff'
  secondary-container: '#dbdef5'
  on-secondary-container: '#5e6275'
  tertiary: '#322400'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d3900'
  on-tertiary-container: '#c0a361'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b9c5f6'
  on-primary-fixed: '#0b1941'
  on-primary-fixed-variant: '#39456f'
  secondary-fixed: '#dee1f8'
  secondary-fixed-dim: '#c2c5dc'
  on-secondary-fixed: '#161b2b'
  on-secondary-fixed-variant: '#424658'
  tertiary-fixed: '#ffdf99'
  tertiary-fixed-dim: '#e2c37e'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#594409'
  background: '#fbf8fd'
  on-background: '#1b1b1f'
  surface-variant: '#e4e1e6'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  margin-page: 20px
  gutter-card: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The brand personality is sophisticated, trustworthy, and serene, designed to inspire culinary excellence and professional-grade wellness within a communal setting. The target audience includes discerning home cooks, wellness professionals, and aesthetic-conscious creators who value stability as much as inspiration.

The design style is **Modern Professional with Deep Accents**. It leverages controlled spacing and a refined color palette to let food photography act as a premium visual driver. By combining a clean, "app-within-an-app" logic suitable for a WeChat Mini Program with soft, organic shapes, the UI evokes an emotional response of reliability, depth, and calm. High-quality imagery is framed by precise margins and cool-tinted shadows, ensuring the interface feels authoritative yet accessible.

## Colors

The palette is rooted in the "Twilight & Earth" concept. 
- **Primary (Muted Indigo):** Used for primary actions, navigation states, and brand identifiers. It reinforces the professional and calm aspect of the experience.
- **Secondary (Slate Blue):** Used for supporting UI elements, functional highlights, and interactive accents that require balance.
- **Tertiary (Deep Bronze):** A rich, dark bronze used for high-value callouts, "Chef's Choice" indicators, or to add a touch of earthy luxury to background containers.
- **Neutrals:** A range of medium grays (#77767A for page backgrounds) keeps the UI grounded and reduces visual fatigue compared to pure white.

## Typography

This design system utilizes a modern sans-serif stack that complements the default WeChat environment while adding a premium editorial feel. 
- **Headlines:** Use *Plus Jakarta Sans* for its friendly, rounded terminals which provide a soft counterpoint to the deep indigo primary color. 
- **Body & Labels:** *Be Vietnam Pro* provides high legibility for long-form recipe instructions and ingredient lists against the new neutral backgrounds.
- **Hierarchy:** Maintain a clear distinction between titles (Display/Headline) and instructional steps (Body). Use tight letter-spacing for headlines to create a punchy, professional look.

## Layout & Spacing

The layout follows a **Fluid Mobile-First Grid** optimized for the WeChat Mini Program viewport. 
- **Margins:** A standard 20px side margin is maintained for all primary content to prevent crowding.
- **Rhythm:** An 8px-based spacing system is used. Use 16px (stack-md) for separating logical sections and 32px (stack-lg) to separate major content blocks like "Curated Collections" from "Category Grids".
- **Density:** Favor "Medium Density" to ensure that information-rich content like nutritional facts and precise measurements are clear and legible.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Cool-Tinted Ambient Shadows**. 
- **Level 0 (Background):** #77767A. The refined base canvas.
- **Level 1 (Cards):** Surfaces using the surface-container tones with a very soft, diffused shadow (Blur: 12px, Y: 4px, Color: Indigo at 6% opacity). These cards contain premium recipe previews.
- **Level 2 (Floating Elements):** Used for primary action buttons. These use a slightly more pronounced shadow (Blur: 20px, Y: 8px, Color: Primary Indigo at 20% opacity) to signify interactivity.
- **Outlines:** Use 1px borders in #72768A (Slate Blue) for input fields to maintain a structured, modern aesthetic.

## Shapes

The shape language is defined by "Organic Softness."
- **Standard Radius:** 12px for small components like buttons and input fields.
- **Large Radius (rounded-lg):** 16px for recipe cards, image thumbnails, and modal sheets.
- **Full Radius:** Use pill-shaped containers for "Tags" (e.g., #HighProtein, #ChefChoice) to distinguish them from actionable buttons.
- **Consistency:** The Rounded (2) setting ensures that despite the professional colors, the interface never feels sharp or uninviting.

## Components

- **Buttons:** Primary buttons use a solid Muted Indigo fill with white text. Secondary buttons use a Slate Blue outline with a subtle fill.
- **Cards:** Recipe cards feature a top-aligned image with a 16px corner radius, followed by the title in Primary Indigo to ensure clear legibility.
- **Chips/Tags:** Use the Tertiary Bronze color for premium tags like "Award Winning" and Slate Blue for standard categorization.
- **Input Fields:** Clean backgrounds with 12px rounded corners and a 1px #72768A border. On focus, the border transitions to Primary Indigo.
- **Lists:** Ingredient lists should use custom checkboxes styled as "circles" to align with the brand's rounded shape language.
- **Icons:** Use 2pt stroke-weight linear icons. Icons should be monochrome (Slate Blue) for navigation and colored (Indigo/Bronze) only when indicating an active state.