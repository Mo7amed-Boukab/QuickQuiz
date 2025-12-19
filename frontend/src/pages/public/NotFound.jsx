import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(239,68,68,0.1)] text-[#991b1b] text-2xl font-semibold mb-6">
          404
        </div>
        <h1 className="text-3xl font-semibold text-[#1a1a1a] mb-3">
          Page introuvable
        </h1>
        <p className="text-base text-[#737373] mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée. Vérifiez
          l'URL ou revenez à l'accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-4 py-2 bg-[#1a1a1a] text-white rounded text-sm hover:bg-black transition-colors"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/admin/questions"
            className="px-4 py-2 border border-[#e5e5e5] text-sm rounded hover:bg-[rgba(0,0,0,0.02)] transition-colors"
          >
            Espace admin
          </Link>
        </div>
      </div>
    </div>
  );
}
