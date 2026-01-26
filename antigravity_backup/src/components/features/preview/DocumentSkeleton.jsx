"use client";

export default function DocumentSkeleton() {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-12 border border-slate-200 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between border-b pb-8 mb-8">
                <div className="w-20 h-20 bg-slate-200 rounded-full"></div>
                <div className="space-y-3 flex flex-col items-center w-1/2">
                    <div className="h-4 bg-slate-200 w-full rounded"></div>
                    <div className="h-4 bg-slate-200 w-3/4 rounded"></div>
                    <div className="h-4 bg-slate-200 w-1/2 rounded"></div>
                </div>
                <div className="w-20 h-20 bg-slate-200 rounded-full"></div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4 mb-12">
                <div className="h-8 bg-slate-200 w-1/3 rounded mb-6"></div>
                <div className="h-4 bg-slate-200 w-full rounded"></div>
                <div className="h-4 bg-slate-200 w-full rounded"></div>
                <div className="h-4 bg-slate-200 w-5/6 rounded"></div>
                <div className="h-4 bg-slate-200 w-full rounded"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-2 gap-6">
                <div className="h-40 bg-slate-100 rounded-lg p-4 space-y-3">
                    <div className="h-4 bg-slate-200 w-1/3 rounded"></div>
                    <div className="h-2 bg-slate-200 w-full rounded"></div>
                    <div className="h-2 bg-slate-200 w-full rounded"></div>
                </div>
                <div className="h-40 bg-slate-100 rounded-lg p-4 space-y-3">
                    <div className="h-4 bg-slate-200 w-1/3 rounded"></div>
                    <div className="h-2 bg-slate-200 w-full rounded"></div>
                    <div className="h-2 bg-slate-200 w-full rounded"></div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <span className="loading loading-spinner text-primary"></span>
                <p className="text-xs text-slate-400 mt-2 animate-bounce">Consultando Programas Oficiales MEP...</p>
            </div>
        </div>
    );
}
