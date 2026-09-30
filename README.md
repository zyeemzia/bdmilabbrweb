# bdmilabbrweb.zyeemzia.com

**BD MIL ABBR** — Bangladesh military abbreviation database. 2,651 entries,
searchable and editable, works offline.

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

Visitors keep their own added entries and favourites: those live in each
browser's `localStorage`, not in this repo, so an update never touches them.

## Source

Extracted from the BD MIL OFFICE Android app. Search ranking, A-Z matching,
import parsing and the word-of-the-day index are ports of its
`DictionaryController`, verified identical across 24 query/mode combinations.
