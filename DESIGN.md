---
name: "elchai pulse"
description: "Intelligence given a calm, tactile presence."
colors:
  living-teal: "#2ebcaf"
  teal-depth: "#137a74"
  material-lilac: "#9d83cd"
  signal-violet: "#6d56a8"
  porcelain: "#f2f0ea"
  paper: "#e9e7e0"
  ink: "#11131a"
  muted-ink: "#5a5d65"
  night: "#17141e"
  soft-white: "#f8f6f0"
  white: "#ffffff"
  hairline: "rgba(17, 19, 26, 0.18)"
typography:
  display:
    fontFamily: "\"Inter Variable\", sans-serif"
    fontSize: "clamp(3.9rem, 6.4vw, 6rem)"
    fontWeight: 470
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "\"Inter Variable\", sans-serif"
    fontSize: "clamp(3.2rem, 6.8vw, 6rem)"
    fontWeight: 430
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "\"Inter Variable\", sans-serif"
    fontSize: "clamp(1.55rem, 2.4vw, 2.35rem)"
    fontWeight: 470
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "\"Inter Variable\", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "\"Inter Variable\", sans-serif"
    fontSize: "0.72rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  card: "16px"
  full: "999px"
  circle: "50%"
spacing:
  control-gap: "0.75rem"
  control-inline: "1.2rem"
  page-gutter: "3.5vw"
  page-gutter-mobile: "1.25rem"
  section-y: "clamp(6rem, 10vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 1.2rem"
    height: "46px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  button-inverse:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 1.5rem"
    height: "54px"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.65rem 0"
  specimen-card:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(2rem, 4vw, 4rem)"
---

# Design System: elchai pulse

## Overview

**Creative North Star: "The Acoustic Specimen Dossier"**

Pulse is intelligence given presence: quiet enough to invite attention, exact enough to feel credible, and materially expressive enough to be remembered. The system borrows the measured confidence of an instrument dossier—porcelain fields, ink typography, fine specimen marks, and circular acoustic forms—without becoming clinical or cold.

Teal and lilac behave like living material inside this disciplined frame. They signal voice, response, and intelligence in motion while the surrounding interface remains restrained. The result explicitly refuses the generic dark-neon AI dashboard: darkness is a deliberate contrast field, never the default atmosphere, and luminous color is used as evidence of activity rather than decoration.

**Key Characteristics:**

- Porcelain-first surfaces with precise ink structure
- Expansive, tightly set display typography paired with neutral body copy
- Teal-to-lilac material reserved for voice, signal, and response
- Circular specimen geometry, fine rules, and sparse measurement marks
- Flat-by-default composition with selective object-like lift
- Slow, measured motion that yields completely to reduced-motion preferences

## Colors

The palette pairs warm laboratory neutrals with cool living signals; the restraint of the field makes every chromatic moment feel intentional.

### Primary

- **Living Teal** (`living-teal`): The active material color for waveforms, animated intelligence, selection, and the most vivid voice-led moments.
- **Teal Depth** (`teal-depth`): The grounded signal color for labels, status dots, icons, and small emphasis that must remain legible on porcelain.

### Secondary

- **Material Lilac** (`material-lilac`): The soft complementary material used inside orb and waveform gradients, never as generic surface tint.

### Tertiary

- **Signal Violet** (`signal-violet`): The decisive secondary signal for product naming, responses, focus outlines, and occasional full-field transitions.

### Neutral

- **Porcelain Field** (`porcelain`): The dominant page surface and the default canvas for the system.
- **Dossier Paper** (`paper`): A quiet tonal step used to separate contemplative sections without adding cards or shadows.
- **Precision Ink** (`ink`): Primary text, structural controls, and measurement marks.
- **Muted Ink** (`muted-ink`): Supporting copy and metadata; it recedes without losing readability.
- **Instrument Night** (`night`): A rare contrast field for demonstrations and the footer.
- **Soft White** (`soft-white`): Warm inverse text on dark fields.
- **Control White** (`white`): Crisp inverse controls and high-priority text.
- **Graphite Hairline** (`hairline`): The shared border and divider color for rails, tables, and specimen geometry.

### Named Rules

**The Living Signal Rule.** Teal, lilac, and violet must communicate voice, response, focus, or material presence; they are not ambient decoration.

**The Porcelain Majority Rule.** Warm neutral fields remain the dominant visual atmosphere. Dark sections are deliberate contrast events, not the system's default mode.

## Typography

**Display Font:** Inter Variable with optical sizing enabled

**Body Font:** Inter Variable

**Label Font:** Inter Variable

Inter is self-hosted through `@fontsource-variable/inter` and distributed under the SIL Open Font License 1.1. The display hierarchy uses the same family at larger optical sizes rather than depending on a separate proprietary display font.

**Character:** The type system feels engineered but humane. Low-weight, tightly tracked display type creates quiet monumentality, while neutral body and label styles keep factual content easy to scan.

### Hierarchy

- **Display** (470, `clamp(3.9rem, 6.4vw, 6rem)`, 0.92): Singular product statements; keep line lengths exceptionally short and balance the wrapping.
- **Headline** (430, `clamp(3.2rem, 6.8vw, 6rem)`, 0.98): Major section theses and closing statements.
- **Title** (470, `clamp(1.55rem, 2.4vw, 2.35rem)`, 1.1): Principle titles and content-group propositions.
- **Body** (400, `1rem`, 1.65): Explanatory copy, generally constrained to roughly 29–38rem for calm reading.
- **Label** (650, `0.72rem`, `0.08em`): Kicker text, state labels, and specimen notation; functional labels are uppercase, while brand labels remain lowercase.

### Named Rules

