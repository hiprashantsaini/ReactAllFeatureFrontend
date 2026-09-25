import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export const BackToHomeBtn = () => {
    return (
        <Link to={"/"} className="text-[11px] text-(--secondary-text) flex items-center cursor-pointer hover:text-(--accent-color1) font-semibold">
            <ChevronLeft className="size-4" /> Back
        </Link>
    )
}
