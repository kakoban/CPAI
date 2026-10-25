# Contract: Industry Track Switcher & Navigation

**Component**: `IndustryTrackSwitcher.tsx` & `IndustryTrackSelectorModal.tsx`  
**Feature**: `005-everyday-general-track`

## Interface Contract

```typescript
export interface IndustryTrackSwitcherProps {
  currentTrack: IndustryTrackId;
  onSelectTrack: (track: IndustryTrackId) => void;
  onOpenSelectorModal?: () => void;
  variant?: 'compact' | 'full' | 'dropdown';
  className?: string;
}
```

## Behavior Invariants

1. **Three Mutually Exclusive Tracks**:
   - `CIVIL_INFRA`: Blue / Indigo theme with `Building2` icon
   - `ENERGY_PETRO`: Amber / Orange / Red theme with `Factory` icon
   - `GENERAL_EVERYDAY`: Emerald / Teal / Purple theme with `Sparkles` icon

2. **Persistence**:
   - Selecting any track writes to `localStorage.setItem('cpmai_industry_track', trackId)`.
   - Invalidation / Alignment: If current discipline is incompatible with new track, trigger `getSavedDiscipline(newTrack)` to set default compatible discipline.

3. **Accessibility & RTL**:
   - Direction: RTL (`dir="rtl"`)
   - Full keyboard navigation and visible focus rings.
   - Screen-reader friendly tooltips (`title` attribute).
