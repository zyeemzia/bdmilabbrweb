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
| `favicon.png` | browser-tab icon (96×96), same artwork as the app icon |
| `favicon.ico` | tab icon for browsers that ask for `/favicon.ico` (16/32/48) |
| `CNAME` | tells GitHub Pages the custom domain. **Do not delete** |
| `.nojekyll` | skips the Jekyll build step; nothing here needs it |
| `404.html` | shown for any unknown path |
| `README.md` | this file — shown on the repo page, not served as part of the site |

There is no build step, no dependencies and no server code. `index.html` requests
nothing from the network — the service worker is there to make the page
**installable**, not to make it work offline; it already did.

## Credits and links

The page footer and the Help dialog both show `www.zyeemzia.com` and
`bdmil.zyeemzia.com`, with `Copyright © ZyeemZia` last in each. The footer sits
below the results, so on a narrow search it is immediately visible; Help is the
copy that is always one tap away.

These are the only outbound references in the file, and they are links rather
than subresources — the page still requests nothing from the network to load.

## The icon

Light sand camouflage, the Bangladesh Armed Forces emblem centred, and the
owner's signature gold-plated beneath it. Generated procedurally from a fixed
seed, so rebuilding produces the identical file rather than a new random camo.

One mark everywhere. Every icon file is cut from the same `icon-512` artwork —
camo field, emblem, gold signature — so the browser tab, the Android launcher
and the iOS home screen all show the app icon.

- **`icon-192` / `icon-512` / `apple-touch-icon` / `favicon.png`** are the full
  composition, resampled per size and sharpened for it.
- **`favicon.ico`** holds 16/32/48 together, each sharpened separately rather
  than left to the browser to squash one PNG down. It also answers the
  automatic `/favicon.ico` hit at the site root, so that request is not a 404.
- **`icon-maskable-512`** keeps the camo full-bleed but pulls the emblem and
  signature inside the middle 78%, because Android crops icons to a circle and
  would otherwise cut the signature off.

The page also carries an inline SVG fallback icon, which is all the single-file
copy has when no PNG sits beside it. **Order in the `<head>` matters:** where
several equally suitable icons are offered a browser takes the *last* one, and
Chrome falls back to an earlier `<link>` if a later file 404s. So the SVG is
declared first and the real artwork after it — the PNG wins on the hosted site,
the SVG covers the single file. Do not reorder those `<link rel="icon">` lines.

## Install it

**Android / Chrome / Edge / desktop** — an **INSTALL APP** button appears in the
tools row when the browser offers it, or use the browser menu's "Install app".

**iPhone / iPad — there is no INSTALL APP button, in any browser.** That button is
driven by `beforeinstallprompt`, which no iOS browser implements: every browser on
iOS is WebKit underneath, so Chrome, Edge and Firefox there behave like Safari and
fire nothing. It is a platform limit, not a missing feature. The page therefore
shows a one-time hint instead: **Share → Add to Home Screen**.

The hint appears in Safari at any version, and in Chrome / Edge / Firefox / Opera
on **iOS 16.4 or newer** — the release where third-party iOS browsers were first
allowed to add Home Screen web apps. Below 16.4 those browsers genuinely cannot,
so the hint stays hidden there rather than giving advice that would dead-end. The
wording adapts, because Share sits at the bottom of the screen in Safari and in a
menu elsewhere.

Installing is not just cosmetic. **iOS deletes script-writable storage for sites
not visited in 7 days.** A visitor's own added entries and stars are exactly that.
Adding the site to the Home Screen exempts it, and the page also asks the browser
for persistent storage the first time you edit anything.

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
