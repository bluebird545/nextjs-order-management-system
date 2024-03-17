import Navbar from "../ui/common/navbar";
import Sidebar from "../ui/common/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="bg-slate-200/10 flex-1 pt-24 px-4 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto">
            { children }
          </div>
        </div>
      </div>

    </div>
  )
}