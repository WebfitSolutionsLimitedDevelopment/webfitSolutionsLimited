// Registry of private trade catalogues. SERVER-SIDE ONLY: never import this file
// from a 'use client' component, or every catalogue would be sent to the browser.
//
// Each catalogue lives at /c/<slug>. Slugs are deliberately hard to guess and are
// never linked from the site menu, footer or sitemap. Pages are marked noindex.
// To add a catalogue: create a file in this folder, add it below, and put its
// images in public/catalogues/<slug>/.

import indianSnacks from './indian-snacks'
import leatherGoods from './leather-goods'

export const CATALOGUES = Object.fromEntries([indianSnacks, leatherGoods].map((c) => [c.slug, c]))

export function getCatalogue(slug) {
  return Object.prototype.hasOwnProperty.call(CATALOGUES, slug) ? CATALOGUES[slug] : null
}
