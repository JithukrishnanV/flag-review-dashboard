"use client";

import { useState } from "react";
import { Flag } from "@/lib/types";

interface FlagCardProps {
  flag: Flag;
  onAction: (flagId: number, action: string, notes: string) => Promise<void>;
}

const categoryColors: Record<string, string> = {
  "UNEARNED INCOME": "bg-gray-100 text-gray-700 border border-gray-300",
  "INCOME COMPLETENESS": "bg-gray-100 text-gray-700 border border-gray-300",
  "SHELTER COSTS": "bg-blue-50 text-blue-700 border border-blue-200",
  "MEDICAL EXPENSES": "bg-purple-50 text-purple-700 border border-purple-200",
  "HOUSEHOLD COMPOSITION": "bg-green-50 text-green-700 border border-green-200",
  "RESOURCE VERIFICATION": "bg-orange-50 text-orange-700 border border-orange-200",
  "ELIGIBILITY": "bg-teal-50 text-teal-700 border border-teal-200",
  "DEPENDENT CARE": "bg-pink-50 text-pink-700 border border-pink-200",
  "DATA INTEGRITY": "bg-red-50 text-red-700 border border-red-200",
  "TIMELINESS": "bg-yellow-50 text-yellow-700 border border-yellow-200",
};

function StatusBadge({ status }: { status: string }) {
  if (status === "REVIEWED") {
    return <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-700">REVIEWED</span>;
  }
  if (status === "REJECTED") {
    return <span className="text-xs font-medium px-2 py-0.5 rounded bg-red-100 text-red-700">REJECTED</span>;
  }
  return <span className="text-xs font-medium px-2 py-0.5 rounded text-amber-600">PENDING REVIEW</span>;
}

export default function FlagCard({ flag, onAction }: FlagCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(flag.notes || "");
  const [loading, setLoading] = useState(false);
  const isActioned = flag.status === "REVIEWED" || flag.status === "REJECTED";

  async function handleAction(action: string) {
    setLoading(true);
    try {
      await onAction(flag.id, action, notes);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`border rounded-lg mb-3 overflow-hidden transition-all ${
      isActioned ? "border-gray-200 bg-gray-50" : "border-amber-200 bg-amber-50/30"
    }`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-amber-50/50 transition-colors"
      >
        <div className="flex items-center gap-2 flex-wrap pr-4">
          <span className="font-medium text-sm text-gray-900">{flag.title}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[flag.category] || "bg-gray-100 text-gray-600"}`}>
            {flag.category}
          </span>
          <StatusBadge status={flag.status} />
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">What the Budget Screen shows:</p>
            <p className="text-sm text-gray-700">{flag.budget_screen_info}</p>
          </div>

          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">What the Case File shows:</p>
            <p className="text-sm text-gray-700">{flag.case_file_info}</p>
          </div>

          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">What this means:</p>
            <div className="bg-white border border-gray-200 rounded p-3">
              <p className="text-sm text-gray-700">{flag.explanation}</p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">Reviewer Notes:</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isActioned}
              placeholder="Add notes here..."
              className="w-full text-sm border border-gray-200 rounded p-2 h-16 resize-none focus:outline-none focus:border-amber-400 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          {!isActioned && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleAction("CONFIRMED")}
                disabled={loading}
                className="px-4 py-1.5 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
              >
                {loading ? "..." : "Confirm"}
              </button>
              <button
                onClick={() => handleAction("REJECTED")}
                disabled={loading}
                className="px-4 py-1.5 bg-white text-gray-700 text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                {loading ? "..." : "Reject"}
              </button>
            </div>
          )}

          {isActioned && (
            <div className="mt-3 text-xs text-gray-500">
              {flag.status === "REVIEWED" ? "Confirmed" : "Rejected"} on{" "}
              {flag.reviewed_at ? new Date(flag.reviewed_at).toLocaleDateString() : "—"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
