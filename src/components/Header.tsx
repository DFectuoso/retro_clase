import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center">
          <span>RetroFeedback</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link 
                href="/create" 
                className="px-4 py-2 rounded bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Crear Feedback
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 