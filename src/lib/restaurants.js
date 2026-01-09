export const SAMPLE_RESTAURANTS = [
  {
    id: "1",
    name: "Bella Italia Trattoria",
    image: "/restaurant-image.jpg",
    cuisine: ["Italian", "Pasta"],
    rating: 4.8,
    distance: "0.8 km",
    price: "$$",
    reviews: 324,
    description:
      "Authentic Italian cuisine with homemade pasta and wood-fired pizzas",
    address: "123 Main Street",
    phone: "+1 111 222 3333",
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
  },
  {
    id: "2",
    name: "Sushi Sakura",
    image: "/restaurant-image.jpg",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    distance: "1.1 km",
    price: "$$$",
    reviews: 210,
    description: "Fresh sushi and sashimi with a cozy ambiance",
    address: "456 Ocean Drive",
    phone: "+1 222 333 4444",
    hours: "Mon-Sun: 12:00 PM - 10:00 PM",
  },
  {
    id: "3",
    name: "Taco Loco",
    image: "/restaurant-image.jpg",
    cuisine: ["Mexican"],
    rating: 4.5,
    distance: "0.6 km",
    price: "$",
    reviews: 89,
    description: "Street-style tacos and homemade salsas",
    address: "789 Taco Lane",
    phone: "+1 333 444 5555",
    hours: "Tue-Sun: 10:00 AM - 8:00 PM",
  },
  {
    id: "4",
    name: "Curry Corner",
    image: "/restaurant-image.jpg",
    cuisine: ["Indian"],
    rating: 4.6,
    distance: "1.4 km",
    price: "$$",
    reviews: 156,
    description: "Spicy curries and tandoori specialties",
    address: "321 Spice Road",
    phone: "+1 444 555 6666",
    hours: "Mon-Sat: 11:00 AM - 9:00 PM",
  },
];

export function getRestaurantById(id) {
  if (id == null) return null;
  const sId = String(id);

  // 1) direct id match
  let found = SAMPLE_RESTAURANTS.find((r) => String(r.id) === sId);
  if (found) return found;

  // 2) numeric match (in case ids are numbers somewhere)
  const maybeNum = Number(sId);
  if (!Number.isNaN(maybeNum)) {
    found = SAMPLE_RESTAURANTS.find((r) => Number(r.id) === maybeNum);
    if (found) return found;
  }

  // 3) slug/name match (allow links that use restaurant name)
  const slug = (str) =>
    String(str)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\n+\w-]/g, "");

  const decoded = (() => {
    try {
      return decodeURIComponent(sId);
    } catch (e) {
      return sId;
    }
  })();

  found = SAMPLE_RESTAURANTS.find(
    (r) => slug(r.name) === slug(decoded) || slug(r.name) === slug(sId)
  );
  if (found) return found;

  // 4) fuzzy: name contains
  found = SAMPLE_RESTAURANTS.find((r) =>
    String(r.name).toLowerCase().includes(String(sId).toLowerCase())
  );
  return found || null;
}
