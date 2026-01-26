export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-infinity loading-lg text-primary"></span>
        <p className="text-xs font-mono text-base-content/50 tracking-widest animate-pulse">CARGANDO ECOSISTEMA V7...</p>
      </div>
    </div>
  );
}
