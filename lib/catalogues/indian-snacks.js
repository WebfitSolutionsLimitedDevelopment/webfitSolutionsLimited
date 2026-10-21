// Private catalogue: packaged Indian snacks. Link: /c/indian-snacks-nbtczn

const SLUG = 'indian-snacks-nbtczn'

const p = (id, name, category, pack) => ({
  id,
  name,
  category,
  details: [['Pack', pack], ['Shelf life', '12 months']],
  images: [`${id}.jpg`],
})

export default {
  slug: SLUG,
  title: 'Indian Snacks',
  metaTitle: 'Trade Catalogue: Indian Snacks | Webfit Solutions Limited',
  eyebrow: 'Trade catalogue',
  heading: ['Indian snacks for ', 'New Zealand', ' stores'],
  intro:
    'Browse a range of packaged Indian snacks and send us a pre-order request. We’ll come back to you with pricing, carton sizes and availability.',
  unit: { one: 'pack', many: 'packs' },
  businessTypes: ['Retail store / supermarket', 'Wholesaler / distributor', 'Restaurant / caterer', 'Online store', 'Other'],
  notesPlaceholder: 'Delivery timing, other products you are looking for, etc.',
  categories: [
    { id: 'mamara', name: 'Puffed rice snacks', blurb: 'Seasoned puffed rice (mamara), ready to eat.' },
    { id: 'namkeen', name: 'Namkeen & mixtures', blurb: 'Sev, gathiya, chavanu and chiwda, ready to eat.' },
    { id: 'fryums', name: 'Fryums (ready to fry)', blurb: 'Dried snack shapes with seasoning, fry before serving.' },
  ],
  products: [
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
  ],
  notes: [
    'A pre-order request is not a confirmed order. No payment is taken through this page.',
    'Prices, carton sizes, lead times and availability are confirmed when we contact you.',
    'All products are subject to supply, import clearance and applicable New Zealand requirements.',
    'Pack sizes and shelf life are indicative. Ingredient and allergen information is provided on request and on product labels. Some products contain or may contain peanuts, tree nuts, gluten or sesame.',
  ],
}
