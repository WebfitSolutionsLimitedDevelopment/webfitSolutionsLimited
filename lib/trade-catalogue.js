// Trade catalogue data. Edit this file to add, remove or update products.
// Keep supplier names, brands and photos OUT of this file unless the supplier
// has given written permission to use them.
//
// packSize: shown as-is. Use 'TBC' until the supplier confirms it.
// shelfLife: as stated by the supplier for export stock.

export const CATALOGUE_UPDATED = 'October 2026'

export const CATEGORIES = [
  { id: 'mamara', name: 'Puffed rice snacks', blurb: 'Seasoned puffed rice (mamara), ready to eat.' },
  { id: 'namkeen', name: 'Namkeen & mixtures', blurb: 'Sev, gathiya, chavanu and chiwda, ready to eat.' },
  { id: 'fryums', name: 'Fryums (ready to fry)', blurb: 'Dried snack shapes with seasoning, fry before serving.' },
]

const p = (id, name, category, packSize, shelfLife = '12 months') => ({ id, name, category, packSize, shelfLife })

export const PRODUCTS = [
  p('vagharela-mamara', 'Vagharela Mamara', 'mamara', '400 g'),
  p('masala-mamara', 'Masala Mamara', 'mamara', '400 g'),
  p('garlic-mamara', 'Garlic Mamara', 'mamara', '400 g'),

  p('bhavnagri-gathiya', 'Bhavnagri Gathiya', 'namkeen', '400 g'),
  p('ratlami-sev', 'Ratlami Sev', 'namkeen', '400 g'),
  p('indori-sev', 'Indori Sev', 'namkeen', '400 g'),
  p('garlic-sev', 'Garlic Sev', 'namkeen', '400 g'),
  p('kaju-mix-chavana', 'Kaju Mix Chavana', 'namkeen', '400 g'),
  p('khatta-mitha-chavana', 'Khatta Mitha Chavana', 'namkeen', '400 g'),
  p('sing-bhujiya', 'Sing Bhujiya', 'namkeen', '400 g'),
  p('sakkarpara', 'Sakkarpara', 'namkeen', '400 g'),
  p('farali-chiwda-mitha', 'Farali Chiwda (Sweet)', 'namkeen', '400 g'),
  p('farali-chiwda-tikha', 'Farali Chiwda (Spicy)', 'namkeen', '400 g'),

  p('fryums-wheels', 'Wheels', 'fryums', '380 g'),
  p('fryums-pipe', 'Pipe', 'fryums', '380 g'),
  p('fryums-triangle', 'Triangle', 'fryums', '380 g'),
  p('fryums-penne', 'Penne Pasta', 'fryums', '380 g'),
  p('fryums-khichiya-papad', 'Khichiya Papad', 'fryums', '380 g'),
  p('fryums-noodles', 'Noodles', 'fryums', '380 g'),
  p('fryums-mix-animal', 'Mix Animal', 'fryums', '380 g'),
  p('fryums-katori', 'Katori', 'fryums', '380 g'),
  p('fryums-abcd', 'ABCD', 'fryums', '380 g'),
]

export const PRODUCT_BY_ID = Object.fromEntries(PRODUCTS.map((x) => [x.id, x]))
export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
