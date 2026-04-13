import React from "react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
          <p className="text-slate-500">Analyze your business performance and insights.</p>
        </div>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          Export Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 h-32 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-50 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Analytics coming soon</h3>
        <p className="text-slate-500 max-w-xs mx-auto mt-2">
          We're working on powerful reporting tools to help you grow.
        </p>
      </div>
    </div>
  );
}
