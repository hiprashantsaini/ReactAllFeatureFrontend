// 📦 Requires the package below — see the note rendered next to "Show Code".
// npm install react-responsive-carousel

import { Carousel } from "react-responsive-carousel";
// This CSS is required for the package's default arrows/dots/thumbs to render correctly.
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=500&fit=crop",
];
/**
 * PackageCarousel
 * The same result as the two components above, but using a popular,
 * battle-tested package — arrows, dots, swipe and thumbnails all come
 * for free, you just pass props.
 */
const PackageCarousel = ({ isGray }) => {
  return (
    <div className={`overflow-hidden rounded-2xl border ${isGray ? "border-slate-800" : "border-slate-200"}`}>
      <Carousel
        showThumbs
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4000}
        swipeable
        emulateTouch
        showThumbs={false}
      >
        {images.map((src, i) => (
          <div key={i}>
            <img src={src} alt={`slide-${i}`} className="h-56 object-cover sm:h-72 lg:h-80" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PackageCarousel;