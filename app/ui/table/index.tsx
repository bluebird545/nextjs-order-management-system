type TableProps = {
  children: React.ReactNode
}

export default function Table({ children }: TableProps) {
  return (
    <div className="w-full border border-slate-200 bg-white dark:bg-slate-700 rounded-md dark:border-slate-500">
      <table className="w-full text-left text-slate-800 dark:text-slate-200">
        {children}
      </table>
    </div>
  )
}