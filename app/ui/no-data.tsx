export default function NoDataError({ type }: { type: string }) {
  return (
    <div className="w-full border border-slate-200 bg-white dark:bg-slate-700 rounded-md dark:border-slate-500">
      <div className="w-full p-8 text-center text-slate-800 dark:text-slate-200">
        <p className="text-2xl">No {type}</p>
      </div>
    </div>
  )
}