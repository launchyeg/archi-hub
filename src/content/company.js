export const places = [
  { id: "hurghada", name: "Hurghada", pin: { left: 15, top: 40 } },
  { id: "sahl-hasheesh", name: "Sahl Hasheesh", pin: { left: 72, top: 13 } },
  { id: "safaga", name: "Safaga", pin: { left: 86, top: 37 } },
  { id: "port-ghalib", name: "Port Ghalib", pin: { left: 85, top: 61 } },
  { id: "marsa-alam", name: "Marsa Alam", pin: { left: 76, top: 85 } },
  { id: "cairo", name: "Cairo", pin: { left: 15, top: 11 } },
  { id: "new-asyut", name: "New Asyut", pin: { left: 15, top: 68 } },
  { id: "poland", name: "Poland", abroad: true, pin: { left: 42, top: 11 } },
];

export const studio = {
  id: "studio",
  name: "Archi Hub studio",
  pin: { left: 50, top: 50 },
  city: "Hurghada, Egypt",
  address:
    "Metro Main Street, above Al Balacona Cafe, Al Kawsr District, Hurghada, Egypt",
  mapUrl: "https://maps.app.goo.gl/UbbtTHHbNGzXEyEE8",
  phone: { label: "01000303725", href: "tel:+201000303725" },
  email: "info@archihubeg.com",
};

// PLACEHOLDER: no social media links are confirmed yet (docs/OPEN-ITEMS.md). Add each URL as `href`;
// an icon with `href: null` shows as "link pending".
export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/ARCHI.HUB.R" },
  {
    name: "Instagram",
    href: "https://www.instagram.com/archi_hub_unv?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==",
  },
  { name: "X", href: null },
  { name: "LinkedIn", href: null },
];

const img = (name, alt) => ({ src: `/images/services/${name}.jpg`, alt });

export const projects = [
  {
    slug: "la-vida-karma",
    name: "La Vida Karma Residence",
    type: "Hospitality",
    destination: "marsa-alam",
    images: [
      img("hospitality-1", "Resort pool courtyard in daylight"),
      img("hospitality-2", "Resort pool courtyard at night"),
    ],
  },
  {
    slug: "nefertiti-motel",
    name: "Nefertiti Motel",
    type: "Hospitality",
    destination: "safaga",
    images: [
      img("hospitality-1", "Resort pool courtyard in daylight"),
      img("hospitality-2", "Resort pool courtyard at night"),
      img("hospitality-3", "Four-storey motel facade at dusk"),
    ],
  },
  {
    slug: "mall-anton",
    name: "Mall Anton",
    type: "Commercial",
    destination: "hurghada",
    images: [img("commercial-1", "Shopping mall facade with sculpted fins")],
  },
  {
    slug: "amarina-soul",
    name: "Amarina Soul",
    type: "Commercial",
    destination: "hurghada",
    images: [
      img("commercial-1", "Retail street with arched shopfronts at dusk"),
      img("commercial-2", "Retail street with arched shopfronts at dusk"),
      img("commercial-3", "Retail street with arched shopfronts at dusk"),
    ],
  },
  {
    slug: "courtyard-residence",
    name: "Courtyard residence",
    type: "Residential",
    destination: "sahl-hasheesh",
    images: [img("residential-3", "Residential courtyard with a pool at dusk")],
  },
  {
    slug: "restaurant-front",
    name: "Seafood and steak house front",
    type: "Commercial",
    destination: "sahl-hasheesh",
    images: [
      img("commercial-3", "Restaurant entrance with a shell-shaped canopy"),
    ],
  },
  {
    slug: "brick-townhouses",
    name: "Brick townhouses",
    type: "Residential",
    destination: "poland",
    images: [img("residential-1", "Brick townhouses with arched balconies")],
  },
  {
    slug: "classical-apartments",
    name: "Classical apartment building",
    type: "Residential",
    destination: "new-asyut",
    images: [
      img("residential-2", "Classical apartment facade with ornate balconies"),
    ],
  },
  {
    slug: "office-interior",
    name: "Office interior",
    type: "Interiors",
    destination: "cairo",
    images: [img("interiors-1", "Office interior with marble walls")],
  },
  {
    slug: "home-interiors",
    name: "Home interiors",
    type: "Interiors",
    destination: "port-ghalib",
    images: [
      img("interiors-2", "Living room with green and wood panels"),
      img("interiors-3", "Bedroom with blue panelled walls"),
    ],
  },
];