**The Short Monument Rule.** Display lines are large because they are brief. Do not use monumental type for paragraphs or let it expand into generic full-width slogans.

**The Case Has Meaning Rule.** Uppercase belongs to measurement, state, and taxonomy; lowercase preserves the elchai brand voice.

## Layout

The system uses edge-aware editorial grids rather than a centered card stack. Desktop surfaces share a fluid page gutter (`3.5vw`), generous vertical bands (`clamp(6rem, 10vw, 10rem)`), asymmetric columns, and fine rules that make large empty areas feel intentional. Content blocks are constrained by character or rem widths instead of a single universal container.

At 1100px, tertiary columns may disappear and major grids simplify. At 820px, multi-column compositions collapse to one column, the gutter becomes `1.25rem`, navigation loses nonessential text links, and oversized circular objects may intentionally bleed beyond the viewport. At 520px, specimen annotations can be removed when they compete with comprehension. Mobile preserves scale and drama; it changes sequencing, not identity.

**The Ruled Space Rule.** Use hairlines, grid proportions, and controlled whitespace to establish structure before introducing containers.

## Elevation & Depth

The system is flat by default and uses tonal layering, overlap, and circular cropping as its primary depth tools. Shadows are reserved for focal objects that need to feel physically present: the orb receives a soft ambient lift, the voice specimen receives a stronger directional lift, and tiny signal dots may carry a restrained colored bloom.

### Shadow Vocabulary

- **Orb Float** (`0 28px 48px rgba(49, 43, 63, 0.12)`): A broad, low-contrast shadow beneath circular living material.
- **Specimen Lift** (`24px 30px 70px rgba(0, 0, 0, 0.22)`): A deliberate object shadow for a large pale specimen on a dark field.
- **Signal Bloom** (`4px 6px 16px rgba(19, 122, 116, 0.28)`): A small animated indication of listening or active state.

### Named Rules

**The Object-Only Shadow Rule.** Shadows belong to tangible focal specimens and active signals. Structural sections, rails, and ordinary content remain flat.

## Shapes

The dominant form language is a tension between exact rectangles and perfect circles. Page structure uses square edges and one-pixel rules; acoustic identity appears through rings, dots, circular clipping, and capsule controls. The large specimen container uses a gently softened card corner (`16px`), while actions and waveform bars use a full capsule (`999px`). Avoid a generic middle-radius vocabulary across every surface.

**The Circle Means Presence Rule.** Circles identify the product's voice, listening state, or measured object—not arbitrary decoration.

## Components

Components are restrained, precise, and tactile. Their states should feel like small physical changes inside an otherwise composed instrument panel.

### Buttons

- **Shape:** Full capsule with a one-pixel border (`999px`).
- **Primary:** Precision Ink field, Control White text, compact label typography, and a 46px minimum height.
- **Hover / Focus:** Hover clears the fill, returns text to Precision Ink, and lifts by 2px over 240ms; keyboard focus uses a 2px Signal Violet outline offset by 4px.
- **Inverse:** Control White field on chromatic or dark backgrounds, 54px high for closing actions; hover clears to the field while retaining a white border and text.

### Cards / Containers

- **Corner Style:** One named specimen radius (`16px`); most structural sections remain square.
- **Background:** Porcelain Field on contrast fields; Dossier Paper creates full-width tonal sections.
- **Shadow Strategy:** Only focal specimen objects receive Specimen Lift.
- **Border:** Internal transcript divisions use Graphite Hairline rather than nested cards.
- **Internal Padding:** Fluid, generous padding (`clamp(2rem, 4vw, 4rem)`), reduced to `1.5rem` on small screens.

### Navigation

Navigation is a quiet ruled bar with the two-part lowercase wordmark at left, low-density text links, and a single capsule action at right. Desktop height is 84px; mobile height is 72px. Text-link hover is a directional underline reveal, while mobile removes secondary links before compressing the primary action.

### Labels & Specimen Marks

Labels are small, tracked, and semantically coded. Teal Depth identifies taxonomy and active state; Signal Violet identifies product material or response. Measurement annotations may rotate or sit at circular boundaries, but never become a decorative texture.

### Voice Specimen

The signature interaction object combines a small listening status, a teal-to-lilac waveform, a ruled transcript, and restrained speaker labels. Waveform motion alternates over 1600ms, while the listening dot breathes over 1800ms. Reduced-motion mode collapses these animations to a static, still-legible state.

### Orb & Acoustic Rings

The living orb is clipped to a perfect circle and framed by one-pixel measurement rings. Rings rotate slowly over 34s and 46s in opposing directions; entrance motion uses a soft reveal rather than a bounce. The supplied material video or generative fallback must remain comprehensible as a still first frame when autoplay or motion is unavailable.

## Do's and Don'ts

### Do:

- **Do** let porcelain, ink, and whitespace carry most of the interface.
- **Do** reserve chromatic material for voice, response, focus, and product presence.
- **Do** use one-pixel rules and asymmetric grids before reaching for cards.
- **Do** preserve oversized type and object scale on mobile while simplifying the sequence around them.
- **Do** provide still, legible fallbacks and honor reduced-motion preferences.
- **Do** keep the elchai and elchai pulse names lowercase.

### Don't:

- **Don't** turn the system into a generic dark-neon AI dashboard.
- **Don't** cover every section in rounded cards, glass panels, or decorative gradients.
- **Don't** use circles unless they signify presence, listening, signal, or measurement.
- **Don't** apply shadows to ordinary sections, navigation, or list rows.
- **Don't** use uppercase as a general brand voice; reserve it for functional specimen language.
- **Don't** add visual claims, badges, benchmarks, or proof motifs that the product cannot substantiate.
