"use client";

import { useState } from "react";
import { AlertCard } from "@/components/AlertCard";
import { getAlertsByPoint, type Alert } from "@/lib/api";

export default function HomePage() {
  const [lat, setLat] = useState("39.0997");
  const [lon, setLon] = useState("-94.5786");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch() {
    setIsLoading(true);
    setErrorMessage("");
    setHasSearched(true);

    try {
      const data = await getAlertsByPoint(Number(lat), Number(lon));
      setAlerts(data);
    } catch {
      setAlerts([]);
      setErrorMessage(
        "Could not load alerts. Make sure the FastAPI backend is running on http://127.0.0.1:8000."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            StormSignal
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            Official Weather Alert Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Search by coordinates to see active National Weather Service alerts,
            severity levels, and plain-English explanations.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Latitude
              </span>
              <input
                value={lat}
                onChange={(event) => setLat(event.target.value)}
                className="rounded-lg border px-3 py-2 outline-none focus:border-slate-500"
                placeholder="39.0997"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Longitude
              </span>
              <input
                value={lon}
                onChange={(event) => setLon(event.target.value)}
                className="rounded-lg border px-3 py-2 outline-none focus:border-slate-500"
                placeholder="-94.5786"
              />
            </label>

            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="self-end rounded-lg bg-slate-900 px-5 py-2 font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? "Loading..." : "Get Alerts"}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}
        </section>

        <section className="space-y-4">
          {!hasSearched && (
            <div className="rounded-xl border border-dashed bg-white p-8 text-center text-slate-500">
              Enter a latitude and longitude, then click Get Alerts.
            </div>
          )}

          {hasSearched && !isLoading && alerts.length === 0 && !errorMessage && (
            <div className="rounded-xl border border-dashed bg-white p-8 text-center text-slate-500">
              No active alerts found for this location.
            </div>
          )}

          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </section>
      </div>
    </main>
  );
}