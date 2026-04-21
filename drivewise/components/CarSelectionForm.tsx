"use client";

import { useEffect, useState } from "react";
import { POPULAR_MAKES, YEARS } from "@/lib/data";
import { getModelsByMake } from "@/lib/api";

type Model = {
  Model_ID: number;
  Model_Name: string;
};

type CarSelectionFormProps = {
  onExplore: (car: { make: string; model: string; year: string }) => void;
};

export default function CarSelectionForm({ onExplore }: CarSelectionFormProps) {
  const [selectedMake, setSelectedMake] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (!selectedMake) {
      setModels([]);
      setSelectedModel("");
      return;
    }

    getModelsByMake(selectedMake).then((data: Model[]) => {
      setModels(data.slice(0, 50));
      setSelectedModel("");
    });
  }, [selectedMake]);

  function handleExplore() {
    if (!selectedMake || !selectedModel || !selectedYear) return;

    onExplore({
      make: selectedMake,
      model: selectedModel,
      year: selectedYear,
    });
  }

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="mb-1 text-lg font-semibold text-slate-800">
        Select A Car
      </h2>

      <p className="mb-6 text-sm text-slate-500">
        Choose a make, model, and year to explore vehicle details and fuel
        costs.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="make"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Make
          </label>

          <select
            id="make"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="">Select make</option>

            {POPULAR_MAKES.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="model"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Model
          </label>

          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedMake}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="">
              {selectedMake ? "Select model" : "Choose make first"}
            </option>

            {models.map((model) => (
              <option key={model.Model_ID} value={model.Model_Name}>
                {model.Model_Name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Year
          </label>

          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="">Select year</option>

            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleExplore}
        disabled={!selectedMake || !selectedModel || !selectedYear}
        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Explore Car
      </button>
    </section>
  );
}
