import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, RotateCcw, PartyPopper } from "lucide-react";
import PostCard from "./PostCard";

const names = ["Aman Verma", "Priya Nair", "Karan Bhatt", "Sneha Gupta", "Rahul Joshi", "Ananya Singh", "Vikram Rao", "Neha Kapoor"];
const times = ["Just now", "5m ago", "1h ago", "3h ago", "Yesterday", "2d ago"];
const texts = [
  "Just shipped a new feature page on ReactAllCodeAndFeatures 🎉",
  "Turns out IntersectionObserver is way smoother than a scroll listener.",
  "Pro tip: use a ref to avoid stale state inside scroll handlers 🙌",
  "Tailwind + Framer Motion is a seriously underrated combo for fast UI.",
  "Finally understood closures while debugging my own infinite scroll bug 😅",
  "Building in public — day 12 of learning React.",
  "MERN feels so much more intuitive once you build a few real projects.",
  "Refactored my carousel for the third time today. Worth it though.",
];

// Pretend API call — swap this for a real fetch("/api/posts?page=...") later.
const generatePosts = (start, count) =>
  Array.from({ length: count }, (_, i) => {
    const n = start + i;
    return {
      id: n,
      name: names[n % names.length],
      avatar: `https://i.pravatar.cc/100?img=${(n % 70) + 1}`,
      time: times[n % times.length],
      text: texts[n % texts.length],
      likes: 12 + ((n * 7) % 80),
      comments: 2 + ((n * 3) % 15),
    };
  });

const PAGE_SIZE = 6;
const MAX_POSTS = 30;

const InfiniteScrollDemo = ({ isGray }) => {
  const [posts, setPosts] = useState(() => generatePosts(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const sentinelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [loading, hasMore]);

  const fetchMore = useCallback(() => {
    if (loadingRef.current || !hasMoreRef.current) return;
    setLoading(true);

    setTimeout(() => {
      setPosts((prev) => {
        const updated = [...prev, ...generatePosts(prev.length, PAGE_SIZE)];
        if (updated.length >= MAX_POSTS) setHasMore(false);
        return updated;
      });
      setLoading(false);
    }, 900);
  }, []);

  // Watches a tiny sentinel div at the bottom of the scrollable list.
  // `root` is the scroll container itself (not the window) since this
  // demo lives inside one card on a longer page.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore();
      },
      { root: containerRef.current, rootMargin: "80px", threshold: 0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchMore]);

  const handleReset = () => {
    setPosts(generatePosts(0, PAGE_SIZE));
    setHasMore(true);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`overflow-hidden rounded-2xl border ${isGray ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white"}`}>
      {/* header */}
      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          isGray ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <span className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          Live Feed · scroll inside this box
        </span>
        <button
          onClick={handleReset}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
            isGray ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* scrollable feed */}
      <div ref={containerRef} className="h-[26rem] space-y-3 overflow-y-auto p-4">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} isGray={isGray} index={i} />
        ))}

        {/* sentinel — invisible, the observer watches this */}
        <div ref={sentinelRef} className="h-1 w-full" />

        {hasMore ? (
          loading && (
            <div className={`flex items-center justify-center gap-2 py-6 text-sm ${isGray ? "text-slate-400" : "text-slate-500"}`}>
              <Loader2 size={16} className="animate-spin" />
              Loading more posts...
            </div>
          )
        ) : (
          <div className={`flex items-center justify-center gap-2 py-6 text-sm ${isGray ? "text-slate-400" : "text-slate-500"}`}>
            <PartyPopper size={16} />
            You've reached the end
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollDemo;