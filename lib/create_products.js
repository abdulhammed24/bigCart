require('dotenv').config();
const { Client, Databases, ID } = require('node-appwrite');

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6834e364003a26145462') // Your project ID
  .setKey(
    'standard_39107d82e663929cc0101c22e3ea384316c4e44eabc49f20a0e9c0aafe4ead8632307b3287b06ab60f3d93656a41e6a5e67e5709b2da96f881f367a9d91c94e6a5b581f67f76d3eb4ddc68a5dd39898b077d01be443b6aa11bb2cf94f5fdc8a85505bee87b17e765607b014f8cb14b95810ba750b8d49611130673ea21890a75',
  ); // Add your API key from .env

const databases = new Databases(client);

const products = [
  // Fruits (6 products)
  {
    name: 'Fresh Apple',
    category: 'Fruits',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748517345/big-cart/apple.jpg', // Kept original as no new URL was provided
    status: null,
    discountPercentage: null,
    description: 'Crisp and sweet red apples.',
    inStock: true,
    price: 6,
    rating: 4.5,
  },
  {
    name: 'Ripe Banana',
    category: 'Fruits',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748629870/big-cart/bananas-1642706_1280_g0bmdc.jpg',
    status: 'new',
    discountPercentage: 10,
    description: 'Sweet and ripe yellow bananas.',
    inStock: true,
    price: 4,
    rating: 4.7,
  },
  {
    name: 'Juicy Orange',
    category: 'Fruits',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748629897/big-cart/oranges-428072_640_hwvkk9.jpg',
    status: null,
    discountPercentage: null,
    description: 'Tangy and juicy oranges.',
    inStock: true,
    price: 5,
    rating: 4.4,
  },
  {
    name: 'Sweet Mango',
    category: 'Fruits',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748629996/big-cart/fruit-4894600_640_fln29g.jpg',
    status: null,
    discountPercentage: null,
    description: 'Tropical sweet mangoes.',
    inStock: true,
    price: 7,
    rating: 4.6,
  },
  {
    name: 'Red Grapes',
    category: 'Fruits',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630015/big-cart/grape-2911039_640_cn8g00.jpg',
    status: null,
    discountPercentage: 5,
    description: 'Seedless red grapes.',
    inStock: true,
    price: 8,
    rating: 4.5,
  },
  {
    name: 'Fresh Strawberry',
    category: 'Fruits',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630046/big-cart/strawberries-829271_960_720_pwiqkl.jpg',
    status: null,
    discountPercentage: null,
    description: 'Juicy red strawberries.',
    inStock: true,
    price: 9,
    rating: 4.8,
  },

  // Vegetables (6 products)
  {
    name: 'Organic Carrot',
    category: 'Vegetables',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630186/big-cart/vegetable-1553195_960_720_ceeihc.jpg',
    status: null,
    discountPercentage: null,
    description: 'Fresh and crunchy carrots.',
    inStock: true,
    price: 3,
    rating: 4.3,
  },
  {
    name: 'Broccoli Crown',
    category: 'Vegetables',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630221/big-cart/broccoli-494754_1280_cdsbt0.jpg',
    status: 'new',
    discountPercentage: 15,
    description: 'Nutritious green broccoli.',
    inStock: true,
    price: 5,
    rating: 4.5,
  },
  {
    name: 'Red Tomato',
    category: 'Vegetables',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630321/big-cart/tomatoes-320860_640_zzdgdd.jpg',
    status: null,
    discountPercentage: null,
    description: 'Juicy red tomatoes.',
    inStock: true,
    price: 4,
    rating: 4.4,
  },
  {
    name: 'Green Spinach',
    category: 'Vegetables',
    unit: '1 bunch',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630344/big-cart/spinach-3708115_640_nbebst.jpg',
    status: null,
    discountPercentage: null,
    description: 'Fresh leafy spinach.',
    inStock: true,
    price: 3,
    rating: 4.6,
  },
  {
    name: 'Bell Pepper',
    category: 'Vegetables',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630388/big-cart/bell-peppers-499068_640_la9aot.jpg',
    status: null,
    discountPercentage: null,
    description: 'Colorful bell peppers.',
    inStock: true,
    price: 6,
    rating: 4.4,
  },
  {
    name: 'Sweet Potato',
    category: 'Vegetables',
    unit: '1 lb',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630391/big-cart/potato-3859166_640_fkrgpy.jpg',
    status: null,
    discountPercentage: 10,
    description: 'Nutritious sweet potatoes.',
    inStock: true,
    price: 4,
    rating: 4.5,
  },

  // Beverages (6 products)
  {
    name: 'Orange Juice',
    category: 'Beverages',
    unit: '1 L',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630422/big-cart/orange-2610760_640_acnkro.jpg',
    status: null,
    discountPercentage: null,
    description: 'Pure orange juice, no sugar added.',
    inStock: true,
    price: 8,
    rating: 4.5,
  },
  {
    name: 'Cola Drink',
    category: 'Beverages',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630526/big-cart/cola-4813834_640_xspmuv.jpg',
    status: 'new',
    discountPercentage: 5,
    description: 'Refreshing carbonated cola.',
    inStock: true,
    price: 2,
    rating: 4.3,
  },
  {
    name: 'Green Tea',
    category: 'Beverages',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630550/big-cart/green-tea-3528474_640_s5mom7.jpg',
    status: null,
    discountPercentage: null,
    description: 'Organic green tea.',
    inStock: true,
    price: 3,
    rating: 4.4,
  },
  {
    name: 'Mineral Water',
    category: 'Beverages',
    unit: '1 L',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630586/big-cart/water-143989_640_qhvcov.jpg',
    status: null,
    discountPercentage: null,
    description: 'Pure mineral water.',
    inStock: true,
    price: 1,
    rating: 4.2,
  },
  {
    name: 'Coffee Instant',
    category: 'Beverages',
    unit: '200 g',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630750/big-cart/coffee-2139592_640_qlffkg.jpg',
    status: null,
    discountPercentage: null,
    description: 'Rich instant coffee.',
    inStock: true,
    price: 6,
    rating: 4.6,
  },
  {
    name: 'Lemonade',
    category: 'Beverages',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630807/big-cart/lime-907124_640_ppiylm.jpg',
    status: null,
    discountPercentage: 10,
    description: 'Refreshing lemonade.',
    inStock: true,
    price: 3,
    rating: 4.5,
  },

  // Grocery (6 products)
  {
    name: 'Basmati Rice',
    category: 'Grocery',
    unit: '1 kg',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630818/big-cart/brown-rice-1228099_640_u70sqa.jpg',
    status: null,
    discountPercentage: null,
    description: 'Premium long-grain rice.',
    inStock: true,
    price: 10,
    rating: 4.6,
  },
  {
    name: 'Whole Wheat Pasta',
    category: 'Grocery',
    unit: '500 g',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630911/big-cart/pasta-7953208_640_ulrgyo.jpg',
    status: null,
    discountPercentage: 10,
    description: 'Healthy whole wheat pasta.',
    inStock: true,
    price: 3,
    rating: 4.5,
  },
  {
    name: 'Canned Beans',
    category: 'Grocery',
    unit: '400 g',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630967/big-cart/photo-1584663639452-b79f2cfecb0f_hn5k4z.avif',
    status: null,
    discountPercentage: null,
    description: 'Ready-to-eat kidney beans.',
    inStock: true,
    price: 2,
    rating: 4.2,
  },
  {
    name: 'White Flour',
    category: 'Grocery',
    unit: '1 kg',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748630998/big-cart/photo-1710857389288-2d90213f92de_phdp95.avif',
    status: null,
    discountPercentage: null,
    description: 'All-purpose white flour.',
    inStock: true,
    price: 4,
    rating: 4.3,
  },
  {
    name: 'Brown Sugar',
    category: 'Grocery',
    unit: '1 kg',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631047/big-cart/photo-1706524077178-e6e3c49233ad_ekexc8.avif',
    status: null,
    discountPercentage: null,
    description: 'Natural brown sugar.',
    inStock: true,
    price: 5,
    rating: 4.4,
  },
  {
    name: 'Oatmeal',
    category: 'Grocery',
    unit: '500 g',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631207/big-cart/photo-1728487893807-e8963a2eeb13_hp64nv.avif',
    status: 'new',
    discountPercentage: 5,
    description: 'Healthy rolled oats.',
    inStock: true,
    price: 3,
    rating: 4.5,
  },

  // Edible oil (6 products)
  {
    name: 'Olive Oil',
    category: 'Edible oil',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631239/big-cart/photo-1638324396229-632af05042dd_zmhvmo.avif',
    status: null,
    discountPercentage: null,
    description: 'Extra virgin olive oil.',
    inStock: true,
    price: 12,
    rating: 4.7,
  },
  {
    name: 'Sunflower Oil',
    category: 'Edible oil',
    unit: '1 L',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631248/big-cart/photo-1654245201134-49f7e8115817_gqcchf.avif',
    status: null,
    discountPercentage: null,
    description: 'Pure sunflower oil.',
    inStock: true,
    price: 8,
    rating: 4.5,
  },
  {
    name: 'Canola Oil',
    category: 'Edible oil',
    unit: '1 L',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631393/big-cart/premium_photo-1731942726418-1db7dc2d32fc_muej7m.avif',
    status: null,
    discountPercentage: null,
    description: 'Healthy canola oil.',
    inStock: true,
    price: 7,
    rating: 4.4,
  },
  {
    name: 'Coconut Oil',
    category: 'Edible oil',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631432/big-cart/premium_photo-1670537994805-815a97fb5bae_scxejh.avif',
    status: null,
    discountPercentage: 10,
    description: 'Organic coconut oil.',
    inStock: true,
    price: 10,
    rating: 4.6,
  },
  {
    name: 'Vegetable Oil',
    category: 'Edible oil',
    unit: '1 L',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631456/big-cart/photo-1654245495489-6616a6ca252e_v9xocc.avif',
    status: null,
    discountPercentage: null,
    description: 'Versatile vegetable oil.',
    inStock: true,
    price: 6,
    rating: 4.3,
  },
  {
    name: 'Grapeseed Oil',
    category: 'Edible oil',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631485/big-cart/photo-1662058595162-10e024b1a907_wm3uqq.avif',
    status: 'new',
    discountPercentage: null,
    description: 'Light grapeseed oil.',
    inStock: true,
    price: 9,
    rating: 4.5,
  },

  // Household (6 products)
  {
    name: 'Dish Soap',
    category: 'Household',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631612/big-cart/photo-1647577746559-c9a28c0d0870_c8tn1t.avif',
    status: null,
    discountPercentage: null,
    description: 'Lemon-scented dish soap.',
    inStock: true,
    price: 4,
    rating: 4.3,
  },
  {
    name: 'Laundry Detergent',
    category: 'Household',
    unit: '1 L',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631646/big-cart/bottle-5430630_640_gqqc8o.jpg',
    status: 'new',
    discountPercentage: 20,
    description: 'Effective laundry detergent.',
    inStock: true,
    price: 10,
    rating: 4.4,
  },
  {
    name: 'All-Purpose Cleaner',
    category: 'Household',
    unit: '500 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631661/big-cart/cleaning-3977589_640_qi1cde.jpg',
    status: null,
    discountPercentage: null,
    description: 'Multi-surface cleaner.',
    inStock: true,
    price: 5,
    rating: 4.2,
  },

  {
    name: 'Trash Bags',
    category: 'Household',
    unit: 'Pack of 50',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631771/big-cart/download_qjm59w.webp',
    status: null,
    discountPercentage: null,
    description: 'Durable trash bags.',
    inStock: true,
    price: 6,
    rating: 4.3,
  },
  {
    name: 'Paper Towels',
    category: 'Household',
    unit: 'Pack of 6',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631804/big-cart/download_y193ud.jpg',
    status: null,
    discountPercentage: 10,
    description: 'Absorbent paper towels.',
    inStock: true,
    price: 8,
    rating: 4.4,
  },
  {
    name: 'Sponges',
    category: 'Household',
    unit: 'Pack of 3',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631869/big-cart/images_f8g3db.jpg',
    status: null,
    discountPercentage: null,
    description: 'Durable cleaning sponges.',
    inStock: true,
    price: 3,
    rating: 4.2,
  },

  // Baby (6 products)
  {
    name: 'Baby Diapers',
    category: 'Baby',
    unit: 'Pack of 20',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631890/big-cart/download_kjiu8c.webp',
    status: null,
    discountPercentage: null,
    description: 'Soft and absorbent diapers.',
    inStock: true,
    price: 15,
    rating: 4.6,
  },
  {
    name: 'Baby Wipes',
    category: 'Baby',
    unit: 'Pack of 80',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748632065/big-cart/shopping_zpekf9.webp',
    status: null,
    discountPercentage: null,
    description: 'Gentle baby wipes.',
    inStock: true,
    price: 5,
    rating: 4.5,
  },
  {
    name: 'Baby Shampoo',
    category: 'Baby',
    unit: '200 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748632032/big-cart/shopping_wfqqex.webp',
    status: null,
    discountPercentage: null,
    description: 'Tear-free baby shampoo.',
    inStock: true,
    price: 6,
    rating: 4.7,
  },
  {
    name: 'Baby Lotion',
    category: 'Baby',
    unit: '200 mL',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631941/big-cart/shopping_vmt5aj.webp',
    status: 'new',
    discountPercentage: 10,
    description: 'Moisturizing baby lotion.',
    inStock: true,
    price: 7,
    rating: 4.6,
  },
  {
    name: 'Baby Formula',
    category: 'Baby',
    unit: '400 g',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748632005/big-cart/shopping_zziw9p.webp',
    status: null,
    discountPercentage: null,
    description: 'Nutritious baby formula.',
    inStock: true,
    price: 20,
    rating: 4.8,
  },
  {
    name: 'Baby Bibs',
    category: 'Baby',
    unit: 'Pack of 3',
    image:
      'https://res.cloudinary.com/abdulhammed/image/upload/v1748631951/big-cart/shopping_nasxz4.webp',
    status: null,
    discountPercentage: null,
    description: 'Soft cotton baby bibs.',
    inStock: true,
    price: 4,
    rating: 4.4,
  },
];

async function createProducts() {
  const databaseId = '6836cb06001824193d3a';
  const collectionId = 'products_id';

  try {
    for (const product of products) {
      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        product,
      );
      console.log(
        `Created product: ${product.name} in category ${product.category}`,
      );
    }
    console.log('All products created successfully');
  } catch (error) {
    console.error('Error creating products:', error);
  }
}

createProducts();
