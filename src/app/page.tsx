"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import FlagCard from "@/components/FlagCard";
import { Case, Flag } from "@/lib/types";

export default function Home() {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [flags, setFlags] = useState<Flag[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const [loadingFlags, setLoadingFlags] = useState(false);

  useEffect(() => {
    fetch("/api/cases")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch cases");
        return res.json();
      })
      .then((data) => {
        setCases(Array.isArray(data) ? data : []);
        setLoadingCases(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cases:", err);
        setCases([]);
        setLoadingCases(false);
      });
  }, []);

  const loadFlags = useCallback((caseItem: Case) => {
    setLoadingFlags(true);
    fetch(`/api/cases/${caseItem.id}/flags`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch flags");
        return res.json();
      })
      .then((data) => {
        setFlags(Array.isArray(data) ? data : []);
        setLoadingFlags(false);
      })
      .catch((err) => {
        console.error("Failed to fetch flags:", err);
        setFlags([]);
        setLoadingFlags(false);
      });
  }, []);

  function handleSelectCase(c: Case) {
    setSelectedCase(c);
    loadFlags(c);
  }

  async function handleFlagAction(flagId: number, action: string, notes: string) {
    const res = await fetch(`/api/flags/${flagId}/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, notes }),
    });

    if (res.ok) {
      if (selectedCase) {
        loadFlags(selectedCase);
      }
      const casesRes = await fetch("/api/cases");
      if (casesRes.ok) {
        const updatedCases = await casesRes.json();
        if (Array.isArray(updatedCases)) {
          setCases(updatedCases);
          const updated = updatedCases.find((c: Case) => c.id === selectedCase?.id);
          if (updated) setSelectedCase(updated);
        }
      }
    }
  }

  const totalFlags = selectedCase ? Number(selectedCase.total_flags) : 0;
  const reviewedFlags = selectedCase ? Number(selectedCase.reviewed_flags) : 0;

  return (
    <div className="flex h-screen bg-gray-50">
      {loadingCases ? (
        <aside className="w-60 min-w-[240px] bg-white border-r border-gray-200 flex items-center justify-center">
          <p className="text-sm text-gray-400">Loading...</p>
        </aside>
      ) : (
        <Sidebar cases={cases} selectedCase={selectedCase} onSelectCase={handleSelectCase} />
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <h1 className="text-lg font-semibold text-gray-900">Flag Review Oversight Dashboard</h1>
        </header>

        <div className="flex-1 overflow-y-auto custom-scroll p-6">
          {!selectedCase ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">Select a case from the sidebar to view its flags.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{selectedCase.case_number}</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  {totalFlags} FLAG{totalFlags !== 1 ? "S" : ""}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {reviewedFlags}/{totalFlags} REVIEWED
                </span>
              </div>

              {loadingFlags ? (
                <p className="text-sm text-gray-400">Loading flags...</p>
              ) : flags.length === 0 ? (
                <p className="text-sm text-gray-400">No flags for this case.</p>
              ) : (
                <div>
                  {flags.map((flag) => (
                    <FlagCard key={flag.id} flag={flag} onAction={handleFlagAction} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
