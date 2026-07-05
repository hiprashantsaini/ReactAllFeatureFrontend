import  { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowDownToLine, Code2, Layers, Sparkles, MonitorSmartphone } from "lucide-react";

import CodeBlock from "../../../components/common/CodeBlock";
import CodeAccessModal from "../../../components/common/CodeAccessModal";
import InfiniteScrollDemo from "../../../components/features/ui/infiniteScroll/InfiniteScrollDemo";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";

const useCases = ["Social media feeds", "Product listing pages", "Search results", "Notification lists"];

const customCode = `import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// 🔧 Replace this with a real API call, e.g. fetch("/api/posts?page=...")
const generatePosts = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: "User " + (start + i + 1),
    text: "This is dummy post content #" + (start + i + 1),
  }));

const PostCard = ({ post }) => (
  <div className="mb-4 w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="font-semibold">{post.name}</p>
    <p className="mt-1 text-sm text-slate-600">{post.text}</p>
  </div>
);

const InfiniteScrollPage = () => {
  const [posts, setPosts] = useState(generatePosts(0, 6));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Refs avoid stale "loading"/"hasMore" values inside the scroll listener
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  const fetchMore = async () => {
    try {
      if (loadingRef.current) return;
      setLoading(true);

      // 🔧 Simulated network delay — swap for a real API call
      setTimeout(() => {
        setPosts((prev) => {
          const updated = [...prev, ...generatePosts(prev.length, 6)];
          if (updated.length >= 50) setHasMore(false);
          return updated;
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // Trigger 100px before actually hitting the bottom
      if (windowHeight + scrollTop > documentHeight - 100) {
        if (loadingRef.current || !hasMoreRef.current) return;
        fetchMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [loading, hasMore]);

  return (
    <div className="w-full p-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore ? (
        loading && (
          <div className="flex h-24 w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )
      ) : (
        <div className="flex h-24 w-full items-center justify-center">
          <p className="text-sm text-slate-500">No more posts</p>
        </div>
      )}

      <button
        onClick={() => {
          setPosts(generatePosts(0, 6));
          setHasMore(true);
          window.scrollTo(0, 0);
        }}
        className="fixed bottom-5 right-5 z-10 rounded-full bg-amber-400 px-4 py-2 text-sm font-medium"
      >
        Reset
      </button>
    </div>
  );
};

export default InfiniteScrollPage;`;

const observerCode = `import { Loader } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// 🔧 Replace this with a real API call, e.g. fetch("/api/posts?page=...")
const generatePosts = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: "User " + (start + i + 1),
    text: "This is dummy post content #" + (start + i + 1),
  }));

const PostCard = ({ post }) => (
  <div className="mb-4 w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="font-semibold">{post.name}</p>
    <p className="mt-1 text-sm text-slate-600">{post.text}</p>
  </div>
);

const InfiniteScrollPage = () => {
  const [posts, setPosts] = useState(generatePosts(0, 6));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const sentinelRef = useRef(null);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [loading, hasMore]);

  const fetchMore = useCallback(() => {
    if (loadingRef.current || !hasMoreRef.current) return;
    setLoading(true);

    // 🔧 Simulated network delay — swap for a real API call
    setTimeout(() => {
      setPosts((prev) => {
        const updated = [...prev, ...generatePosts(prev.length, 6)];
        if (updated.length >= 50) setHasMore(false);
        return updated;
      });
      setLoading(false);
    }, 800);
  }, []);

  // No scroll-position math needed — the observer just watches a tiny
  // "sentinel" div and fires when it scrolls into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore();
      },
      { rootMargin: "100px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchMore]);

  return (
    <div className="w-full p-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Invisible marker the observer watches */}
      <div ref={sentinelRef} className="h-1 w-full" />

      {hasMore ? (
        loading && (
          <div className="flex h-24 w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )
      ) : (
        <div className="flex h-24 w-full items-center justify-center">
          <p className="text-sm text-slate-500">No more posts</p>
        </div>
      )}

      <button
        onClick={() => {
          setPosts(generatePosts(0, 6));
          setHasMore(true);
          window.scrollTo(0, 0);
        }}
        className="fixed bottom-5 right-5 z-10 rounded-full bg-amber-400 px-4 py-2 text-sm font-medium"
      >
        Reset
      </button>
    </div>
  );
};

export default InfiniteScrollPage;`;

const InfiniteScrollPage = () => {
  const isGray = useSelector((state) => state.user.isGray);
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isGray ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar isGray={isGray} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <PageBreadcrumb isGray={isGray} current="Infinite Scroll" /> */}

        {/* header */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isGray
                  ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300"
                  : "bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-600"
              }`}
            >
              <ArrowDownToLine size={22} />
            </span>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                Infinite Scroll
              </h1>
              <p className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                Data · Performance
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
              isGray
                ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
            }`}
          >
            <Code2 size={16} />
            {unlocked ? "Code Unlocked" : "Get Code"}
          </button>
        </div>

        {/* definition */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-8 rounded-2xl border p-6 ${
            isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
          }`}
        >
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <Layers size={15} />
            What is Infinite Scroll?
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
            <strong>Infinite scroll</strong> automatically loads more items as the user
            nears the bottom of a list, instead of forcing them to click a "Next page"
            button. It keeps people in flow — perfect for feeds, catalogs, and search
            results where browsing should feel endless.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {useCases.map((u) => (
              <span
                key={u}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isGray ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                {u}
              </span>
            ))}
          </div>
        </motion.section>

        {/* live demo */}
        <section className="mt-8">
          <h2 className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <MonitorSmartphone size={15} />
            Live Preview
          </h2>
          <InfiniteScrollDemo isGray={isGray} />
          <p className={`mt-2 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
            Scroll inside the box above — new posts load automatically near the bottom.
          </p>
        </section>

        {/* code */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
              <Sparkles size={15} />
              Get the Code
            </h2>
            {unlocked && (
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
                ✓ Unlocked
              </span>
            )}
          </div>

          <CodeBlock
            isGray={isGray}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
            tabs={[
              { id: "custom", label: "Custom", code: customCode },
              { id: "observer", label: "With IntersectionObserver", badge: "recommended", code: observerCode },
            ]}
          />
        </section>
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Infinite Scroll"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default InfiniteScrollPage;