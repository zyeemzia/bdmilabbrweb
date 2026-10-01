# bdmilabbrweb.zyeemzia.com

**BD MIL ABBR** — Bangladesh military abbreviation database. 2,651 entries,
searchable and editable, works offline. Paste a paragraph into the **TEXT TOOL**
and it abbreviates or de-abbreviates it against the whole database.

Live at <https://bdmilabbrweb.zyeemzia.com>

## What is in this repo

| file | what it is |
|---|---|
| `index.html` | the entire site — app, styles and all 2,651 entries in one file |
| `CNAME` | tells GitHub Pages the custom domain. **Do not delete** |
| `.nojekyll` | skips the Jekyll build step; nothing here needs it |
| `404.html` | shown for any unknown path |

There is no build step, no dependencies and no server code. `index.html` requests
nothing from the network — it works offline and from a USB stick.

## Updating the site

Replace `index.html` and commit. GitHub Pages redeploys in about a minute.
Nothing else needs touching — `CNAME`, `404.html` and `.nojekyll` do not change
between releases.

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
