// Private catalogue: equestrian tack and leather goods. Link: /c/leather-goods-9d7auk
// Product codes are Webfit's own reference codes, used on pre-order requests.

const SLUG = 'leather-goods-9d7auk'

const E = (id, code, name, colour, images = [`${id}.jpg`]) => ({
  id,
  code,
  name,
  category: 'equestrian',
  details: [['Code', code], ['Material', 'Leather'], ['Colour', colour], ['Sizes', 'On request']],
  images,
})

const L = (id, code, name, category, colours) => ({
  id,
  code,
  name,
  category,
  details: [['Code', code], ['Material', 'Genuine leather'], ['Colours', colours]],
  images: [`${id}.jpg`],
})

const STD5 = 'Black, Brown, Tobacco, Blue, Grey'
const STD4 = 'Grey, Tobacco, Blue, Brown'

export default {
  slug: SLUG,
  title: 'Leather Goods & Equestrian',
  metaTitle: 'Trade Catalogue: Leather Goods & Equestrian | Webfit Solutions Limited',
  eyebrow: 'Trade catalogue',
  heading: ['Leather goods & equestrian tack for ', 'New Zealand', ' retailers'],
  intro:
    'Browse leather bridles, girths and tack, plus bags, small leather goods, footwear and accessories. Send us a pre-order request and we’ll come back to you with pricing, minimum order quantities, sizes and lead times.',
  unit: { one: 'unit', many: 'units' },
  businessTypes: ['Saddlery / equestrian store', 'Fashion or leather goods retailer', 'Wholesaler / distributor', 'Online store', 'Other'],
  notesPlaceholder: 'Sizes (e.g. Pony/Cob/Full for bridles, girth lengths, shoe sizes), colours, delivery timing, etc.',
  categories: [
    { id: 'equestrian', name: 'Equestrian tack', blurb: 'Bridles, headcollars, girths and stirrup leathers.' },
    { id: 'gift-sets', name: 'Gift sets', blurb: 'Boxed leather combinations, ideal for corporate and retail gifting.' },
    { id: 'small-leather', name: 'Small leather goods', blurb: 'Clutches, card holders, passport holders, diary covers and folders.' },
    { id: 'handbags', name: 'Handbags', blurb: 'Hand bags, side bags, clutches, bucket bags and backpacks.' },
    { id: 'totes', name: 'Tote bags', blurb: 'Everyday and statement leather totes.' },
    { id: 'work-travel', name: 'Work & travel', blurb: 'Laptop bags, office bags, briefcases, sleeves and trolley cases.' },
    { id: 'apparel', name: 'Jackets & apparel', blurb: 'Men’s and women’s leather jackets and apparel.' },
    { id: 'footwear', name: 'Footwear', blurb: 'Formal shoes, loafers, slides and boots.' },
    { id: 'accessories', name: 'Accessories', blurb: 'Belts, pouches, key chains, cases and desk accessories.' },
  ],
  products: [
    // Equestrian (shown first)
    E('eq-crystal-browband-bridle', 'EQ-01', 'Crystal Browband Bridle', 'Black, red/black crystal browband'),
    E('eq-anatomical-bridle', 'EQ-02', 'Anatomical Bridle', 'Black'),
    E('eq-fancy-stitch-bridle', 'EQ-03', 'Fancy-Stitched Crank Bridle', 'Black'),
    E('eq-flash-bridle', 'EQ-04', 'Flash Bridle', 'Havana brown', ['eq-flash-bridle.jpg', 'eq-flash-bridle-2.jpg']),
    E('eq-padded-headcollar', 'EQ-05', 'Padded Headcollar', 'Havana brown'),
    E('eq-anatomical-girth-black', 'EQ-06', 'Anatomical Short Girth', 'Black'),
    E('eq-anatomical-girth-havana', 'EQ-07', 'Anatomical Short Girth, Fancy Stitch', 'Havana brown'),
    E('eq-stirrup-leathers', 'EQ-08', 'Stirrup Leathers (pair)', 'Black'),

    // Gift sets
    L('gs-file-folder-set', 'GS-01', 'File Folder Gift Set', 'gift-sets', STD5),
    L('gs-wallet-passport-set', 'GS-02', 'Wallet & Passport Holder Gift Set', 'gift-sets', STD5),
    L('gs-belt-wallet-set', 'GS-03', 'Belt & Wallet Gift Set', 'gift-sets', STD5),
    L('gs-clutch-glasses-set', 'GS-04', 'Clutch & Glasses Case Gift Set', 'gift-sets', STD5),
    L('gs-diary-clutch-set', 'GS-05', 'Diary & Clutch Gift Set', 'gift-sets', STD5),

    // Small leather goods
    L('sl-envelope-clutch', 'SL-01', 'Envelope Clutch', 'small-leather', STD4),
    L('sl-card-holder', 'SL-02', 'Card Holder', 'small-leather', STD4),
    L('sl-diary-cover', 'SL-03', 'Diary Cover', 'small-leather', STD4),
    L('sl-family-passport', 'SL-04', 'Family Passport Holder', 'small-leather', STD4),
    L('sl-glasses-case', 'SL-05', 'Glasses Case', 'small-leather', STD4),
    L('sl-file-folder', 'SL-06', 'File Folder', 'small-leather', STD4),

    // Handbags
    L('hb-structured-shopper', 'HB-01', 'Structured Shopper Hand Bag', 'handbags', 'All colours'),
    L('hb-colour-block', 'HB-02', 'Colour-Block Hand Bag', 'handbags', 'Mixed colours'),
    L('hb-croc-satchel', 'HB-03', 'Croc-Embossed Satchel', 'handbags', 'All colours'),
    L('hb-two-tone-bucket', 'HB-04', 'Two-Tone Bucket Crossbody', 'handbags', 'Blue/grey, black/grey'),
    L('hb-snake-panel', 'HB-05', 'Snake-Print Panel Hand Bag', 'handbags', 'Mixed colours'),
    L('hb-croc-bowling', 'HB-06', 'Croc-Embossed Bowling Bag', 'handbags', 'All colours'),
    L('hb-top-handle', 'HB-07', 'Top-Handle Hand Bag', 'handbags', 'All colours'),
    L('hb-multichain-pouch', 'HB-08', 'Multichain Pouch Bag', 'handbags', 'All colours'),
    L('hb-patterned-clutch', 'HB-09', 'Patterned Clutch', 'handbags', 'All colours'),
    L('hb-croc-chain-side', 'HB-10', 'Croc-Embossed Chain Side Bag', 'handbags', 'All colours'),
    L('hb-small-duffle', 'HB-11', 'Colour-Block Small Duffle Bag', 'handbags', 'All colours'),
    L('hb-side-bag', 'HB-12', 'Side Bag', 'handbags', 'All colours'),
    L('hb-slouch-hobo', 'HB-13', 'Slouch Hobo Bag', 'handbags', 'All colours'),
    L('hb-croc-structured', 'HB-14', 'Croc-Embossed Structured Hand Bag', 'handbags', 'Blue, Brown, Black, Red'),
    L('hb-floral-embossed', 'HB-15', 'Floral-Embossed Hand Bag', 'handbags', 'Green, Black, Brown'),
    L('hb-croc-flap', 'HB-16', 'Croc-Embossed Flap Bag', 'handbags', 'Black'),
    L('hb-handmade-crochet', 'HB-17', 'Handmade Crochet Bag', 'handbags', 'Black, Brown'),
    L('hb-handmade-basket', 'HB-18', 'Handmade Basket Bag', 'handbags', 'All colours'),
    L('hb-messenger', 'HB-19', 'Messenger Bag', 'handbags', 'All colours'),
    L('hb-backpack', 'HB-20', 'Backpack', 'handbags', 'Pink'),
    L('hb-bucket', 'HB-21', 'Bucket Bag', 'handbags', 'Brown, Black'),
    L('hb-dome', 'HB-22', 'Dome Hand Bag', 'handbags', 'Brown, Black'),

    // Totes
    L('tb-quilted', 'TB-01', 'Quilted Tote', 'totes', 'Black, Brown'),
    L('tb-classic', 'TB-02', 'Classic Tote', 'totes', 'All colours'),
    L('tb-croc-dark-brown', 'TB-03', 'Croc-Embossed Tote', 'totes', 'Dark brown'),
    L('tb-croc-large', 'TB-04', 'Croc-Embossed Tote, Large', 'totes', 'Black, Brown, Green'),
    L('tb-snake-print', 'TB-05', 'Snake-Print Tote', 'totes', 'Mixed colours'),

    // Work & travel
    L('wt-croc-laptop', 'WT-01', 'Croc-Texture Laptop Bag', 'work-travel', 'Olive green'),
    L('wt-laptop-olive', 'WT-02', 'Laptop Bag', 'work-travel', 'Olive green'),
    L('wt-laptop-tan', 'WT-03', 'Zip Laptop Bag', 'work-travel', 'Black, Tan'),
    L('wt-laptop-sleeve', 'WT-04', 'Laptop Sleeve', 'work-travel', 'Brown'),
    L('wt-office-bag', 'WT-05', 'Office Bag', 'work-travel', 'Brown'),
    L('wt-large-office-bag', 'WT-06', 'Large Office Bag', 'work-travel', 'Black'),
    L('wt-mini-laptop', 'WT-07', 'Mini Laptop Bag', 'work-travel', 'Brown, Tan'),
    L('wt-mini-laptop-print', 'WT-08', 'Mini Laptop Bag, Printed', 'work-travel', 'Printed finish'),
    L('wt-briefcase', 'WT-09', 'Briefcase Bag', 'work-travel', 'Mixed colours'),
    L('wt-trolley-croc', 'WT-10', 'Trolley Case, Croc-Embossed', 'work-travel', 'Blue, Brown, Black'),
    L('wt-trolley-pebble', 'WT-11', 'Trolley Case, Pebble Grain', 'work-travel', 'Blue, Brown, Black'),

    // Apparel
    L('ap-mens-jacket', 'AP-01', 'Men’s Leather Jacket', 'apparel', 'Black, Brown, Mehendi'),
    L('ap-mens-biker', 'AP-02', 'Men’s Biker Jacket', 'apparel', 'Black, Brown, Mehendi'),
    L('ap-womens-jacket', 'AP-03', 'Women’s Leather Jacket', 'apparel', 'Black, Brown'),
    L('ap-womens-croc-jacket', 'AP-04', 'Women’s Croc-Pattern Jacket', 'apparel', 'Brown'),
    L('ap-ladies-long-jacket', 'AP-05', 'Ladies’ Long Jacket', 'apparel', 'All colours'),
    L('ap-pencil-skirt', 'AP-06', 'Pencil Skirt', 'apparel', 'Red, Brown, Black'),

    // Footwear
    L('fw-monk-strap', 'FW-01', 'Monk Strap Shoes', 'footwear', 'Black'),
    L('fw-loafers', 'FW-02', 'Loafers', 'footwear', 'Brown, Dark brown, Black'),
    L('fw-casual-flats', 'FW-03', 'Women’s Casual Flats', 'footwear', 'On request'),
    L('fw-oxford', 'FW-04', 'Oxford Dress Shoes, Dual Texture', 'footwear', 'Tan, Brown'),
    L('fw-double-strap-slides', 'FW-05', 'Men’s Double-Strap Slides', 'footwear', 'Black'),
    L('fw-knee-boots', 'FW-06', 'Women’s Knee Boots', 'footwear', 'Brown'),
    L('fw-western-boots', 'FW-07', 'Western Boots', 'footwear', 'Brown'),
    L('fw-patent-derby', 'FW-08', 'Patent Derby Shoes', 'footwear', 'Black'),
    L('fw-open-toe-slides', 'FW-09', 'Open-Toe Slides', 'footwear', 'Brown, Black'),
    L('fw-fringe-boots', 'FW-10', 'Women’s Fringe Boots', 'footwear', 'Black'),
    L('fw-snow-boots', 'FW-11', 'Lined Snow Boots', 'footwear', 'Brown'),
    L('fw-double-monk', 'FW-12', 'Double Monk Strap Shoes', 'footwear', 'Tan'),
    L('fw-toe-ring-sandals', 'FW-13', 'Men’s Toe-Ring Sandals', 'footwear', 'Black'),
    L('fw-combat-boots', 'FW-14', 'Women’s Combat Boots', 'footwear', 'Black'),
    L('fw-ankle-boots', 'FW-15', 'Ankle Boots', 'footwear', 'Brown'),

    // Accessories
    L('ac-classic-belt', 'AC-01', 'Classic Belt', 'accessories', 'All colours'),
    L('ac-utility-pouch', 'AC-02', 'Utility Pouch', 'accessories', 'All colours'),
    L('ac-small-utility-pouch', 'AC-03', 'Small Utility Pouch', 'accessories', 'All colours'),
    L('ac-pencil-pouch', 'AC-04', 'Soft Pencil Pouch', 'accessories', 'All colours'),
    L('ac-hard-glasses-case', 'AC-05', 'Hard Glasses Case', 'accessories', 'Brown, Black'),
    L('ac-tassel-key-chain', 'AC-06', 'Tassel Key Chain', 'accessories', 'Mixed colours'),
    L('ac-star-key-chain', 'AC-07', 'Star Key Chain', 'accessories', 'Mixed colours'),
    L('ac-coaster-set', 'AC-08', 'Coaster Set', 'accessories', 'Black, Brown'),
    L('ac-pen-stand', 'AC-09', 'Pen Stand', 'accessories', 'Black'),
    L('ac-tissue-box', 'AC-10', 'Tissue Box Cover', 'accessories', 'Brown'),
  ],
  notes: [
    'A pre-order request is not a confirmed order. No payment is taken through this page.',
    'Prices, minimum order quantities, sizes, lead times and availability are confirmed when we contact you.',
    'Product specifications and colour options are as provided by the manufacturer. Photos are representative and colours may vary slightly.',
    'All products are subject to supply, import clearance and applicable New Zealand requirements.',
  ],
}
