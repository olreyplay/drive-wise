export async function getModelsByMake(make: string) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`,
  );

  const data = await res.json();
  return data.Results;
}
