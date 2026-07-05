import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Card = ({ item, i }) => {
  return (
    <div className="w-full h-48 border border-red-500 mb-4 p-6">
    <p>
      {item} {i + 1}
    </p>
  </div>
  )
};

const InfiniteScrollPage = () => {
  const [data, setData] = useState(Array(6).fill("data"));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  const fetchData = async () => {
    try {
      if (loadingRef.current) return;
      //Do api call here
      setLoading(true);
      setTimeout(() => {
        setData((prev) => {
          const updated = [
            ...prev,...Array(6).fill("data")
          ];
          if (updated.length > 50) {
            setHasMore(false);
          }
          return updated;
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.log("Fetch error :", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollTop > documentHeight - 100) {
        if (loadingRef.current || !hasMoreRef.current) return;
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [loading, hasMore]);
  return (
    <div className="w-full p-6">
      {data.map((item, i) => (
        <Card key={`${item}-${i}`} item={item} i={i}/>
      ))}

      {hasMore ? ( loading &&
        <div className="w-full h-48 flex pt-12 justify-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="w-full h-48 flex pt-12 justify-center">
          <p>No more data</p>
        </div>
      )}

      <div
        onClick={() => {
          setData(["data", "data", "data", "data", "data", "data"]);
          window.scrollTo(0, 0);
          setHasMore(true);
        }}
        className="fixed z-10 cursor-pointer right-5 bottom-5 bg-amber-300 px-4 py-1 rounded-2xl"
      >
        Reset
      </div>
    </div>
  );
};

export default InfiniteScrollPage;
