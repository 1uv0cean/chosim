import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-light tracking-wide">
            초심
          </h1>
          <p className="text-lg text-slate-400 font-light">
            A space for reflecting on your original intentions
          </p>
        </div>

        <div className="space-y-6">
          <Link
            href="/journal"
            className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg text-slate-100 font-medium"
          >
            Begin Reflection
          </Link>
          
          <div className="text-slate-500">
            <Link 
              href="/entries"
              className="hover:text-slate-300 transition-colors"
            >
              View Past Reflections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
