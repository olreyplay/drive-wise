"use client";

import { useState } from "react";
import Container from "@/components/Container";
import CarSelectionForm from "@/components/CarSelectionForm";

type SelectedCar = {
  make: string;
  model: string;
  year: string;
} | null;

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<SelectedCar>(null);

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

        <CarSelectionForm onExplore={setSelectedCar} />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Results</h2>

          {!selectedCar && (
            <p className="text-sm text-slate-500">
              Select a car and click Explore Car to see the summary.
            </p>
          )}

          {selectedCar && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                Selected Car
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                {selectedCar.year} {selectedCar.make} {selectedCar.model}
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                This is the car you selected. In the next steps, this result
                area will show fuel economy data, cost estimates, and more
                details.
              </p>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
