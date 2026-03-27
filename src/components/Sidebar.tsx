"use client";

import { useState, useRef, useEffect } from "react";
import { Case } from "@/lib/types";

interface SidebarProps {
  cases: Case[];
  selectedCase: Case | null;
  onSelectCase: (c: Case) => void;
}

export default function Sidebar({ cases = [], selectedCase, onSelectCase }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = cases.filter((c) =>
    c?.case_number?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-60 min-w-[240px] bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs text-gray-500 font-medium mb-2">Select a Case</p>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left px-3 py-2 border border-gray-300 rounded bg-white text-sm flex justify-between items-center hover:border-gray-400 transition-colors"
          >
            <span className={selectedCase ? "text-gray-900" : "text-gray-400"}>
              {selectedCase?.case_number || "Select..."}
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filtered.length === 0 && (
                  <p className="px-3 py-2 text-sm text-gray-400">No cases found</p>
                )}
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCase(c);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-amber-50 transition-colors ${selectedCase?.id === c.id ? "bg-amber-50 text-amber-700 font-medium" : "text-gray-700"
                      }`}
                  >
                    {c.case_number}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCase(c)}
            className={`w-full text-left px-4 py-2.5 text-sm border-b border-gray-50 hover:bg-gray-50 transition-colors ${selectedCase?.id === c.id ? "bg-amber-50 text-amber-700 font-medium border-l-2 border-l-amber-400" : "text-gray-600"
              }`}
          >
            {c.case_number}
          </button>
        ))}
      </div>
    </aside>
  );
}
