import Container from "@/components/Container";
import CarSelectionForm from "@/components/CarSelectionForm";

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

        <CarSelectionForm />

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
