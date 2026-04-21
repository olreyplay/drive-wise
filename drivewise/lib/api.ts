export async function getModelsByMake(make: string) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`,
  );

  const data = await res.json();
  return data.Results;
}

export async function getFuelEconomyData(
  make: string,
  model: string,
  year: string,
) {
  const res = await fetch(
    `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`,
  );

  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");

  const menuItems = Array.from(xml.getElementsByTagName("menuItem"));
  const firstVehicle = menuItems[0];

  if (!firstVehicle) {
    return null;
  }

  const vehicleId = firstVehicle.getElementsByTagName("value")[0]?.textContent;

  if (!vehicleId) {
    return null;
  }

  const vehicleRes = await fetch(
    `https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleId}`,
  );

  const vehicleText = await vehicleRes.text();
  const vehicleXml = parser.parseFromString(vehicleText, "text/xml");

  return {
    cityMpg: vehicleXml.getElementsByTagName("city08")[0]?.textContent || "N/A",
    highwayMpg:
      vehicleXml.getElementsByTagName("highway08")[0]?.textContent || "N/A",
    fuelType:
      vehicleXml.getElementsByTagName("fuelType")[0]?.textContent || "N/A",
    drive: vehicleXml.getElementsByTagName("drive")[0]?.textContent || "N/A",
  };
}
