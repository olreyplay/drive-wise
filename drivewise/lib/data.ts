export const POPULAR_MAKES = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Nissan",
  "Hyundai",
  "Kia",
  "Mazda",
  "Subaru",
  "Volkswagen",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Lexus",
  "Jeep",
];

export const YEARS = Array.from(
  { length: 25 },
  (_, index) => new Date().getFullYear() - index,
);
