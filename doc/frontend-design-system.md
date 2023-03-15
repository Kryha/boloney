# Frontend Design System

The Boloney! Frontend is following atomic design principles,  this provides a direction on building interface design systems more deliberately and with explicit order and hierarchy.

## Design

Mapping the constant values from the Design System. They cannot be broken down further.

- Colors
- Text
- Shadows
- Spacing
- Base Layout

## Atoms

Must use standard html properties and event triggers: disabled, onHover, onFocus

- Building blocks (wrappers, containers)
- Icons
- Buttons
- Inputs
- Images
- Text

## Molecules

Composed out of atoms with extra styles for positioning (margins, padding, etc.) and animation.

They can also contain other Molecules within them (ie. a button can include an icon within it).

- Alerts and pop-ups
- Card
- Form Section type (Text, Toggle, Selector)
- Dice
- Player
- History
- Chat

## Organisms

Mostly dumb-components but can contain some layout and behavioral logic. Exceptional can consume state from a store in order to render state changes properly. Distinct sections of pages or screens that are made up of atoms, and/or molecules, and/or cells.

- End of match
- Match Player
- Match Player Overview
- Top navigation
- Hud
- Forms
- Power up overview
- Landing Component
- Pick(Take) Action
- Get Power ups
- Roll Dice
- End of Round

## Views

Smart components holding feature & service related logic. They are equipped with the established patterns and organisms.

- Chat
- History
- Notifications
- Match
- Power-ups
- Auth
- Create Match
- Homepage
