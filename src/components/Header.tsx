import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="w-full h-[60px] bg-gray-900 text-white px-6 flex justify-between items-center border-b border-white">
            <Link to="/" className="flex items-center gap-2">
                <h2 className="font-bold text-lg select-none">CodePaint</h2>
            </Link>
        </nav>
    );
}
