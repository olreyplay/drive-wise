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
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
