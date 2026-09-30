# AlphaDog Lodging — Website Editing Guide

A standalone static website. No WordPress, no database, no build tools —
just open any `.html` file in a text editor, make your change, save,
and refresh the browser.

All website files live in the `site/` folder. Paths below are relative
to `site/`. Everything outside `site/` (this guide, `CLAUDE.md`,
`netlify.toml`) is for maintenance and is never published.

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
| `partners.html` | Local Partners (Dog Gone Good, Rocket Dogs, Milo) |
| `local-resources.html` | Local Resources |
| `gallery.html` | Photo & Video Gallery |
| `pricing-calculator.html` | Pricing Calculator |
| `css/styles.css` | All styling & brand colors (edit colors at the top) |
| `js/main.js` | Menu, animations, lightbox (no need to touch) |
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

## Remaining to-dos before launch (search each file for "EDIT")

- [ ] Walk & hike prices on `enrichment.html` (last two `$XX` placeholders
      on the site)
- [ ] Rocket Dogs description + website link (`partners.html` and the
      homepage partner card)
- [ ] Milo Foundation website link (`partners.html`)
- [ ] Local Resources entries (`local-resources.html` — Alto Tiburon is
      in; the rest are placeholders)
- [ ] Vaccination/age/spay-neuter specifics in the first FAQ answer
      (`faq-policies.html`)
- [ ] A higher-resolution photo of Martha (`images/team-martha.jpg` —
      current one is small and will look soft on large screens)
- [ ] Optional: grooming à la carte add-on prices, more team cards
      (Ashley, Tobias…), current-specials card text on `services.html`

## Already wired up (no action needed)

- Gingr booking/login — all buttons read from the two URLs at the top
  of `js/main.js`
- Daycare/boarding rates, salon price list, ADU training rates
- Hero video (images/hero.mp4) and service dog video — replace by
  overwriting the files with the same names
- Google Map on Contact, Yelp reviews link, Instagram/Facebook links
- All page photos and the gallery

## One rule of thumb

The header (menu) and footer are repeated on every page. If you change
a menu item, phone number, or hours, make the same change in **all 14
HTML files** (a find-and-replace across the folder takes seconds in
VS Code or any editor: Edit → Replace in Files).

## Hosting

Hosted on Netlify, deployed from the GitHub repository. Every push to
the `main` branch publishes the `site/` folder automatically. See
`CLAUDE.md` for the full update and rollback workflow.
