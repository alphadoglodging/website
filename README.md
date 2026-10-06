# AlphaDog Lodging — Website Editing Guide

A standalone static website. No WordPress, no database, no build tools —
just open any `.html` file in a text editor, make your change, save,
and refresh the browser.

All website files live in the `site/` folder. Paths below are relative
to `site/`. Everything outside `site/` (this guide, `CONTRIBUTING.md`,
`CLAUDE.md`, `scripts/`, and config files) is for maintenance and is
never published.

## What's in here

| File | Page |
|---|---|
| `index.html` | Home |
| `services.html` | Services overview |
| `daycare-boarding.html` | Daycare & Boarding |
| `enrichment.html` | Enrichment & Hikes (AlphaDog Outdoors) |
| `training.html` | Training (Mike Wombacher) |
| `grooming.html` | Grooming & Spa |
| `service-training.html` | Service Dog Training (AlphaDog Assist) |
| `about.html` | About & The Team |
| `contact.html` | Contact |
| `faq-policies.html` | FAQ & Policies |
| `partners.html` | Local Partners (Alto Tiburon, Rocket Dog Rescue) |
| `local-resources.html` | Local Resources |
| `gallery.html` | Photo & Video Gallery |
| `pricing-calculator.html` | Pricing Calculator |
| `privacy-policy.html`, `terms-conditions.html`, `cookie-policy.html`, `disclaimer.html`, `data-subject-access-request.html` | Legal pages (linked in the footer) |
| `_redirects` | Sends old WordPress addresses to the new pages (Netlify reads it) |
| `css/styles.css` | All styling & brand colors (edit colors at the top) |
| `js/main.js` | Menu, animations, lightbox, booking links (only the booking URLs at the top need editing) |
| `images/` | Put ALL photos and videos here |

## How to edit anything

Every editable spot is marked in the code with a comment like:

    <!-- ═══ EDIT: Hero headline ═══ -->

Search a file for the word **EDIT** and you'll find every spot you can
safely change, with instructions right there.

## Adding a photo

1. Save the photo into the `images/` folder with the filename the
   comment asks for (e.g. `images/hero.jpg`).
2. In the HTML, delete the two "placeholder" lines (the paw icon SVG
   and the italic label).
3. Un-comment the `<img>` line — i.e. remove the `<!--` and `-->`
   around it.

## Adding a video

Same idea — the hero and gallery comments show a ready-made
`<video>` tag and a YouTube `<iframe>` option. Save the file as `.mp4`
in `images/` (or `images/gallery/` for gallery videos).

## Adding gallery photos

Open `gallery.html` — the big comment at the top of the grid has a
3-line copy-paste block. Drop your photo in `images/gallery/`, paste
the block, change the filename and caption. Done. Photos open
full-screen when clicked automatically.

## Things that live in one place

- **Booking and login buttons** (Gingr): every button reads from the two
  URLs at the top of `js/main.js`. Change them there.
- **Home page hero video**: replace it by saving a new file over
  `images/hero.mp4`. The videos on the Enrichment, Training, and Service
  Dog Training pages are Vimeo embeds: swap the video ID in the `iframe`.

## Header and footer

The header (menu) and footer are repeated on every page. A change to a
menu item, phone number, or hours must be made in **every HTML file**
(use find-and-replace across the `site/` folder). `scripts/check.py`
flags any page that doesn't match.

## Publishing changes

Don't edit the live site directly. Every change goes through a branch
and a pull request. See `CONTRIBUTING.md` for the workflow: preview,
checks, publishing, and rollback.
