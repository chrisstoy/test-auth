export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 border border-slate-200 rounded-lg">
      <div className="p-4">{children}</div>
    </div>
  );
}
