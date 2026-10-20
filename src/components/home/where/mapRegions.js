// Map data for "Where we work".
// SAMPLE DATA: the places on the map are illustrative, not real geography, and no project location
// is confirmed (docs/OPEN-ITEMS.md). The projects and photos are real Archi Hub renders; their names
// are read from the signage in the renders and still need confirming.

// Each place is a pin on the map: `pin` is its position as a percentage of the map's width/height.
// `id` matches `project.destination`.
export const places = [
  { id: "place-1", name: "Location 1", pin: { left: 20, top: 22 } },
  { id: "place-2", name: "Location 2", pin: { left: 77, top: 18 } },
  { id: "place-3", name: "Location 3", pin: { left: 85, top: 57 } },
  { id: "place-4", name: "Location 4", pin: { left: 26, top: 72 } },
  { id: "place-5", name: "Location 5", pin: { left: 63, top: 80 } },
];

// The studio pin in the middle of the map.
export const studio = { id: "studio", name: "Archi Hub studio", pin: { left: 50, top: 46 } };

const img = (name, alt) => ({ src: `/images/services/${name}.jpg`, alt });

export const projects = [
  {
    slug: "la-vida-karma",
    name: "La Vida Karma Residence",
    type: "Hospitality",
    destination: "place-1",
    images: [img("hospitality-1", "Resort pool courtyard in daylight"), img("hospitality-2", "Resort pool courtyard at night")],
  },
  {
    slug: "nefertiti-motel",
    name: "Nefertiti Motel",
    type: "Hospitality",
    destination: "place-1",
    images: [img("hospitality-3", "Four-storey motel facade at dusk")],
  },
  {
    slug: "mall-anton",
    name: "Mall Anton",
    type: "Commercial",
    destination: "place-2",
    images: [img("commercial-1", "Shopping mall facade with sculpted fins")],
  },
  {
    slug: "amarina-soul",
    name: "Amarina Soul",
    type: "Commercial",
    destination: "place-2",
    images: [img("commercial-2", "Retail street with arched shopfronts at dusk")],
  },
  {
    slug: "courtyard-residence",
    name: "Courtyard residence",
    type: "Residential",
    destination: "place-3",
    images: [img("residential-3", "Residential courtyard with a pool at dusk")],
  },
  {
    slug: "restaurant-front",
    name: "Seafood and steak house front",
    type: "Commercial",
    destination: "place-3",
    images: [img("commercial-3", "Restaurant entrance with a shell-shaped canopy")],
  },
  {
    slug: "brick-townhouses",
    name: "Brick townhouses",
    type: "Residential",
    destination: "place-4",
    images: [img("residential-1", "Brick townhouses with arched balconies")],
  },
  {
    slug: "classical-apartments",
    name: "Classical apartment building",
    type: "Residential",
    destination: "place-4",
    images: [img("residential-2", "Classical apartment facade with ornate balconies")],
  },
  {
    slug: "office-interior",
    name: "Office interior",
    type: "Interiors",
    destination: "place-5",
    images: [img("interiors-1", "Office interior with marble walls")],
  },
  {
    slug: "home-interiors",
    name: "Home interiors",
    type: "Interiors",
    destination: "place-5",
    images: [img("interiors-2", "Living room with green and wood panels"), img("interiors-3", "Bedroom with blue panelled walls")],
  },
];
