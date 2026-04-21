import Container from "@/components/Container";

export default function Home() {
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option>Select make</option>
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option>Select model</option>
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option>Select year</option>
              </select>
            </div>
          </div>

          <button className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
            Explore Car
          </button>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Results</h2>

          <p className="text-sm text-slate-500">
            Car data and insights will appear here.
          </p>

          <div className="mt-4 h-32 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50" />
        </section>
      </Container>
    </main>
  );
}
