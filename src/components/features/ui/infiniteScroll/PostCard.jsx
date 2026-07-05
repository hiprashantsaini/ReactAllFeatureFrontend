import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

/**
 * PostCard
 * A realistic feed-style card (avatar, name, time, text, like/comment
 * counts) instead of a plain "data" placeholder — makes the infinite
 * scroll demo below feel like an actual social feed.
 */
const PostCard = ({ post, isGray, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      className={`rounded-xl border p-4 ${
        isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={post.avatar} alt={post.name} className="h-9 w-9 rounded-full object-cover" />
        <div>
          <p className={`text-sm font-semibold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
            {post.name}
          </p>
          <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>{post.time}</p>
        </div>
      </div>

      <p className={`mt-3 text-sm leading-relaxed ${isGray ? "text-slate-300" : "text-slate-600"}`}>
        {post.text}
      </p>

      <div className={`mt-3 flex items-center gap-4 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
        <span className="flex items-center gap-1">
          <Heart size={13} /> {post.likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle size={13} /> {post.comments}
        </span>
      </div>
    </motion.div>
  );
};

export default PostCard;