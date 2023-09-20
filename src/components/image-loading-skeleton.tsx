import { Skeleton } from "./ui/skeleton";

export default function ImageLoadingSkeleton() {
  const arr = new Array(20);
  arr.fill(0);
  return (
    <div className="">
      <p className="text-slate-500 text-center mb-4">Loading images...</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {arr.map((_, idx) => (
          <Skeleton key={idx} className="w-[200px] h-[200px]" />
        ))}
      </div>
    </div>
  );
}
