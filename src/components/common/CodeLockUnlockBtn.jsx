import { Code2 } from "lucide-react";
import { useSelector } from "react-redux";

const CodeLockUnlockBtn = ({ unlocked, setModalOpen }) => {
    const { isGray } = useSelector((state) => state.user);
    return (
        <button
            onClick={() => unlocked ? null : setModalOpen(true)}
            className={`flex items-center gap-2 ${unlocked ? "" : "cursor-pointer"} rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${isGray
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                }`}
        >
            <Code2 size={16} />
            {unlocked ? "Code Unlocked" : "Get Code"}
        </button>
    )
}

export default CodeLockUnlockBtn