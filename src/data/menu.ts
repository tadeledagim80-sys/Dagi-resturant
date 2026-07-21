import { MenuItem, Review } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Pizza
  {
    id: 'pizza-1',
    name: 'DAGI Signature Truffle Pizza',
    description: 'Creamy truffle cream base, wild forest mushrooms, fresh Fior di Latte mozzarella, topped with white truffle oil, shaved parmesan, and fresh chives.',
    price: 26.00,
    rating: 4.9,
    reviews: 342,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    preparationTime: 20
  },
  {
    id: 'pizza-2',
    name: 'Diavola Hot Honey Pizza',
    description: 'Spicy calabrian salami, San Marzano tomato sauce, fresh mozzarella, topped with organic spicy hot honey and fresh sweet basil.',
    price: 24.00,
    rating: 4.8,
    reviews: 189,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop',
    isSpecialOffer: true,
    discountPrice: 19.99,
    preparationTime: 18
  },

  // Burgers
  {
    id: 'burger-1',
    name: 'The Wagyu Gold Burger',
    description: 'Mouthwatering 200g Wagyu beef patty, roasted truffle aioli, melted aged white cheddar, crispy caramelized balsamic onions on a toasted artisan brioche bun.',
    price: 29.00,
    rating: 5.0,
    reviews: 412,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    preparationTime: 15
  },
  {
    id: 'burger-2',
    name: 'Smoked Bourbon BBQ Burger',
    description: 'Prime Angus beef patty, crispy applewood smoked bacon, sharp cheddar, house bourbon BBQ glaze, and crispy golden onion rings.',
    price: 21.00,
    rating: 4.7,
    reviews: 145,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    preparationTime: 15
  },

  // Fried Chicken
  {
    id: 'fried-chicken-1',
    name: 'Crispy Imperial Fried Chicken',
    description: 'Buttermilk marinated double-dredged chicken pieces in our secret blend of 11 herbs and spices, served with dynamic sweet chili sauce and jalapeño cornbread.',
    price: 19.50,
    rating: 4.8,
    reviews: 215,
    category: 'Fried Chicken',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=800&auto=format&fit=crop',
    isSpecialOffer: true,
    discountPrice: 16.50,
    preparationTime: 15
  },

  // Grilled Chicken
  {
    id: 'grilled-chicken-1',
    name: 'Herb-Crusted Grilled Chicken',
    description: 'Organic chicken breast marinated in fresh rosemary, garlic, and thyme, grilled over open flames, served with roasted seasonal asparagus and a citrus white wine sauce.',
    price: 23.00,
    rating: 4.6,
    reviews: 98,
    category: 'Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop',
    preparationTime: 22
  },

  // Pasta
  {
    id: 'pasta-1',
    name: 'Truffle Mushroom Fettuccine',
    description: 'Handmade fettuccine pasta tossed in a velvety wild porcini mushroom cream sauce, garnished with shaved Parmigiano-Reggiano and fresh chives.',
    price: 22.00,
    rating: 4.8,
    reviews: 178,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800&auto=format&fit=crop',
    preparationTime: 18
  },
  {
    id: 'pasta-2',
    name: 'Lobster & Saffron Spaghetti',
    description: 'Poached lobster meat, cherry tomatoes, and fine herbs in a creamy saffron-infused broth over artisanal spaghetti.',
    price: 32.00,
    rating: 4.9,
    reviews: 132,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    preparationTime: 20
  },

  // Steak
  {
    id: 'steak-1',
    name: 'Prime Filet Mignon',
    description: 'Exquisite 8oz center-cut USDA Prime beef tenderloin, grilled to perfection, topped with garlic-herb bone marrow butter, served with velvet potato puree.',
    price: 48.00,
    rating: 5.0,
    reviews: 264,
    category: 'Steak',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    preparationTime: 25
  },

  // Salads
  {
    id: 'salad-1',
    name: 'Burrata & Heirloom Tomato Salad',
    description: 'Fresh artisanal Italian burrata cheese surrounded by sweet heirloom tomatoes, homemade organic basil pesto, pine nuts, and aged balsamic glaze.',
    price: 16.50,
    rating: 4.7,
    reviews: 110,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=800&auto=format&fit=crop',
    preparationTime: 10
  },

  // French Fries
  {
    id: 'fries-1',
    name: 'Gourmet Truffle Parmesan Fries',
    description: 'Crispy hand-cut russet potatoes tossed with Italian white truffle oil, grated Parmigiano-Reggiano, and fresh flat-leaf parsley. Served with a roasted garlic aioli.',
    price: 11.50,
    rating: 4.9,
    reviews: 320,
    category: 'French Fries',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop',
    preparationTime: 10
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Molten Chocolate Lava Cake',
    description: 'Rich Belgian dark chocolate cake with an oozing warm chocolate center, served with a scoop of organic Madagascar vanilla bean gelato.',
    price: 13.00,
    rating: 4.9,
    reviews: 215,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    preparationTime: 12
  },

  // Soft Drinks
  {
    id: 'soft-drink-1',
    name: 'DAGI Botanic Craft Soda',
    description: 'Refreshing organic carbonated soda made with natural sugarcane, botanical herbs, citrus peel extracts, and Madagascar vanilla.',
    price: 5.50,
    rating: 4.5,
    reviews: 48,
    category: 'Soft Drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
    preparationTime: 3
  },

  // Fresh Juices
  {
    id: 'juice-1',
    name: 'Tropical Gold Elixir',
    description: 'Freshly cold-pressed passionfruit, sweet mango, golden pineapple, and a touch of fresh turmeric and ginger root for an immunity boost.',
    price: 8.50,
    rating: 4.8,
    reviews: 94,
    category: 'Fresh Juices',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop',
    isSpecialOffer: true,
    discountPrice: 6.99,
    preparationTime: 5
  },

  // Coffee
  {
    id: 'coffee-1',
    name: '24K Gold Dust Cappuccino',
    description: 'Rich, smooth double espresso pull, velvet micro-foam milk, beautifully decorated with edible 24-karat gold dust pearls.',
    price: 8.00,
    rating: 4.9,
    reviews: 156,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    preparationTime: 5
  },

  // Tea
  {
    id: 'tea-1',
    name: 'Royal Blooming Jasmine Pearls',
    description: 'Hand-rolled green tea leaves wrapped around a fresh jasmine flower that blooms beautifully in the teapot. Exquisite aroma.',
    price: 7.50,
    rating: 4.8,
    reviews: 73,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop',
    preparationTime: 6
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alexander Wright',
    rating: 5,
    text: 'DAGI Restaurant provides one of the finest dining experiences I’ve ever had. The Wagyu Gold Burger is absolutely legendary, and the hot honey pizza is spectacular. Fast delivery and high-end packaging!',
    date: 'July 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    rating: 5,
    text: 'A culinary masterpiece! The gold dust cappuccino is as beautiful as it is delicious. The online maps tracking was completely seamless and let me see exactly when my food was arriving.',
    date: 'July 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    rating: 5,
    text: 'Excellent service and pristine food quality. The Filet Mignon melts in your mouth. Getting delivery with the live map location pin was incredibly handy. Highly recommended!',
    date: 'July 10, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];
