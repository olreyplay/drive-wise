"use client";

import { useState } from "react";
import Container from "@/components/Container";
import CarSelectionForm from "@/components/CarSelectionForm";
import { getFuelEconomyData } from "@/lib/api";

type SelectedCar = {
  make: string;
  model: string;
  year: string;
  cityMpg?: string;
  highwayMpg?: string;
  fuelType?: string;
  drive?: string;
} | null;

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<SelectedCar>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyMiles, setMonthlyMiles] = useState("1000");
  const [fuelPrice, setFuelPrice] = useState("3.5");

  const cityMpg = Number(selectedCar?.cityMpg || 0);
  const monthlyMilesValue = Number(monthlyMiles);
  const fuelPriceValue = Number(fuelPrice);

  const monthlyFuelCost =
    cityMpg > 0 ? (monthlyMilesValue / cityMpg) * fuelPriceValue : 0;

  const yearlyFuelCost = monthlyFuelCost * 12;

  async function handleExplore(car: {
    make: string;
    model: string;
    year: string;
  }) {
    setIsLoading(true);

    const fuelData = await getFuelEconomyData(car.make, car.model, car.year);

    setSelectedCar({
      ...car,
      cityMpg: fuelData?.cityMpg || "N/A",
      highwayMpg: fuelData?.highwayMpg || "N/A",
      fuelType: fuelData?.fuelType || "N/A",
      drive: fuelData?.drive || "N/A",
    });

    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <Container>
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">DriveWise</h1>
            <p className="text-sm text-slate-500">
              Explore Cars And Estimate Real Costs
            </p>
          </div>

          <div className="rounded-full bg-blue-600/10 px-4 py-1 text-sm font-medium text-blue-700">
            Beta
          </div>
        </header>

        <CarSelectionForm onExplore={handleExplore} />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Results</h2>

          {!selectedCar && !isLoading && (
            <p className="text-sm text-slate-500">
              Select a car and click Explore Car to see fuel economy details.
            </p>
          )}

          {isLoading && (
            <p className="text-sm text-slate-500">
              Loading fuel economy data...
            </p>
          )}

          {selectedCar && !isLoading && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                Selected Car
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                {selectedCar.year} {selectedCar.make} {selectedCar.model}
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">City MPG</p>
                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {selectedCar.cityMpg}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Highway MPG</p>
                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {selectedCar.highwayMpg}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Fuel Type</p>
                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {selectedCar.fuelType}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Drive Type</p>
                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {selectedCar.drive}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-800">
                  Fuel Cost Calculator
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Adjust the numbers below to estimate your fuel costs.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="monthlyMiles"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Miles Per Month
                    </label>

                    <input
                      id="monthlyMiles"
                      type="number"
                      value={monthlyMiles}
                      onChange={(e) => setMonthlyMiles(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fuelPrice"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Fuel Price Per Gallon
                    </label>

                    <input
                      id="fuelPrice"
                      type="number"
                      step="0.1"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      Estimated Monthly Fuel Cost
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      ${monthlyFuelCost.toFixed(2)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      Estimated Yearly Fuel Cost
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      ${yearlyFuelCost.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
