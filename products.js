// =====================================================================
// THE DARK ARTS & HALLOWEEN BAZAAR - PRODUCT CATALOG
// Categories: Spooky Potions & Brews, Dark Arts & Curiosities,
//             Halloween Robes & Apparel, Eerie Decor
// =====================================================================

const PRODUCTS = [
  // ================= 🧪 SPOOKY POTIONS & BREWS =================
  {
    id: "potion-polyjuice-kit",
    name: "Master Potions: Polyjuice Potion Brewing Cauldron Kit",
    category: "potions",
    priceGalleons: 14.50,
    priceUSD: 72.50,
    priceCoins: 1450,
    starRating: 5.0,
    spookRating: 4,
    tag: "Advanced Potion Making",
    badgeClass: "badge-potter",
    house: "Slytherin",
    shortDesc: "Complete brewing apparatus: Size 2 Pewter Cauldron, fluxweed, lacewing flies, and ornate brass hourglass timer.",
    lore: "Allows the drinker to assume the physical form of another human being for exactly one hour. Requires 28 days of meticulous brewing under waxing lunar phases. Caution: Never attempt using hair of feline or beasts!",
    specs: ["Size 2 Pewter Cauldron with wooden stirring ladles", "6 Apothecary specimen jars (Lacewing flies, leech juice, bicorn horn)", "Instructional recipe scroll written by Libatius Borage"],
    reviews: [
      { author: "Hermione Granger", role: "Gryffindor", text: "Ensure you check the specimen under a magnifying glass first. Cat ears take weeks in the hospital wing." },
      { author: "Severus Snape", role: "Potions Master", text: "A delicate brew. Follow the instructions to the letter or face dreadful consequences." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="32" ry="10" fill="#047857" stroke="#065F46" stroke-width="2"/>
      <path d="M18 40 C16 75 35 84 50 84 C65 84 84 75 82 40 Z" fill="#374151" stroke="#1F2937" stroke-width="3"/>
      <circle cx="45" cy="38" r="4" fill="#34D399"/>
      <circle cx="58" cy="35" r="3" fill="#6EE7B7"/>
      <line x1="50" y1="40" x2="68" y2="15" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
      <circle cx="68" cy="15" r="4" fill="#B45309"/>
    </svg>`
  },
  {
    id: "potion-lupin-chocolate",
    name: "Professor Lupin's Anti-Dementor Calming Chocolate Slab",
    category: "potions",
    priceGalleons: 3.60,
    priceUSD: 18.00,
    priceCoins: 360,
    starRating: 5.0,
    spookRating: 2,
    tag: "Lupin's DADA Remedy",
    badgeClass: "badge-treat",
    house: "Gryffindor",
    shortDesc: "\"Eat it. You'll feel better. It's chocolate.\" Rich Honeydukes dark chocolate slab enriched with warming draughts and Patronus essence.",
    lore: "Handed out by Professor Remus Lupin on the Hogwarts Express to revive students after freezing Dementor encounters. Handcrafted by Honeydukes Sweetshop with 80% Peruvian dark cocoa and peace-draught essence to dispel despair.",
    specs: ["Net Wt: 300g (10.5 oz) solid block", "Effect: Dispels Dementor chills, nightmare chills, and autumn dread within 60 seconds", "Doctor's Note: Certified by Madam Pomfrey for hospital wing use"],
    reviews: [
      { author: "Professor Remus Lupin", role: "DADA Master", text: "Never board the Hogwarts Express without a slab in your robes. Effective against both soul-sucking fiends and dark October chills." },
      { author: "Harry Potter", role: "Auror", text: "The warmth spread to the tips of my fingers immediately. Truly life-saving." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="25" width="60" height="58" rx="3" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
      <rect x="25" y="15" width="50" height="50" rx="3" fill="#451A03" stroke="#291502" stroke-width="2"/>
      <line x1="25" y1="32" x2="75" y2="32" stroke="#291502" stroke-width="2"/>
      <line x1="25" y1="48" x2="75" y2="48" stroke="#291502" stroke-width="2"/>
      <line x1="50" y1="15" x2="50" y2="65" stroke="#291502" stroke-width="2"/>
      <rect x="24" y="55" width="52" height="24" rx="2" fill="#78350F" stroke="#FDE68A" stroke-width="1.5"/>
      <text x="50" y="66" font-family="'Cinzel', serif" font-size="5" font-weight="bold" fill="#FEF08A" text-anchor="middle">LUPIN'S HONEYDUKES</text>
      <text x="50" y="74" font-family="'Cinzel', serif" font-size="4.2" fill="#FDE68A" text-anchor="middle">ANTI-DEMENTOR CHOCOLATE</text>
      <circle cx="22" cy="18" r="2.5" fill="#FDE047"/>
      <circle cx="78" cy="14" r="3" fill="#F59E0B"/>
    </svg>`
  },
  {
    id: "potion-cauldron-cakes",
    name: "Bubbling Cauldron Cakes with Emerald Slime Core",
    category: "potions",
    priceGalleons: 4.80,
    priceUSD: 24.00,
    priceCoins: 480,
    starRating: 4.9,
    spookRating: 3,
    tag: "Bestseller",
    badgeClass: "badge-spooky",
    house: "Slytherin",
    shortDesc: "Miniature dark chocolate sponge cauldrons filled with neon emerald marshmallow lava that effervesces softly when bitten.",
    lore: "Baked in authentic miniature cast-iron cauldron molds, then injected with tangy lime-marshmallow elixir. Favored by potions masters with a secret craving for sweet treats.",
    specs: ["Box of 6 artisan mini cakes", "Flavor: Dark chocolate truffle & effervescent lime cream", "Effect: Tongue turns temporary phantom green for 2 hours"],
    reviews: [
      { author: "Severus Snape", role: "Potions Master", text: "Adequate viscosity. The balance of acid and cocoa is surprisingly acceptable." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="30" rx="36" ry="12" fill="#10B981" stroke="#059669" stroke-width="3"/>
      <circle cx="42" cy="27" r="4" fill="#6EE7B7"/>
      <circle cx="58" cy="25" r="5" fill="#A7F3D0"/>
      <path d="M14 30 Q12 75 50 82 Q88 75 86 30" fill="#1F2937" stroke="#111827" stroke-width="4"/>
      <rect x="25" y="78" width="8" height="12" rx="3" fill="#111827"/>
      <rect x="67" y="78" width="8" height="12" rx="3" fill="#111827"/>
    </svg>`
  },
  {
    id: "potion-bertie-botts",
    name: "Bertie Bott's Every Flavour Beans: Spooky Vault Edition",
    category: "potions",
    priceGalleons: 3.50,
    priceUSD: 17.50,
    priceCoins: 350,
    starRating: 4.7,
    spookRating: 4,
    tag: "Honeydukes Original",
    badgeClass: "badge-treat",
    house: "All",
    image: "treats_feature.jpg",
    shortDesc: "A hazard for every bite! Contains classic sweets plus Cursed Bat Wing, Tombstone Dirt, and Ghost Pepper.",
    lore: "Invented accidentally by Bertie Bott in 1935 when dirty socks fell into his sugar vat. This Halloween Special Vault edition includes 40 thrilling flavors: 20 sweet delights and 20 cursed dares.",
    specs: ["Net Wt: 250g (8.8 oz)", "Ingredients: Cane sugar, dragon tear glaze, natural flavorings, nightmare essence", "Allergen: Made in a facility handling crushed mandrake root"],
    reviews: [
      { author: "Ron Weasley", role: "Gryffindor", text: "George swore he found a bogey-flavored one that whistled. 10/10 Halloween essential!" }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 20 L75 20 L85 85 L15 85 Z" fill="#B91C1C" stroke="#FDE047" stroke-width="3"/>
      <rect x="28" y="42" width="44" height="24" rx="4" fill="#FEF08A" stroke="#7F1D1D" stroke-width="2"/>
      <text x="50" y="55" font-family="'Cinzel', serif" font-size="7" font-weight="bold" fill="#7F1D1D" text-anchor="middle">BERTIE BOTT'S</text>
      <text x="50" y="63" font-family="'Cinzel', serif" font-size="5" fill="#991B1B" text-anchor="middle">EVERY FLAVOUR</text>
      <circle cx="50" cy="15" r="7" fill="#F59E0B"/>
      <circle cx="36" cy="18" r="5" fill="#10B981"/>
      <circle cx="64" cy="17" r="6" fill="#8B5CF6"/>
    </svg>`
  },
  {
    id: "potion-draught-living-death",
    name: "Draught of Living Death (Apothecary Crystal Flacon)",
    category: "potions",
    priceGalleons: 9.80,
    priceUSD: 49.00,
    priceCoins: 980,
    starRating: 4.9,
    spookRating: 5,
    tag: "Dangerous Elixir",
    badgeClass: "badge-potter",
    house: "Slytherin",
    shortDesc: "Silvery pearlescent sleeping potion in cut-crystal flask. One drop induces deep, dreamless trance mimicking death.",
    lore: "Brewed with powdered root of asphodel infused into wormwood, sloths brain, and crushed sopophorous bean. Famous for rendering the drinker so deeply asleep that breath cannot mist a mirror.",
    specs: ["100ml Heavy cut crystal flacon with lead-free silver stopper", "Authentic recipe verified by the Half-Blood Prince", "Ages into a brilliant, lustrous pale lilac"],
    reviews: [
      { author: "Horace Slughorn", role: "Potions Master", text: "One drop would kill us all... or put us to sleep forever! Outstanding brewing technique." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 15 L55 15 L55 30 L68 50 L68 85 L32 85 L32 50 L45 30 Z" fill="#DDD6FE" stroke="#8B5CF6" stroke-width="2.5"/>
      <ellipse cx="50" cy="85" rx="18" ry="6" fill="#7C3AED"/>
      <circle cx="50" cy="12" r="6" fill="#C084FC" stroke="#7C3AED" stroke-width="1.5"/>
      <path d="M38 58 Q50 64 62 58 Q50 78 38 58" fill="#A78BFA"/>
      <line x1="36" y1="50" x2="64" y2="50" stroke="#C4B5FD" stroke-width="1.5"/>
    </svg>`
  },

  // ================= ⚡ DARK ARTS & CURIOSITIES =================
  {
    id: "darkarts-elder-wand",
    name: "The Elder Wand (Deathly Hallows Master Edition)",
    category: "darkarts",
    priceGalleons: 18.00,
    priceUSD: 90.00,
    priceCoins: 1800,
    starRating: 5.0,
    spookRating: 4,
    tag: "Master of Death",
    badgeClass: "badge-potter",
    house: "All",
    image: "hero.jpg",
    shortDesc: "15 inches, elder wood with Thestral tail hair core. Faithful artisan reproduction with carved cluster nodes and velvet Ollivanders box.",
    lore: "The most powerful wand in wizarding history, created by Death himself according to the Tale of the Three Brothers. Capable of performing spells that would otherwise be deemed impossible.",
    specs: ["Length: 15 inches exact scale", "Core Material: Cold-cast porcelain with weighted steel core", "Packaging: Ollivanders satin-lined presentation case with gold foil certificate"],
    reviews: [
      { author: "Garrick Ollivander", role: "Wandmaker", text: "An unruly instrument... curious indeed. The node balance is undeniably masterful." },
      { author: "Harry Potter", role: "Auror", text: "Feels just as it did in Dumbledore's office. Treat it with immense respect." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="88" y1="12" x2="12" y2="88" stroke="#451A03" stroke-width="4" stroke-linecap="round"/>
      <circle cx="28" cy="72" r="5" fill="#78350F" stroke="#292524" stroke-width="1.5"/>
      <circle cx="44" cy="56" r="4.5" fill="#78350F" stroke="#292524" stroke-width="1.5"/>
      <circle cx="58" cy="42" r="4" fill="#78350F" stroke="#292524" stroke-width="1.5"/>
      <circle cx="70" cy="30" r="3.5" fill="#78350F" stroke="#292524" stroke-width="1.5"/>
      <circle cx="88" cy="12" r="5" fill="#60A5FA" opacity="0.8"/>
      <line x1="88" y1="12" x2="94" y2="6" stroke="#93C5FD" stroke-width="2"/>
    </svg>`
  },
  {
    id: "darkarts-boggart-wardrobe",
    name: "The Rattling Boggart Wardrobe (Interactive Keepsake)",
    category: "darkarts",
    priceGalleons: 13.50,
    priceUSD: 67.50,
    priceCoins: 1350,
    starRating: 4.9,
    spookRating: 5,
    tag: "Lupin's Classroom Relic",
    badgeClass: "badge-spooky",
    house: "All",
    shortDesc: "Enchanted mahogany staffroom wardrobe that rattles violently on your desk. Shouts of 'Riddikulus!' banish fears with hilarious laughter!",
    lore: "Replica of the Defense Against the Dark Arts staffroom wardrobe used by Professor Lupin to teach the Boggart-Banishing charm. Features touch & sound activation: tap it to hear frantic banging, then cast 'Riddikulus!' to turn fear into comedy.",
    specs: ["Height: 11 inches solid carved mahogany & antiqued brass hinges", "Internal kinetic shaker mechanism with authentic rattling sound FX", "Spell Sensor: Responds to 'Riddikulus' command with hilarious victory sound"],
    reviews: [
      { author: "Neville Longbottom", role: "Herbology Professor", text: "With Professor Lupin's gentle guidance, my Boggart became Professor Snape in my grandmother's vulture hat. Splendid!" },
      { author: "Professor Remus Lupin", role: "DADA Master", text: "The shape-shifter feeds on terror, but cannot withstand pure laughter. An indispensable study aid." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,12 85,22 15,22" fill="#593009" stroke="#381D03" stroke-width="2.5"/>
      <rect x="20" y="22" width="60" height="66" rx="2" fill="#783F04" stroke="#381D03" stroke-width="3"/>
      <line x1="50" y1="22" x2="50" y2="88" stroke="#381D03" stroke-width="2.5"/>
      <rect x="24" y="28" width="22" height="26" fill="#593009" stroke="#381D03" stroke-width="1.5"/>
      <rect x="54" y="28" width="22" height="26" fill="#593009" stroke="#381D03" stroke-width="1.5"/>
      <circle cx="47" cy="46" r="2.5" fill="#EF4444"/>
      <circle cx="53" cy="46" r="2.5" fill="#EF4444"/>
      <circle cx="46" cy="56" r="2.5" fill="#F59E0B"/>
      <circle cx="54" cy="56" r="2.5" fill="#F59E0B"/>
    </svg>`
  },
  {
    id: "darkarts-resurrection-stone-ring",
    name: "The Marvolo Gaunt Resurrection Stone Ring",
    category: "darkarts",
    priceGalleons: 15.00,
    priceUSD: 75.00,
    priceCoins: 1500,
    starRating: 4.8,
    spookRating: 5,
    tag: "Deathly Hallow",
    badgeClass: "badge-potter",
    house: "Slytherin",
    shortDesc: "Ancient cracked black diamond intaglio engraved with the Deathly Hallows sigil, set in cursed tarnished serpent gold.",
    lore: "The second Hallow of legend, once passed down through the Gaunt family. Legend claims turning it thrice in hand summons spirits of the deceased from beyond the veil.",
    specs: ["Stone: Lab-grown deep obsidian gemstone with micro-engraving", "Band: Antiqued heavy sterling silver with 18k gold wash", "Comes in a black velvet reliquary box"],
    reviews: [
      { author: "Albus Dumbledore", role: "Headmaster", text: "A tempting relic, but remember... the dead do not belong among the living. Handle with utmost caution." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="62" r="24" stroke="#D97706" stroke-width="6" fill="none"/>
      <polygon points="50,22 68,36 50,50 32,36" fill="#18181B" stroke="#B45309" stroke-width="3"/>
      <polygon points="50,26 62,44 38,44" stroke="#FDE68A" stroke-width="1.5" fill="none"/>
      <line x1="50" y1="26" x2="50" y2="44" stroke="#FDE68A" stroke-width="1.5"/>
      <circle cx="50" cy="38" r="4" stroke="#FDE68A" stroke-width="1" fill="none"/>
    </svg>`
  },
  {
    id: "darkarts-crawling-hand",
    name: "The Creeping Severed Hand Desk Familiar",
    category: "darkarts",
    priceGalleons: 8.90,
    priceUSD: 44.50,
    priceCoins: 890,
    starRating: 4.7,
    spookRating: 4,
    tag: "Animatronic Familiar",
    badgeClass: "badge-spooky",
    house: "All",
    shortDesc: "Life-sized realistic severed hand that scuttles across your table to deliver your mail or fetch your quill.",
    lore: "Once belonging to an unpunctual Knockturn Alley clerk. Perfectly animated with kinetic charms. Taps its index finger when you receive new owl post or need to take a study break.",
    specs: ["Material: Medical-grade silicone & clockwork brass tendons", "Movement Modes: Wander, Guard Desk, High-Five, Rest", "Charges via full moonlight or USB-C spell port"],
    reviews: [
      { author: "Wednesday Addams", role: "Nevermore Academy", text: "Thing gave it a hearty thumbs up. Excellent conversationalist." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 65 L30 85 L70 85 L70 65" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
      <rect x="28" y="82" width="44" height="8" rx="2" fill="#7F1D1D"/>
      <path d="M30 65 C25 50 25 35 30 25 C33 25 36 35 37 50" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round"/>
      <path d="M40 60 C38 40 40 20 45 18 C48 20 48 38 48 58" stroke="#E2E8F0" stroke-width="6" stroke-linecap="round"/>
      <path d="M52 60 C52 40 54 22 58 20 C61 22 60 40 59 58" stroke="#CBD5E1" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M63 62 C65 48 68 32 72 32 C75 34 72 48 70 60" stroke="#E2E8F0" stroke-width="5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "darkarts-spirit-board",
    name: "Nocturne Spirit Board & Velvet Seance Tarot",
    category: "darkarts",
    priceGalleons: 7.20,
    priceUSD: 36.00,
    priceCoins: 720,
    starRating: 4.8,
    spookRating: 4,
    tag: "Divination Tool",
    badgeClass: "badge-potter",
    house: "Ravenclaw",
    shortDesc: "Antique walnut spirit board with bone planchette and matching 78-card gold-gilded Victorian divination deck.",
    lore: "Endorsed by Professor Trelawney during a rare moment of lucidity. The brass-inlaid planchette glides effortlessly over engraved lunar phases and celestial alphabets.",
    specs: ["Includes 15\" Solid Walnut Board & Heart-Shaped Planchette", "78 Tarot Cards with metallic midnight purple edges", "Silk embroidered drawstring pouch included"],
    reviews: [
      { author: "Sybill Trelawney", role: "Divination Professor", text: "My Inner Eye vibrated with prophetic clarity within moments of laying the deck. Beware of dark strangers with candy!" }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="70" height="60" rx="6" fill="#2E1065" stroke="#F59E0B" stroke-width="3"/>
      <circle cx="26" cy="32" r="5" fill="#F59E0B"/>
      <path d="M74 28 C71 31 71 35 74 38 C72 37 70 35 70 33 C70 30 72 29 74 28 Z" fill="#FDE047"/>
      <path d="M26 50 Q50 35 74 50" fill="none" stroke="#FBBF24" stroke-width="2"/>
      <text x="50" y="44" font-family="'Cinzel', serif" font-size="6" font-weight="bold" fill="#FDE047" text-anchor="middle">YES   NO</text>
      <polygon points="50,56 42,70 58,70" fill="#FEF3C7" stroke="#92400E" stroke-width="1.5"/>
    </svg>`
  },

  // ================= 🧙‍♂️ HALLOWEEN ROBES & APPAREL =================
  {
    id: "apparel-sorting-hat",
    name: "The Hogwarts Sorting Hat (Voice-Interactive Animatronic)",
    category: "apparel",
    priceGalleons: 22.50,
    priceUSD: 112.50,
    priceCoins: 2250,
    starRating: 5.0,
    spookRating: 3,
    tag: "Legendary Relic",
    badgeClass: "badge-potter",
    house: "All",
    shortDesc: "Distressed faux-leather enchanted wizard hat with motorized facial grimaces and genuine sorting speeches.",
    lore: "Once belonging to Godric Gryffindor, the Sorting Hat has peered into young wizards' minds for a millennium. Place it upon your head to hear its rumbling deliberations before announcing your true destiny.",
    specs: ["Material: Weathered antiqued suede & brass wire armature", "Features: Animated mouth movement and 12 distinct audio house deliberations", "Fits child through adult wizard heads comfortably"],
    reviews: [
      { author: "Minerva McGonagall", role: "Headmistress", text: "The Sorting Hat never errs. Even in your muggle living room, its judgment is final." },
      { author: "Neville Longbottom", role: "Herbology Professor", text: "Told me I had bravery when I was terrified. Truly magical." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="82" rx="42" ry="12" fill="#593009" stroke="#381D03" stroke-width="3"/>
      <path d="M18 82 C22 65 30 50 38 42 C40 32 44 20 48 12 C52 16 58 18 64 24 C68 35 68 50 72 65 C76 75 80 80 82 82 Z" fill="#783F04" stroke="#381D03" stroke-width="3"/>
      <path d="M36 50 Q44 54 48 48" stroke="#291502" stroke-width="3" stroke-linecap="round"/>
      <path d="M54 48 Q58 54 66 50" stroke="#291502" stroke-width="3" stroke-linecap="round"/>
      <path d="M38 68 Q52 75 64 68 Q52 70 38 68" fill="#1C0E01" stroke="#291502" stroke-width="2"/>
    </svg>`
  },
  {
    id: "apparel-house-scarf-bundle",
    name: "Hogwarts Crest Lambswool Winter Scarf & Beanie",
    category: "apparel",
    priceGalleons: 6.50,
    priceUSD: 32.50,
    priceCoins: 650,
    starRating: 4.9,
    spookRating: 1,
    tag: "House Pride",
    badgeClass: "badge-potter",
    house: "All",
    shortDesc: "100% Scottish lambswool knit scarf in official Gryffindor, Slytherin, Ravenclaw, or Hufflepuff regalia with embroidered crest.",
    lore: "Guaranteed to ward off icy Dementor chills during bitter Quidditch tournaments. Double-layered weave with authentic house heraldry stitched with metallic thread.",
    specs: ["Length: 78 inches with 3-inch tassel fringe", "Material: 100% Ultra-soft Scottish Lambswool", "Available Houses: Gryffindor, Slytherin, Ravenclaw, Hufflepuff"],
    reviews: [
      { author: "Ginny Weasley", role: "Holyhead Harpies", text: "So warm, even during blizzard training sessions. The crest is crisp and bright." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 35 C25 22 75 22 75 35 C75 52 25 52 25 35 Z" fill="#991B1B" stroke="#7F1D1D" stroke-width="3"/>
      <path d="M42 24 L48 45 M58 24 L64 45" stroke="#FBBF24" stroke-width="4"/>
      <rect x="32" y="44" width="16" height="42" fill="#991B1B" stroke="#7F1D1D" stroke-width="2"/>
      <rect x="32" y="56" width="16" height="8" fill="#FBBF24"/>
      <rect x="32" y="74" width="16" height="8" fill="#FBBF24"/>
    </svg>`
  },
  {
    id: "apparel-time-turner",
    name: "Hermione's Ministry-Certified Time-Turner Necklace",
    category: "apparel",
    priceGalleons: 7.90,
    priceUSD: 39.50,
    priceCoins: 790,
    starRating: 5.0,
    spookRating: 2,
    tag: "Ministry Approved",
    badgeClass: "badge-potter",
    house: "Gryffindor",
    shortDesc: "Rotating concentric gold rings housing a miniature functional hourglass filled with sparkling starlight sand.",
    lore: "'I mark the hours, every one, Nor have I yet outrun the Sun.' Three full turns backwards grants you exactly three hours to re-study for your O.W.L.s or prevent disastrous events.",
    specs: ["Material: Gold-plated alloy with scratch-resistant quartz glass", "Chain: 28-inch matching link necklace", "Engraving: Full Ministry of Magic Department of Mysteries seal"],
    reviews: [
      { author: "Hermione Granger", role: "Minister for Magic", text: "Extremely useful for taking double the classes, though I don't advise interfering with past events." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="38" stroke="#F59E0B" stroke-width="4" fill="none"/>
      <circle cx="50" cy="50" r="28" stroke="#D97706" stroke-width="3" fill="none"/>
      <circle cx="50" cy="50" r="18" stroke="#FDE68A" stroke-width="2.5" fill="none"/>
      <polygon points="44,38 56,38 52,50 56,62 44,62 48,50" fill="#93C5FD" stroke="#1E3A8A" stroke-width="1" opacity="0.8"/>
      <circle cx="50" cy="58" r="3" fill="#F59E0B"/>
    </svg>`
  },
  {
    id: "apparel-invisibility-cloak",
    name: "The Cloak of Invisibility (Hallows Silk Shimmer Robe)",
    category: "apparel",
    priceGalleons: 24.00,
    priceUSD: 120.00,
    priceCoins: 2400,
    starRating: 5.0,
    spookRating: 3,
    tag: "Third Deathly Hallow",
    badgeClass: "badge-potter",
    house: "Gryffindor",
    shortDesc: "Fluid gossamer silver cloak that reflects ambient light, creating optical active camouflage illusions.",
    lore: "The third Hallow created by Death, passed down from Ignotus Peverell to James and Harry Potter. Never fades with time, immune to revealing spells, and light as spun moonlight.",
    specs: ["Material: Multi-refractive liquid-silver microfiber weave", "Length: 62 inches floor-length with deep velvet hood", "Antiqued silver clasp shaped like the Deathly Hallows sign"],
    reviews: [
      { author: "Harry Potter", role: "Auror", text: "Saved my life more times than I can count. Ideal for midnight visits to the library or kitchen." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 18 C38 18 25 32 20 60 C18 78 22 88 28 90 L50 86 L72 90 C78 88 82 78 80 60 C75 32 62 18 50 18 Z" fill="#E2E8F0" fill-opacity="0.75" stroke="#94A3B8" stroke-width="2"/>
      <path d="M50 18 C44 26 42 36 42 44 C46 48 54 48 58 44 C58 36 56 26 50 18 Z" fill="#CBD5E1"/>
      <circle cx="50" cy="46" r="3" fill="#F59E0B"/>
      <path d="M30 60 Q50 72 70 60" stroke="#F8FAFC" stroke-width="2" fill="none" opacity="0.6"/>
    </svg>`
  },

  // ================= 🎃 EERIE DECOR =================
  {
    id: "decor-skull-lantern",
    name: "Screaming Banshee Jack-o'-Lantern Skull Lamp",
    category: "decor",
    priceGalleons: 9.50,
    priceUSD: 47.50,
    priceCoins: 950,
    starRating: 4.9,
    spookRating: 5,
    tag: "Haunted Relic",
    badgeClass: "badge-spooky",
    house: "All",
    shortDesc: "Cast-resin antique skull fused with pumpkin vines. Pulses with unearthly spectral flame and whispers at dusk.",
    lore: "Forged in the haunted bog lands beyond the Forbidden Forest. Housing a harmless bound will-o'-the-wisp, this lantern automatically flares into an ethereal green flame whenever a ghost passes.",
    specs: ["Height: 12 inches (30 cm)", "Light Source: Enchanted eternal LED flame (fueled by ambient twilight)", "Sound Sensor: Emits a soft spectral moan when doors open"],
    reviews: [
      { author: "Nearly Headless Nick", role: "Resident Ghost", text: "Illuminates the dungeons wonderfully for our 500th Deathday party." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C25 15 15 35 15 55 C15 72 30 85 40 85 L40 92 L60 92 L60 85 C70 85 85 72 85 55 C85 35 75 15 50 15 Z" fill="#EA580C" stroke="#7C2D12" stroke-width="3"/>
      <polygon points="32,45 42,42 38,55" fill="#4ADE80"/>
      <polygon points="68,45 58,42 62,55" fill="#4ADE80"/>
      <polygon points="50,56 45,64 55,64" fill="#4ADE80"/>
      <path d="M30 72 L35 78 L40 72 L45 78 L50 72 L55 78 L60 72 L65 78 L70 72" stroke="#4ADE80" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "decor-golden-snitch",
    name: "Levitating Magnetic Golden Snitch & Display Stand",
    category: "decor",
    priceGalleons: 16.50,
    priceUSD: 82.50,
    priceCoins: 1650,
    starRating: 5.0,
    spookRating: 1,
    tag: "High Sorcery Tech",
    badgeClass: "badge-potter",
    house: "Gryffindor",
    shortDesc: "24K electroplated golden sphere that floats and rotates silently in mid-air above an illuminated plinth.",
    lore: "Snitches possess flesh memories! This model features delicate filigree wings that flutter gently as it floats suspended by invisible electromagnetic levitation charms.",
    specs: ["Core: 24K Gold-dipped alloy with mechanical feather wings", "Base: Dark mahogany finish with illuminated Quidditch glyphs", "Power: Silent electromagnetic repulsion field"],
    reviews: [
      { author: "Oliver Wood", role: "Quidditch Captain", text: "Clean catch! Watching this hover on my desk makes me want to grab my broom." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="85" rx="30" ry="8" fill="#451A03" stroke="#F59E0B" stroke-width="2"/>
      <path d="M42 48 C25 35 10 40 5 35 C15 48 30 52 42 52 Z" fill="#FDE68A" stroke="#D97706" stroke-width="1.5"/>
      <path d="M58 48 C75 35 90 40 95 35 C85 48 70 52 58 52 Z" fill="#FDE68A" stroke="#D97706" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="14" fill="#F59E0B" stroke="#B45309" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: "decor-ghost-jar",
    name: "Captured Phantom in an Apothecary Bell Jar",
    category: "decor",
    priceGalleons: 11.00,
    priceUSD: 55.00,
    priceCoins: 1100,
    starRating: 4.8,
    spookRating: 5,
    tag: "Collector's Item",
    badgeClass: "badge-spooky",
    house: "Ravenclaw",
    shortDesc: "A gentle mist phantom sealed within blown borosilicate glass with vintage brass filigree base.",
    lore: "Discovered floating in the Ravenclaw astronomy tower. The captured wisp responds to taps on the glass by swirling in luminous violet whirlpools and humming ethereal lullabies.",
    specs: ["Dimensions: 8\" x 5\" Apothecary Dome", "Seal: Airtight beeswax & silver warding rune", "Care: Expose to starlight once per lunar month"],
    reviews: [
      { author: "Luna Lovegood", role: "Ravenclaw", text: "The Wrackspurts don't dare come near it. It hums the most delightful tunes." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 85 L25 40 C25 20 75 20 75 40 L75 85 Z" fill="#6366F1" fill-opacity="0.1" stroke="#A5B4FC" stroke-width="3"/>
      <circle cx="50" cy="18" r="6" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
      <rect x="18" y="85" width="64" height="10" rx="3" fill="#78350F" stroke="#451A03" stroke-width="2"/>
      <path d="M50 35 C42 35 38 42 38 52 C38 60 42 66 45 68 C48 64 52 64 55 68 C58 64 62 60 62 52 C62 42 58 35 50 35 Z" fill="#E0E7FF" fill-opacity="0.8"/>
      <circle cx="46" cy="45" r="2.5" fill="#1E1B4B"/>
      <circle cx="54" cy="45" r="2.5" fill="#1E1B4B"/>
    </svg>`
  },
  {
    id: "decor-cauldron-fogger",
    name: "Alchemist's Ultrasonic Violet Fog Cauldron",
    category: "decor",
    priceGalleons: 12.50,
    priceUSD: 62.50,
    priceCoins: 1250,
    starRating: 4.8,
    spookRating: 3,
    tag: "Atmospheric Decor",
    badgeClass: "badge-spooky",
    house: "All",
    shortDesc: "Desktop cast-iron cauldron with ultrasonic transducer generating billowing cold purple & green mist.",
    lore: "Transform any room into a brooding 17th-century dungeon laboratory. Uses safe ultrasonic vibrations with integrated color-cycling LEDs to produce cascading witch's brew vapors.",
    specs: ["Capacity: 1.2 Liters clean water", "Auto-shutoff when water level runs dry", "Adjustable 7-color ambient magical lighting spectrum"],
    reviews: [
      { author: "Argus Filch", role: "Caretaker", text: "Leaves no stains on the flagstones. Satisfactory." }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 20 Q40 5 50 15 Q60 5 70 20 Q80 10 85 25" stroke="#C084FC" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
      <ellipse cx="50" cy="35" rx="35" ry="10" fill="#4B5563" stroke="#1F2937" stroke-width="3"/>
      <path d="M15 35 Q10 80 50 85 Q90 80 85 35 Z" fill="#111827" stroke="#030712" stroke-width="3"/>
      <ellipse cx="50" cy="35" rx="28" ry="6" fill="#8B5CF6"/>
    </svg>`
  },
  {
    id: "decor-marauders-map",
    name: "The Marauder's Interactive Footstep Tapestry",
    category: "decor",
    priceGalleons: 9.80,
    priceUSD: 49.00,
    priceCoins: 980,
    starRating: 5.0,
    spookRating: 3,
    tag: "Mischief Managed",
    badgeClass: "badge-potter",
    house: "Gryffindor",
    shortDesc: "Massive antiqued parchment folding map with touch-sensitive invisible ink that illuminates moving footsteps.",
    lore: "'Messrs Moony, Wormtail, Padfoot, and Prongs Purveyors of Aids to Magical Mischief-Makers are proud to present the Marauder's Map.' Tap the parchment with your wand tip to reveal every corridor.",
    specs: ["Dimensions: 72\" x 30\" when unfolded", "Paper: Heavyweight archival cotton rag paper with distressed deckled edges", "Features: 4 secret foldout passageway panels to Honeydukes"],
    reviews: [
      { author: "George Weasley", role: "Weasleys' Wizard Wheezes", text: "We owe our entire career to this sacred piece of parchment. Mischief managed!" }
    ],
    svgIcon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="15" width="60" height="70" rx="3" fill="#FEF3C7" stroke="#92400E" stroke-width="3"/>
      <polygon points="50,22 40,32 60,32" fill="#78350F"/>
      <rect x="42" y="32" width="16" height="20" fill="#B45309"/>
      <rect x="25" y="56" width="50" height="12" fill="#FDE68A" stroke="#78350F" stroke-width="1"/>
      <text x="50" y="64" font-family="'Cinzel', serif" font-size="5" font-weight="bold" fill="#78350F" text-anchor="middle">MARAUDER'S MAP</text>
      <ellipse cx="36" cy="74" rx="2" ry="3" fill="#991B1B"/>
      <ellipse cx="44" cy="78" rx="2" ry="3" fill="#991B1B"/>
    </svg>`
  }
];

// House quiz questions
const SORTING_QUIZ = [
  {
    question: "When night falls upon Halloween, where would one find you?",
    options: [
      { text: "Leading an expedition into the Forbidden Forest with only a wand", house: "Gryffindor" },
      { text: "In the Restricted Section deciphering forbidden dark transfiguration scrolls", house: "Ravenclaw" },
      { text: "Bargaining with vampires in Knockturn Alley for rare dark relics", house: "Slytherin" },
      { text: "Baking pumpkin pasties by the warm common room hearth for everyone", house: "Hufflepuff" }
    ]
  },
  {
    question: "Pick your Halloween familiar companion:",
    options: [
      { text: "A fearless Golden Gryphon with razor talons", house: "Gryffindor" },
      { text: "An all-seeing Barn Owl with eyes that pierce the spirit realm", house: "Ravenclaw" },
      { text: "An emerald Horned Serpent with venom that turns to gold", house: "Slytherin" },
      { text: "A loyal Ghost Badger that finds lost enchanted candy", house: "Hufflepuff" }
    ]
  },
  {
    question: "Which magical relic tempts your ambition the most?",
    options: [
      { text: "The Sword of Gryffindor that only answers the brave", house: "Gryffindor" },
      { text: "Ravenclaw's Lost Diadem granting infinite wisdom", house: "Ravenclaw" },
      { text: "Slytherin's Cursed Locket commanding shadows and power", house: "Slytherin" },
      { text: "Hufflepuff's Cauldron Cup that never empties of warm butterbeer", house: "Hufflepuff" }
    ]
  }
];

// Spells database for interactive Wand Spell Caster
const SPELLS = {
  lumos: {
    name: "Lumos Maxima!",
    desc: "A dazzling sphere of radiant light illuminates the emporium!",
    effect: "light"
  },
  nox: {
    name: "Nox!",
    desc: "The light extinguishes. Shadows swallow the emporium.",
    effect: "dark"
  },
  incendio: {
    name: "Incendio!",
    desc: "A roaring burst of pumpkin fire embers crackles through the air!",
    effect: "fire"
  },
  aguamenti: {
    name: "Aguamenti!",
    desc: "A torrent of crystalline bubbles ripples across the cauldron!",
    effect: "water"
  },
  alohomora: {
    name: "Alohomora!",
    desc: "Secret lock broken! Secret Promo Code unlocked: 'ALOHOMORA' for Free Owl Post Delivery!",
    effect: "unlock"
  },
  patronum: {
    name: "Expecto Patronum!",
    desc: "A shimmering silver patronus mist gallops across your screen!",
    effect: "patronus"
  },
  riddikulus: {
    name: "Riddikulus!",
    desc: "The terrifying Boggart turns into clown roller-skates and explodes into bursts of laughter!",
    effect: "riddikulus"
  }
};
