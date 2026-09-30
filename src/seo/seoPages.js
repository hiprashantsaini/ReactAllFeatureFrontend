export const seoPages = {
  "/": {
    title: "Practical React & MERN Examples",
    description:
      "Learn React and MERN patterns through practical, interactive feature demos and copy-ready code examples for everyday development.",
  },
  "/features/image-carousel": {
    title: "React Image Carousel Examples",
    description:
      "Explore responsive React image carousel examples with autoplay, swipe gestures, navigation controls, and ready-to-study source code.",
  },
  "/features/infinite-scroll": {
    title: "React Infinite Scroll Tutorial",
    description:
      "Learn React infinite scrolling with working feed demos, pagination patterns, and examples using scroll events and Intersection Observer.",
  },
  "/features/infinite-scroll2": {
    title: "React Infinite Scroll Tutorial",
    description:
      "Learn React infinite scrolling with working feed demos and Intersection Observer examples.",
    canonicalPath: "/features/infinite-scroll",
    noIndex: true,
  },
  "/features/accordion": {
    title: "React Accordion and FAQ Examples",
    description:
      "Build accessible React accordions and FAQ sections with animated panels, reusable components, and practical code examples.",
  },
  "/features/tabs": {
    title: "React Tabs Component Examples",
    description:
      "Study reusable React tabs with accessible controls, animated active states, and interactive examples with source code.",
  },
  "/features/modal": {
    title: "React Modal and Dialog Examples",
    description:
      "Explore reusable React modal and dialog patterns with interactive demos, accessible behavior, and copy-ready examples.",
  },
  "/features/toast": {
    title: "React Toast Notification Examples",
    description:
      "Learn to build React toast notifications with stacked messages, timed dismissal, and practical interactive examples.",
  },
  "/features/demo-auth": {
    title: "React Authentication Demo",
    description: "Interactive authentication flow demonstration.",
    noIndex: true,
  },
  "/react-native": {
    title: "React Native Setup Commands",
    description:
      "A practical React Native setup reference with commands and notes for getting a mobile app project started.",
    canonicalPath: "/react-native/setup-commands",
    noIndex: true,
  },
  "/react-native/setup-commands": {
    title: "React Native Setup Commands",
    description:
      "Reference React Native setup commands, project initialization steps, and useful development environment notes.",
  },
  "/react-native/build-commands": {
    title: "React Native Build Commands",
    description:
      "Find React Native build commands and practical notes for creating Android and iOS app builds.",
  },
  "/react-native/image-viewer": {
    title: "React Native Image Viewer Guide",
    description:
      "Explore implementation notes and reusable patterns for displaying and navigating images in React Native.",
  },
  "/react-native/bottom-sheet": {
    title: "React Native Bottom Sheet Guide",
    description:
      "Learn reusable React Native bottom sheet patterns, setup notes, and interaction guidance.",
  },
  "/react-native/bottom-tabs": {
    title: "React Native Bottom Tabs Guide",
    description:
      "Set up bottom tab navigation in React Native with practical notes and reusable implementation patterns.",
  },
  "/react-native/refresh-screen-data": {
    title: "Refresh Screen Data in React Native",
    description:
      "Learn practical patterns for refreshing screen data in React Native applications.",
  },
  "/react-native/simple-reusable-animation": {
    title: "Reusable React Native Animations",
    description:
      "Explore a simple reusable animation pattern for React Native interfaces with practical implementation notes.",
  },
  "/react-native/navigation-setup": {
    title: "React Native Navigation Setup",
    description:
      "Follow practical setup notes for configuring navigation in a React Native application.",
  },
  "/react-native/route-navigation": {
    title: "React Native Route Navigation Guide",
    description:
      "Learn route navigation patterns for React Native with reusable examples and implementation notes.",
  },
  "/docker": {
    title: "Docker Quick Setup Guide",
    description:
      "Start using Docker with a concise setup guide covering installation, commands, and project workflow basics.",
    canonicalPath: "/docker/quick-setup",
    noIndex: true,
  },
  "/docker/quick-setup": {
    title: "Docker Quick Setup Guide",
    description:
      "Follow a practical Docker quick setup guide with installation steps, essential commands, and workflow notes.",
  },
  "/auth": {
    title: "Sign In or Create an Account",
    description: "Sign in or create a ReactAllFeatures account.",
    noIndex: true,
  },
  "/profile": {
    title: "Your ReactAllFeatures Profile",
    description: "Manage your ReactAllFeatures account and active plans.",
    noIndex: true,
  },
  "/pdf": {
    title: "PDF Generator Demo",
    description: "Interactive PDF generator demonstration.",
    noIndex: true,
  },
  "/infinite": {
    title: "Infinite Scroll Demo",
    description: "Interactive infinite scroll demonstration.",
    canonicalPath: "/features/infinite-scroll",
    noIndex: true,
  },
};

export const indexablePaths = Object.entries(seoPages)
  .filter(([path, page]) => !page.noIndex && (!page.canonicalPath || page.canonicalPath === path))
  .map(([path]) => path);