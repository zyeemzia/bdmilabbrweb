# bdmilabbrweb.zyeemzia.com

**BD MIL ABBR** — Bangladesh military abbreviation database. 2,651 entries,
searchable and editable, works offline. Paste a paragraph into the **TEXT TOOL**
and it abbreviates or de-abbreviates it against the whole database.

Live at <https://bdmilabbrweb.zyeemzia.com>

## What is in this repo

| file | what it is |
|---|---|
| `index.html` | the entire app — program, styles and all 2,651 entries in one file |
| `manifest.webmanifest` | makes it installable: name, icons, colours, shortcuts |
| `sw.js` | service worker. Installability + a guaranteed offline cold start |
| `icon-192.png`, `icon-512.png` | app icons for Android and desktop |
| `icon-maskable-512.png` | Android crops icons to a circle; this one has the safe margin |
| `apple-touch-icon.png` | iOS home-screen icon (180×180, no transparency) |
| `favicon.png` | browser-tab icon (96×96) |
| `CNAME` | tells GitHub Pages the custom domain. **Do not delete** |
| `.nojekyll` | skips the Jekyll build step; nothing here needs it |
| `404.html` | shown for any unknown path |
| `README.md` | this file — shown on the repo page, not served as part of the site |

There is no build step, no dependencies and no server code. `index.html` requests
nothing from the network — the service worker is there to make the page
**installable**, not to make it work offline; it already did.

## The icon

Light sand camouflage, the Bangladesh Armed Forces emblem centred, and the
owner's signature gold-plated beneath it. Generated procedurally from a fixed
seed, so rebuilding produces the identical file rather than a new random camo.

Two marks, not one, because they do different jobs:

- **`icon-192` / `icon-512` / `apple-touch-icon`** carry the full composition.
- **`favicon.png`** drops the signature — at 16 px it is an unreadable smudge, and
  leaving it in only muddies the emblem.
- **`icon-maskable-512`** pulls everything inside the middle 80%, because Android
  crops icons to a circle and would otherwise cut the signature off.

The page also carries an inline SVG fallback icon so the single-file copy still
has something in the tab when no PNG sits beside it. Browsers differ over which
they prefer; delete that one `<link rel="icon" ... data:image/svg+xml ...>` line
to force the PNG everywhere.

## Install it

**Android / Chrome / Edge / desktop** — an **INSTALL APP** button appears in the
tools row when the browser offers it, or use the browser menu's "Install app".

**iPhone / iPad** — Safari gives no install prompt, so the page shows a one-time
hint: **Share → Add to Home Screen**.

Installing is not just cosmetic. **Safari deletes script-writable storage for
sites not visited in 7 days.** A visitor's own added entries and stars are exactly
that. Adding the site to the Home Screen exempts it, and the page also asks the
browser for persistent storage the first time you edit anything.

## Back up what you added

The 2,651 built-ins live in `index.html`, so **RESTORE DATABASE** always brings
those back. Entries somebody typed themselves exist nowhere else — **BACKUP ALL**
downloads every category, entry and star as one plain-JSON file, and **RESTORE
BACKUP** reads it back. A restore only ever adds; it never removes or overwrites.
That file is the only thing that survives clearing browsing data, or moving to
another browser or device.

## If the service worker ever misbehaves

A registered worker outlives the file that registered it, so deleting `sw.js` from
the server does **not** remove it from anyone's browser. Open

    https://bdmilabbrweb.zyeemzia.com/?nosw=1

and the page unregisters every worker and drops its caches. The document is served
stale-while-revalidate, so a new `index.html` is picked up on the next online load
without touching `sw.js` — you never need to bump a version here.

## Updating the site

Replace `index.html` and commit. GitHub Pages redeploys in about a minute, and
the service worker revalidates the document on the next load, so returning
visitors get the new version without any change to `sw.js`.

Nothing else needs touching between releases — `manifest.webmanifest`, `sw.js`,
the five icons, `CNAME`, `404.html` and `.nojekyll` all stay as they are.

Visitors keep their own added entries and favourites: those live in each
browser's `localStorage`, not in this repo, so an update never touches them.

## Can a visitor break the database?

No. Everything a visitor adds, edits or deletes is written to their own browser's
`localStorage` and nowhere else. There is no server and no shared state, so one
person's deletions are invisible to everyone else, and `index.html` in this repo
is never modified by anyone visiting the site.

If someone deletes entries in their own copy by accident, the **RESTORE DATABASE**
button puts every built-in entry back — the 2,651 entries are inside
`index.html` itself, so this works offline and needs nothing from the network. It
only ever adds: their own added entries and their stars are left alone.

## Two tabs at once

The page keeps multiple tabs in step through the browser's `storage` event, so an
entry or star added in one appears in the other. Which category you are viewing,
and the search mode, stay per-tab on purpose.

## Source

Extracted from the BD MIL OFFICE Android app. Search ranking, A-Z matching,
import parsing, sort order and the word-of-the-day index are ports of its
`DictionaryController`; the text tool is a port of its `translation_engine.dart`.
Both were diffed against the real Dart code — search across 24 query/mode
combinations, the text engine across 18 inputs in both directions.
