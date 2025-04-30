import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#0F2642] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="bg-[#E3562A] rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <span className="text-sm">RF</span>
          </span>
          <span className="text-[#F2ECDF]">RetroFeedback</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link 
                href="/create" 
                className="px-4 py-2 rounded-lg bg-[#E3562A] text-white font-medium hover:bg-[#CC3B36] transition-colors shadow-md"
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