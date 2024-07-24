import { Link } from 'react-router-dom'
export default function Header() {
    return (
        <nav className='w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center'>
            <Link to="/" >
                <h2 className='font-bold select-none'>CodePaint</h2>
            </Link>
        </nav>
    )
}
