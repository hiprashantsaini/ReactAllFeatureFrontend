# ReactAllCodeAndFeatures — HomePage

This is the **HomePage** (landing / summary page) for the *ReactAllCodeAndFeatures* project.
It introduces the app and previews every individual feature page that will be built
separately (carousel, breadcrumb, infinite scroll, etc).

## Folder structure

```
src/
  pages/
    HomePage.jsx
  components/
    home/
      Navbar.jsx
      HeroSection.jsx
      StatsSection.jsx
      FeatureCard.jsx
      FeaturesShowcase.jsx
      HowItWorks.jsx
      WhyChooseUs.jsx
      PricingAccess.jsx
      Testimonials.jsx
      CTASection.jsx
      Footer.jsx
```

## Install dependencies

```bash
npm install react-redux redux @reduxjs/toolkit react-router-dom framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Make sure `tailwind.config.js` content paths include your `src` folder:

```js
content: ["./index.html", "./src/**/*.{js,jsx}"],
```

## Redux store shape this page expects

`HomePage.jsx` reads the theme flag like this:

```jsx
const isGray = useSelector((state) => state.user.isGray);
```

So your `user` slice should at minimum look like:

```js
// store/userSlice.js
const initialState = { isGray: false /* , token, name, etc. */ };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/toggleTheme":
      return { ...state, isGray: !state.isGray };
    default:
      return state;
  }
}
```

And your root reducer combines it under the `user` key:

```js
import { combineReducers } from "redux";
import userReducer from "./userSlice";

export default combineReducers({ user: userReducer });
```

## Notes

- All images use free-to-use Unsplash photos, Lorem Picsum placeholders, and Pravatar
  generated avatars — no copyright issues.
- Every section is its own component for easy reuse/editing.
- `FeaturesShowcase.jsx` is the master list of feature cards — when you build a new
  feature page, just add one entry there and it shows up on the home page automatically.

## Feature pages

```
src/components/shared/
  PageBreadcrumb.jsx     -> mini "Home / Features / X" header used on every feature page
  CodeAccessModal.jsx    -> pricing modal that "unlocks" the code block
  CodeBlock.jsx          -> tabbed code viewer with locked/blurred state + copy button

src/components/features/
  carousel/CarouselDemo.jsx
  breadcrumb/BreadcrumbDemo.jsx

src/pages/features/
  CarouselPage.jsx     -> route: /features/carousel
  BreadcrumbPage.jsx   -> route: /features/breadcrumb
```

Add the routes in your router, e.g.:

```jsx
import CarouselPage from "./pages/features/CarouselPage";
import BreadcrumbPage from "./pages/features/BreadcrumbPage";

<Route path="/features/carousel" element={<CarouselPage />} />
<Route path="/features/breadcrumb" element={<BreadcrumbPage />} />
```

### How the "unlock" flow works right now

1. User clicks **Get Code** (header button) or **View plans** (inside the locked code block).
2. `CodeAccessModal` opens showing two plans: "This Feature Only" and "Pro Access".
3. Clicking a plan shows a 1.3s fake "Processing..." state, then calls `onSelectPlan`.
4. The page sets `unlocked = true`, the modal closes, and `CodeBlock` un-blurs the code.

When you're ready for real payments, replace the `setTimeout` inside
`CodeAccessModal.jsx` with an actual Razorpay flow:

```js
// 1. POST /api/payment/order   -> create a Razorpay order on your Express server
// 2. open Razorpay Checkout with that order id (window.Razorpay)
// 3. on success, POST /api/payment/verify -> verify signature, save "isPro"/"purchasedFeatures" on the user in MongoDB
// 4. only then call onSelectPlan() to unlock the code
```

Both feature pages show **two code versions**: a short "From Scratch" implementation
(so beginners understand exactly how it works) and a second tab using the most
popular npm package for that feature (`react-slick` for carousels,
`use-react-router-breadcrumbs` for breadcrumbs) for when you want something
production-ready fast.

## ImageCarousel.jsx — three carousels, one page

`src/pages/features/ImageCarousel.jsx` (route: `/features/image-carousel`) is a
richer version of the carousel feature: instead of two tabs in one code block,
it stacks **three full carousel implementations**, each with its own live demo
and its own "Show Code" toggle (powered by the new `CodeToggleSection.jsx`
shared component). One "Get Code" purchase still unlocks all three at once.

```
src/components/features/carousel/
  SimpleCarousel.jsx     -> variant 1: minimal state + buttons + dots
  AdvancedCarousel.jsx   -> variant 2: autoplay progress bar, drag/swipe, keyboard nav, thumbnails
  PackageCarousel.jsx    -> variant 3: built with the react-responsive-carousel package

src/components/shared/
  CodeToggleSection.jsx  -> demo + description + "Show Code" toggle + locked CodeBlock
```

Variant 3 needs one extra dependency:

```bash
npm install react-responsive-carousel
```

Add the route:

```jsx
import ImageCarouselPage from "./pages/features/ImageCarousel";

<Route path="/features/image-carousel" element={<ImageCarouselPage />} />
```

> Note: `CarouselPage.jsx` (the earlier two-tab version) is still in the project —
> keep it or delete it, `ImageCarousel.jsx` is the more complete replacement.

## InfiniteScrollPage.jsx

`src/pages/features/InfiniteScrollPage.jsx` (route: `/features/infinite-scroll`)
follows the original two-tab pattern (one live demo, two code tabs):

```
src/components/features/infinite-scroll/
  PostCard.jsx             -> realistic feed-style card (avatar, time, text, likes/comments)
  InfiniteScrollDemo.jsx   -> live demo, scoped to its own scroll container via IntersectionObserver
```

Code tabs:
- **Custom** — the classic `window.scroll` listener + scroll-position math approach.
- **With IntersectionObserver** — watches a tiny sentinel `div` instead, marked "recommended" since it's cheaper on performance.

The live demo intentionally scrolls inside its own card (not the whole window) so it
doesn't take over the page — the "Custom" code tab still teaches the standard
full-page `window` scroll version since that's what you'll actually use in a real app.

Add the route:

```jsx
import InfiniteScrollPage from "./pages/features/InfiniteScrollPage";

<Route path="/features/infinite-scroll" element={<InfiniteScrollPage />} />
```