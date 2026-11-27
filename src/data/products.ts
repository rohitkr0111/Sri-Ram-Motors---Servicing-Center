import { Product } from '../types';

export const sampleProducts: Product[] = [
  // --- ENGINE & MECHANICAL ---
  {
    id: 'prod-eng-001',
    slug: 'hero-splendor-piston-kit-std',
    name: 'Standard 50mm Piston & Ring Kit',
    description: 'High-thermal tolerance alloy piston kit complete with compression rings, oil scraper ring, gudgeon pin, and circlips. Precision cast for optimal combustion sealing and minimal friction.',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145651?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562976540-1502c2145651?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ENG-PST-050-SPL',
    brand: 'Hero',
    compatibleModels: ['Hero Splendor Plus (100cc)', 'Hero HF Deluxe', 'Hero Passion Pro'],
    category: 'Engine & Mechanical',
    manufacturer: 'OEM Supplier Grade',
    price: 850,
    originalPrice: 1050,
    stockStatus: 'in-stock',
    featured: true,
    badge: 'Popular OEM Fit',
    specifications: {
      'Bore Diameter': '50.00 mm (STD)',
      'Material': 'Forged Aluminum Alloy',
      'Pin Diameter': '13 mm',
      'Surface Treatment': 'Graphite Skirt Coating',
      'Package Contents': '1 Piston, 1 Ring Set, 1 Pin, 2 Circlips'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-eng-002',
    slug: 'bajaj-pulsar-150-cylinder-block-kit',
    name: 'Cylinder Block & Piston Assembly 57mm',
    description: 'Precision bored cylinder block with pre-honed cast iron sleeve and matched piston assembly. Delivers smooth compression, leak-free head mating, and high wear resistance under heavy city traffic loads.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562976540-1502c2145651?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ENG-CYL-150-PLS',
    brand: 'Bajaj',
    compatibleModels: ['Bajaj Pulsar 150'],
    category: 'Engine & Mechanical',
    manufacturer: 'Endurance Tech Spec',
    price: 2450,
    originalPrice: 2890,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Displacement': '149.5 cc',
      'Cylinder Sleeve': 'Centrifugally Cast Iron',
      'Cooling Type': 'Air-Cooled Fin Matrix',
      'Weight': '3.4 kg',
      'Includes': 'Block, Piston, Gaskets, Rings'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-eng-003',
    slug: 'royal-enfield-classic-350-heavy-clutch-plates',
    name: 'Heavy Duty Cork Friction Clutch Plate Set',
    description: 'Set of high-friction clutch friction plates designed to prevent slip under high torque delivery. Made from temperature-resistant organic-kevlar cork matrix for crisp gear engagement.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ENG-CLT-350-RE',
    brand: 'Royal Enfield',
    compatibleModels: ['Royal Enfield Classic 350 Reborn', 'Royal Enfield Bullet 350', 'Royal Enfield Meteor 350', 'Royal Enfield Hunter 350'],
    category: 'Engine & Mechanical',
    manufacturer: 'Makino Friction Components',
    price: 1250,
    originalPrice: 1450,
    stockStatus: 'in-stock',
    featured: true,
    badge: 'High Torque',
    specifications: {
      'Plates Count': '7 Friction Discs + 6 Steel Plates',
      'Material': 'Reinforced Kevlar-Cellulose',
      'Application': 'Wet Multi-plate Clutch',
      'Heat Resistance': 'Up to 280°C'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-eng-004',
    slug: 'ngk-iridium-spark-plug-cpr8ea-9',
    name: 'High Performance Iridium IX Spark Plug CPR8EA-9',
    description: 'Ultra-fine 0.6mm laser-welded iridium tip spark plug. Provides instantaneous ignition response, prevents spark fouling, lowers electrical demand on the ignition coil, and improves fuel burn efficiency.',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ENG-SPK-IR-08',
    brand: 'Yamaha',
    compatibleModels: ['Yamaha YZF-R15 V3 / V4', 'Yamaha MT-15 V1 / V2', 'Honda Hornet 2.0', 'TVS Apache RTR 160 4V', 'KTM Duke 200'],
    category: 'Engine & Mechanical',
    manufacturer: 'NGK Spark Plugs Co.',
    price: 680,
    originalPrice: 799,
    stockStatus: 'in-stock',
    featured: true,
    badge: 'Performance Upgrade',
    specifications: {
      'Center Electrode': '0.6mm Laser Iridium',
      'Thread Size': '10mm',
      'Hex Size': '16mm',
      'Heat Range': '8',
      'Resistor': '5k Ohm'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-eng-005',
    slug: 'bajaj-pulsar-ns200-timing-chain-tensioner-kit',
    name: 'Camshaft Timing Chain & Silent Tensioner Kit',
    description: 'Endurance grade pre-stretched roller timing chain and hydraulic silent ratchet tensioner. Eliminates valve rattle, keeps ignition timing sharp, and prevents cam timing jumps.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ENG-TIM-200-NS',
    brand: 'Bajaj',
    compatibleModels: ['Bajaj Pulsar NS200', 'Bajaj Pulsar 220F', 'Bajaj Dominar 400'],
    category: 'Engine & Mechanical',
    manufacturer: 'Rolon High Precision',
    price: 980,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Links': '96 Links Pre-stretched',
      'Chain Type': 'Silent Cam Chain',
      'Tensioner Type': 'Mechanical Ratchet with O-Ring',
      'Material': 'Hardened Alloy Steel'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-eng-006',
    slug: 'ktm-duke-high-flow-oil-filter',
    name: 'Magnetic Micro-Filtration Oil Filter Element',
    description: 'High-density synthetic micro-glass filtration medium designed for high-RPM high-temperature liquid-cooled engines. Catches sub-micron particulate without causing oil pressure drops.',
    image: 'https://images.unsplash.com/photo-1558618047-f89a8d2c50a2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618047-f89a8d2c50a2?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ENG-FLT-KTM-03',
    brand: 'KTM',
    compatibleModels: ['KTM Duke 200', 'KTM Duke 250', 'KTM Duke 390', 'KTM RC 200', 'KTM RC 390'],
    category: 'Engine & Mechanical',
    manufacturer: 'Mann-Filter Equivalent',
    price: 240,
    originalPrice: 290,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Filtration Efficiency': '99% at 20 microns',
      'Seal Type': 'High Temp Nitrile O-Ring',
      'Compatibility': 'Synthetic & Semi-synthetic Oils'
    },
    isSampleDemonstration: true
  },

  // --- BRAKE & SUSPENSION ---
  {
    id: 'prod-brk-001',
    slug: 'ceramic-front-brake-pads-yamaha-r15-mt15',
    name: 'Sintered Copper-Ceramic Front Brake Pads',
    description: 'Low-dust copper-sintered ceramic brake pads providing progressive bite, minimal disc scoring, and zero fade even during repeated hard braking from highway speeds.',
    image: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'BRK-PAD-FR-YMH',
    brand: 'Yamaha',
    compatibleModels: ['Yamaha YZF-R15 V3 / V4', 'Yamaha MT-15 V1 / V2', 'Yamaha FZ-S FI V3'],
    category: 'Brake & Suspension',
    manufacturer: 'ByBre Braking Systems',
    price: 490,
    originalPrice: 620,
    stockStatus: 'in-stock',
    featured: true,
    badge: 'All Weather Bite',
    specifications: {
      'Compound': 'Sintered Ceramic Copper Matrix',
      'Friction Coefficient': '0.48 HH Rated',
      'Operating Temp': '0°C - 550°C',
      'Includes': 'Pair of 2 Front Brake Pads with Shim Plates'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-brk-002',
    slug: 'ktm-duke-390-drilled-front-brake-disc-320mm',
    name: 'High Carbon 320mm Ventilated Front Disc Rotor',
    description: 'Laser-cut high carbon 410 stainless steel brake rotor with cross-drilled pattern for water dispersion and rapid cooling. Direct bolt-on OEM replacement.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'BRK-DSC-320-KTM',
    brand: 'KTM',
    compatibleModels: ['KTM Duke 250', 'KTM Duke 390', 'KTM RC 390'],
    category: 'Brake & Suspension',
    manufacturer: 'Brembo Certified Partner',
    price: 2650,
    originalPrice: 3200,
    stockStatus: 'in-stock',
    featured: true,
    specifications: {
      'Outer Diameter': '320 mm',
      'Thickness': '5.0 mm',
      'Mounting Bolt Holes': '6 Holes M8',
      'Material': 'High-Carbon Heat Treated Stainless Steel'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-brk-003',
    slug: 'hero-splendor-rear-brake-shoe-spring-kit',
    name: 'Heavy Duty Rear Brake Shoe Assembly with Return Springs',
    description: 'Asbestos-free organic bonded friction shoes formulated for uniform drum engagement, noise-free operation, and extended drum liner life under heavy everyday carrying.',
    image: 'https://images.unsplash.com/photo-1597932328221-df621da3eb84?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597932328221-df621da3eb84?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'BRK-SHU-130-SPL',
    brand: 'Hero',
    compatibleModels: ['Hero Splendor Plus (100cc)', 'Hero HF Deluxe', 'Hero Passion Pro', 'Hero Super Splendor'],
    category: 'Brake & Suspension',
    manufacturer: 'Ask Automotive Grade',
    price: 220,
    originalPrice: 260,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Drum Diameter': '130 mm',
      'Lining': 'Non-Asbestos Semi-Metallic',
      'Includes': '2 Shoes, 2 High-Tension Zinc Springs'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-brk-004',
    slug: 'royal-enfield-nitrogen-charged-rear-shocks-pair',
    name: 'Nitrogen-Charged 5-Step Adjustable Rear Shock Absorbers (Pair)',
    description: 'Dual nitrogen gas-charged rear dampers with heavy-gauge progressive rate coil springs. Features 5-step preload adjustment for solo commuting or two-up touring with luggage.',
    image: 'https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SUS-GAS-RE-350',
    brand: 'Royal Enfield',
    compatibleModels: ['Royal Enfield Classic 350 Reborn', 'Royal Enfield Bullet 350', 'Royal Enfield Meteor 350'],
    category: 'Brake & Suspension',
    manufacturer: 'Gabriel India Quality',
    price: 3450,
    originalPrice: 4100,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Eye-to-Eye Length': '330 mm',
      'Damping Medium': 'Nitrogen Reservoir + Hydraulic Oil',
      'Preload': '5-Step Cam Adjust',
      'Finish': 'Gloss Black Powdercoat with Chrome Spring'
    },
    isSampleDemonstration: true
  },

  // --- ELECTRICAL COMPONENTS ---
  {
    id: 'prod-elec-001',
    slug: 'amaron-pro-bike-rider-tz4-battery',
    name: 'VRLA Maintenance-Free 12V 4Ah Motorcycle Battery',
    description: 'Factory-activated Absorbent Glass Mat (AGM) VRLA motorcycle battery. Zero spill risk, ultra-high cranking amps for immediate electric starts in cold winters, and high vibration tolerance.',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ELC-BAT-12V-4AH',
    brand: 'Hero',
    compatibleModels: ['Hero Splendor Plus (100cc)', 'Hero HF Deluxe', 'Hero Passion Pro', 'Bajaj Pulsar 150', 'Honda Shine 125', 'Honda SP 125'],
    category: 'Electrical Components',
    manufacturer: 'Amaron Power OEM',
    price: 1190,
    originalPrice: 1390,
    stockStatus: 'in-stock',
    featured: true,
    badge: '48M Warranty Spec',
    specifications: {
      'Voltage': '12 Volts',
      'Capacity': '4.0 Ah (10 HR)',
      'CCA': '70 Amps',
      'Dimensions': '113 x 70 x 105 mm',
      'Technology': 'VRLA / AGM Sealed'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-elec-002',
    slug: 'tvs-apache-rtr-headlight-assembly-led',
    name: 'Twin-LED Projector Front Headlight Assembly',
    description: 'Complete front headlight cowl with integrated high-output projector LED lenses and signature daytime running lights (DRL). Impact resistant polycarbonate lens with anti-scratch coating.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ELC-HDL-RTR-LED',
    brand: 'TVS',
    compatibleModels: ['TVS Apache RTR 160 4V', 'TVS Apache RTR 200 4V'],
    category: 'Electrical Components',
    manufacturer: 'Minda Lumax Quality',
    price: 2850,
    originalPrice: 3400,
    stockStatus: 'in-stock',
    featured: true,
    specifications: {
      'Lighting Type': 'High/Low Dual Beam LED Array',
      'Power Consumption': '35W High Beam / 20W Low Beam',
      'Color Temperature': '6000K Pure White',
      'Connector': 'Factory Plug-and-Play H4 Socket'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-elec-003',
    slug: 'bajaj-pulsar-starter-motor-assembly',
    name: 'High-Torque Heavy Duty Electric Starter Motor',
    description: 'Precision copper-wound electric self-starter motor with neodymium magnets and low-wear bronze bushings. Delivers instant spin torque with minimal battery amp draw.',
    image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ELC-STR-PLS-150',
    brand: 'Bajaj',
    compatibleModels: ['Bajaj Pulsar 150', 'Bajaj Pulsar 220F'],
    category: 'Electrical Components',
    manufacturer: 'Flash Electronics OEM',
    price: 1350,
    originalPrice: 1600,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Operating Voltage': '12V DC',
      'Spline Teeth': '9-Tooth Spline Shaft',
      'Torque Output': '1.8 Nm Peak Cranking',
      'Finish': 'Zinc Coated Rust-Resistant Shell'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-elec-004',
    slug: 'universal-sequential-flow-led-indicators',
    name: 'Dynamic Sequential Flow LED Indicator Set (Pack of 4)',
    description: 'Amber sequential flowing LED turn signal blinkers encased in flexible anti-snap rubber stalks. Waterproof IP67 rated with built-in daytime running accent halo.',
    image: 'https://images.unsplash.com/photo-1612198790700-cc3f0eb78e98?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1612198790700-cc3f0eb78e98?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ELC-IND-SEQ-04',
    brand: 'Universal Accessories',
    compatibleModels: ['Universal Fit (All Motorcycles & Scooters)'],
    category: 'Electrical Components',
    manufacturer: 'MotoPro Electronics',
    price: 590,
    originalPrice: 850,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Quantity': '4 Indicator Units (Front & Rear Pair)',
      'Waterproof Rating': 'IP67 Submersible',
      'Mounting Bolt': '10mm Universal Thread',
      'Voltage': '12V DC (Requires LED Flasher Relay)'
    },
    isSampleDemonstration: true
  },

  // --- BODY & EXTERIOR ---
  {
    id: 'prod-bdy-001',
    slug: 'royal-enfield-classic-350-heavy-duty-crash-guard',
    name: 'Leg & Engine Crash Guard with Stainless Rope Sliders',
    description: 'Heavy gauge 32mm cold-rolled mild steel diamond engine guard. Powder-coated in matte black with precision MIG welds and high-tensile mounting hardware to protect engine fins and rider legs.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'BDY-GRD-RE-AIR',
    brand: 'Royal Enfield',
    compatibleModels: ['Royal Enfield Classic 350 Reborn', 'Royal Enfield Bullet 350', 'Royal Enfield Meteor 350', 'Royal Enfield Hunter 350'],
    category: 'Body & Exterior',
    manufacturer: 'MotoArmor Fabrication',
    price: 1850,
    originalPrice: 2200,
    stockStatus: 'in-stock',
    featured: true,
    badge: 'Heavy Gauge Steel',
    specifications: {
      'Pipe Diameter': '32 mm Wall Thickness 2.0 mm',
      'Finish': 'Triple Powder Coated Satin Black',
      'Hardware': 'Grade 8.8 High-Tensile Bolts Included',
      'Weight': '3.9 kg'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-bdy-002',
    slug: 'hero-splendor-front-mudguard-gloss-black',
    name: 'ABS Virgin Plastic Front Mudguard (Gloss Black)',
    description: 'OEM color-matched high impact ABS injection moulded front fender with UV-protected clearcoat lacquer. Pre-drilled for exact alignment with factory fork mounting brackets.',
    image: 'https://images.unsplash.com/photo-1543393716-375f47996a77?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1543393716-375f47996a77?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'BDY-FND-SPL-BLK',
    brand: 'Hero',
    compatibleModels: ['Hero Splendor Plus (100cc)', 'Hero HF Deluxe', 'Hero Passion Pro'],
    category: 'Body & Exterior',
    manufacturer: 'National Auto Moulds',
    price: 480,
    originalPrice: 600,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Material': 'High-Impact Virgin ABS Thermoplastic',
      'Color': 'Gloss Ebony Black with Silver Sparkle',
      'Fitment': 'Direct Bolt-on Replacement'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-bdy-003',
    slug: 'yamaha-r15-v3-aerodynamic-front-bubble-visor',
    name: 'Dark Smoke Double-Bubble Aerodynamic Windscreen Visor',
    description: 'Optically clear 3mm polycarbonate wind deflector engineered to push headwind buffeting over the rider helmet during sport riding and highway touring.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'BDY-VSR-R15-SMK',
    brand: 'Yamaha',
    compatibleModels: ['Yamaha YZF-R15 V3 / V4'],
    category: 'Body & Exterior',
    manufacturer: 'AeroShield Moto',
    price: 650,
    originalPrice: 850,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Material': 'Shatterproof 3mm Polycarbonate',
      'Tint': 'Dark Smoke 70% Light Reduction',
      'Profile': 'Double Bubble Aerodynamic Raised Ridge'
    },
    isSampleDemonstration: true
  },

  // --- ACCESSORIES ---
  {
    id: 'prod-acc-001',
    slug: 'anti-vibration-claw-mobile-phone-mount-fast-charge',
    name: 'All-Metal Motorcycle Phone Mount with Vibration Dampener & USB-C Fast Charger',
    description: 'CNC machined aerospace grade aluminum handlebar cradle featuring 4-point silicone elastomer vibration isolating dampers to safeguard smartphone camera optical stabilization.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ACC-MNT-VIB-QC',
    brand: 'Universal Accessories',
    compatibleModels: ['Universal Fit (All Motorcycles & Scooters)'],
    category: 'Accessories',
    manufacturer: 'RideGear Tech Lab',
    price: 1150,
    originalPrice: 1599,
    stockStatus: 'in-stock',
    featured: true,
    badge: 'Camera Safe',
    specifications: {
      'Phone Width Range': '60 mm to 95 mm (Up to 7.2 inch screens)',
      'Vibration Isolation': 'Multi-axis Tuned Silicone Bushings',
      'Charging Port': 'QC 3.0 USB-A + 18W Type-C with Waterproof Cap',
      'Bar Clamping Diameter': '22mm, 28mm, and Mirror Mount Bracket'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-acc-002',
    slug: 'all-weather-waterproof-motorcycle-body-cover-silver',
    name: 'Heavy Duty 300D Oxford All-Weather Bike Body Cover',
    description: 'Tear-resistant heat-insulated UV-reflective polyester cover with buckle tie-downs, elasticized hems, and reinforced front wheel chain lock grommets.',
    image: 'https://images.unsplash.com/photo-1558618049-d7dd90d13e9d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618049-d7dd90d13e9d?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ACC-CVR-300D-UNV',
    brand: 'Universal Accessories',
    compatibleModels: ['Universal Fit (All Motorcycles & Scooters)'],
    category: 'Accessories',
    manufacturer: 'Kavach Moto Accessories',
    price: 540,
    originalPrice: 750,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Fabric': '300D Polyurethane Coated Oxford Fabric',
      'Waterproofing': 'Double Taped Heat Sealed Seams',
      'Lock Holes': 'Anti-theft Rustproof Aluminum Rings',
      'Includes': 'Drawstring Storage Carry Bag'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-acc-003',
    slug: 'dual-tone-loud-snail-horn-12v-115db',
    name: 'Dual-Tone European Snail Horn Set 12V 115dB',
    description: 'High-decibel penetrating automotive horn pair (500Hz High / 400Hz Low tone) with waterproof diaphragm covers for clear warning signals on noisy highways.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'ACC-HRN-SNL-115',
    brand: 'Universal Accessories',
    compatibleModels: ['Universal Fit (All Motorcycles & Scooters)'],
    category: 'Accessories',
    manufacturer: 'Roots Horn Systems',
    price: 420,
    originalPrice: 550,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Sound Level': '115 dB at 2 meters',
      'Current Draw': '3.5 Amperes per horn',
      'Frequency': '500 Hz (High) + 400 Hz (Low)',
      'Waterproof': 'Directional Acoustic Horn Flap'
    },
    isSampleDemonstration: true
  },

  // --- SCOOTY & ACTIVA PARTS ---
  {
    id: 'prod-sct-001',
    slug: 'honda-activa-reinforced-cvt-drive-belt',
    name: 'Reinforced Kevlar CVT Transmission Drive Belt',
    description: 'Aramid/Kevlar cord embedded continuously variable transmission (CVT) belt. Resists high-temperature stretching, prevents slippage on steep climbs, and delivers crisp throttle pickup.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SCT-BLT-ACT-6G',
    brand: 'Honda Activa',
    compatibleModels: ['Honda Activa 3G / 4G', 'Honda Activa 5G', 'Honda Activa 6G (H-Smart)', 'Honda Activa 125 FI'],
    category: 'Scooty & Activa Parts',
    manufacturer: 'Bando Transmission Belts',
    price: 490,
    originalPrice: 620,
    stockStatus: 'in-stock',
    featured: true,
    badge: 'Kevlar Reinforced',
    specifications: {
      'Reinforcement Cord': '100% DuPont Kevlar Tensile Member',
      'Tooth Profile': 'Moulded Cogged Underside',
      'Heat Resistance': '120°C Continuous Service',
      'Expected Life': '20,000+ Kilometers'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-sct-002',
    slug: 'honda-activa-variator-pulley-roller-weights-set',
    name: 'Balanced Variator Pulley Assembly & Roller Weights (6 Pcs)',
    description: 'CNC balanced movable drive face variator with self-lubricating wear-resistant composite roller weights. Restores smooth acceleration and eliminates scooter shudder during initial takeoff.',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145651?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562976540-1502c2145651?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SCT-VAR-ACT-SET',
    brand: 'Honda Activa',
    compatibleModels: ['Honda Activa 3G / 4G', 'Honda Activa 5G', 'Honda Activa 6G (H-Smart)'],
    category: 'Scooty & Activa Parts',
    manufacturer: 'Endurance Scooter Tech',
    price: 890,
    originalPrice: 1100,
    stockStatus: 'in-stock',
    featured: true,
    specifications: {
      'Roller Weight': '11.5 Grams Precision Matched (6 Pcs)',
      'Variator Ramp Angle': 'Optimized for Mid-Range Torque',
      'Bushing': 'Oil-Impregnated Sintered Bronze'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-sct-003',
    slug: 'tvs-jupiter-high-flow-washable-air-filter',
    name: 'Pleated Viscous Paper Engine Air Filter',
    description: 'High-dust-holding capacity pleated paper air filter impregnated with viscous dust-trapping oil to shield scooter carburettor/FI sensors from fine road dust.',
    image: 'https://images.unsplash.com/photo-1558618047-f89a8d2c50a2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618047-f89a8d2c50a2?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SCT-FLT-JUP-AIR',
    brand: 'TVS',
    compatibleModels: ['TVS Jupiter 110/125', 'TVS Ntorq 125'],
    category: 'Scooty & Activa Parts',
    manufacturer: 'Elofic Air Systems',
    price: 195,
    originalPrice: 240,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Medium': 'Triple-Layer Viscous Poly-Cellulose',
      'Frame': 'Heat-Sealed Flexible Polyurethane Bead',
      'Service Interval': 'Inspect at 4000 km, replace at 12000 km'
    },
    isSampleDemonstration: true
  },
  {
    id: 'prod-sct-004',
    slug: 'suzuki-access-125-automatic-clutch-shoe-assembly',
    name: 'Centrifugal 3-Shoe Automatic Clutch Assembly',
    description: 'Balanced centrifugal automatic clutch assembly with heavy-gauge expansion return springs and high-friction lining. Solves vibration and jerky clutch engagement in stop-and-go traffic.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SCT-CLT-ACS-125',
    brand: 'Suzuki',
    compatibleModels: ['Suzuki Access 125', 'Suzuki Burgman Street 125'],
    category: 'Scooty & Activa Parts',
    manufacturer: 'Ask Clutches Spec',
    price: 1180,
    originalPrice: 1420,
    stockStatus: 'in-stock',
    featured: false,
    specifications: {
      'Shoe Count': '3 Heavy Duty Shoes with Tension Springs',
      'Clutch Diameter': '125 mm Bell Fitment',
      'Weight': '820 grams Balanced'
    },
    isSampleDemonstration: true
  }
];
