# Image credits

Every photograph in `public/images/daita/stock/` and the licence it ships under.

## Licence

All ten images come from **Pexels**. Quoted verbatim from
<https://www.pexels.com/license/>:

> All photos and videos on Pexels are free to use.
>
> Attribution is not required. Giving credit to the photographer or Pexels is not
> necessary but always appreciated.

Pexels' own summary of the same terms: *"Free for commercial use ✓ No attribution
required."*

Each photo page below was fetched individually and shows a **Free to use** badge linking
to that licence, with `"license":"Pexels"` in the photo record. Attribution is given here
anyway — it costs nothing and it is the decent thing to do.

**Unsplash** returned HTTP 401 to every request during sourcing, so nothing was taken
from it. **Pixabay** was reachable but had no garment-factory material matching the
brief.

## Files

| File | Slot | Source | Photographer |
|---|---|---|---|
| `pillar-1-team.jpg` | Pillar card 1 — *Embedded, not exported* | [pexels.com/photo/39351215](https://www.pexels.com/photo/39351215/) | Galib Rahman Nadim |
| `pillar-2-records.jpg` | Pillar card 2 — *T&A-native* | [pexels.com/photo/31212947](https://www.pexels.com/photo/31212947/) | EqualStock IN |
| `pillar-3-desk.jpg` | Pillar card 3 — *It does the work, not the watching* | [pexels.com/photo/31335986](https://www.pexels.com/photo/31335986/) | EqualStock IN |
| `pillar-4-handover.jpg` | Pillar card 4 — *Live in a week* | [pexels.com/photo/11359621](https://www.pexels.com/photo/11359621/) | Mehmet Turgut Kirkgoz |
| `pillar-5-supervisor.jpg` | Pillar card 5 — *Your rules, your AI* | [pexels.com/photo/31090809](https://www.pexels.com/photo/31090809/) | EqualStock IN |
| `industry-production-line.jpg` | Who it's for — tab 1 | [pexels.com/photo/31112181](https://www.pexels.com/photo/31112181/) | EqualStock IN |
| `industry-samples-desk.jpg` | Who it's for — tab 2 | [pexels.com/photo/7256865](https://www.pexels.com/photo/7256865/) | Anete Lusina |
| `cta-bg-desktop.jpg` | Closing CTA background, ≥768px | [pexels.com/photo/31786110](https://www.pexels.com/photo/31786110/) | Simeon Maryska |
| `cta-bg-mobile.jpg` | Closing CTA background, <768px | [pexels.com/photo/34718931](https://www.pexels.com/photo/34718931/) | Yetkin Ağaç |
| `hero-still.jpg` | Hero `"image"` variant on /platform, /our-story, /contact | [pexels.com/photo/8246488](https://www.pexels.com/photo/8246488/) | RAJESH KUMAR VERMA |

All ten are served at the size delivered by the Pexels CDN resizer: 1600px wide for the
card slots, 2400px for the hero and the desktop CTA, and a 900×1400 crop for the mobile
CTA. Total 2.9 MB, against roughly 30 MB of video they replace.

## Known gaps

- **Pillar card 2** wanted a production or planning board. No garment-factory planning
  board exists on any of the three permitted sources; the generic office kanban board
  that does exist was rejected because it undercuts the T&A-native claim. The slot
  currently carries a neutral factory image — a worker recording production details on
  the floor. **It should be replaced with our own screenshot of the TNA Engine.**
- The two **CTA backgrounds** are Turkish and European industrial interiors, not garment
  floors. They are dark and wide, which is what the slot needs, but they are the least
  on-brief geographically of the set.
- The **hero film** (`hero-animation-*`) and the four **stack-layer stills** are not
  replaced. The film is abstract rather than nscale-branded; the stack stills are keyed
  frame-for-frame to the Rive artboard, so replacing them means re-authoring the artboard.
