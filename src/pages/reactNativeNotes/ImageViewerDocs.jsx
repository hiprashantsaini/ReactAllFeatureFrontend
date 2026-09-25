import { AlertCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CommandBlock from "../../components/common/react-native/CommandBlock";


const InfoCard = ({ title, children }) => (
  <div className="rounded-2xl border border-(--primary-border) bg-(--primary-bg) p-4">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-(--accent-color1)">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">{children}</div>
  </div>
);

const Section = ({ number, title, children }) => (
  <div className="relative pl-12">
    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-bg) text-xs font-bold text-(--accent-color1) ring-1 ring-(--primary-hover-border)">
      {number}
    </div>

    <h3 className="text-base font-semibold text-(--primary-text)">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">{children}</div>
  </div>
);

const ImageViewerDocs = () => {
    const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Image Gallery
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Image Viewer
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            A fullscreen image viewer for product photos, documents, user avatars, proof images,
            and any gallery-style content where the user needs a larger preview with swipe and close interaction.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-5 shadow-sm sm:p-7">
          <div className="mb-7">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertCircle size={18} className="text-(--accent-color1)" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-(--primary-text)">What is Image Viewer?</h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  <strong className="text-(--primary-text)">react-native-image-viewing</strong> is a fullscreen modal viewer for viewing one or multiple images in a modern gallery layout.
                  It helps users zoom, swipe, and navigate through images without leaving the current screen flow.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Definition">
              It is a reusable image gallery component that opens a full-screen modal and displays a list of image objects.
            </InfoCard>

            <InfoCard title="Purpose">
              Used when the app needs a better visual preview than a small thumbnail or basic Image component.
            </InfoCard>

            <InfoCard title="Use cases">
              Product image previews, user profile photos, document scans, before/after comparisons, gallery browsing, verification uploads.
            </InfoCard>

            <InfoCard title="Requirements">
              You need image URLs or local assets, a visible state, an image index, and a close action.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Section number="01" title="Install the package">
              <p>Use the Expo-friendly install command for this project.</p>
              <CommandBlock>npx expo install react-native-image-viewing</CommandBlock>

              <div className="mt-3 rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3 text-sm text-(--secondary-text)">
                Important: the actual import is <span className="font-semibold text-(--primary-text)">ImageView</span> from <span className="font-semibold text-(--primary-text)">react-native-image-viewing</span>.
              </div>
            </Section>

            <Section number="02" title="Correct import">
              <CommandBlock>{`import ImageView from "react-native-image-viewing";
// not EnhancedImageViewing`}</CommandBlock>
            </Section>

            <Section number="03" title="When to use it">
              <ul className="list-disc space-y-2 pl-5">
                <li>When a user taps a product image and wants a larger full-screen preview.</li>
                <li>When multiple images must be viewed in sequence.</li>
                <li>When you want a polished gallery experience with swipe gestures and a close button.</li>
                <li>When the app needs image preview on Android and iOS with consistent behavior.</li>
              </ul>
            </Section>

            <Section number="04" title="Basic data structure">
              <p>Each item in the array should contain a valid image source, usually a URL or local file path.</p>
              <CommandBlock>{`const images = [
  {
    uri: formData?.url,
    // or productDetails?.url
  },
];`}</CommandBlock>
            </Section>

            <Section number="05" title="Real example from app usage">
              <CommandBlock>{`const [visible, setVisible] = useState(false);

const images = [
  {
    uri: formData?.url,
    // or productDetails?.url
  },
];

<ImageView
  images={images}
  imageIndex={0}
  visible={visible}
  onRequestClose={() => setVisible(false)}
  HeaderComponent={({ imageIndex }) => (
    <TouchableOpacity
      onPress={() => setVisible(false)}
      style={{
        position: "absolute",
        top: insets.top + 12,
        right: 16,
        zIndex: 100,
      }}
    >
      <Ionicons name="close" size={28} color="#fff" />
    </TouchableOpacity>
  )}
/>`}</CommandBlock>
            </Section>

            <Section number="06" title="How it works in practice">
              <p>
                The component is controlled by <span className="font-semibold text-(--primary-text)">visible</span> and <span className="font-semibold text-(--primary-text)">imageIndex</span>.
                When the user taps an image, set <span className="font-semibold text-(--primary-text)">visible</span> to true.
                The library then opens a modal overlay with the selected image and supports swiping between images in the array.
              </p>
            </Section>

            <Section number="07" title="Common props">
              <div className="mt-3 grid gap-3">
                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">images</span>
                  <span className="ml-2 text-(--secondary-text)">Array of image objects with uri values.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">imageIndex</span>
                  <span className="ml-2 text-(--secondary-text)">The current selected image index.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">visible</span>
                  <span className="ml-2 text-(--secondary-text)">Controls whether the viewer is open or closed.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">onRequestClose</span>
                  <span className="ml-2 text-(--secondary-text)">Triggered when the user closes the viewer.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">HeaderComponent</span>
                  <span className="ml-2 text-(--secondary-text)">Custom top overlay such as a close button or title.</span>
                </div>
              </div>
            </Section>

            <Section number="08" title="Best practices">
              <ul className="list-disc space-y-2 pl-5">
                <li>Use a single image array when the user opens a preview from a product card.</li>
                <li>Keep the close button visible and easy to tap.</li>
                <li>Use safe-area insets for top-right close buttons on devices with notches.</li>
                <li>Prefer valid remote image URLs and fallback placeholders if a URL is missing.</li>
                <li>Use same image resolution for all gallery items if preview quality matters.</li>
              </ul>
            </Section>

            <Section number="09" title="Typical workflow">
              <ol className="list-decimal space-y-2 pl-5">
                <li>Fetch product or form image URL.</li>
                <li>
                  Create an array of image objects like{' '}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] text-slate-200">
                    {"{ uri: url }"}
                  </code>
                  .
                </li>
                <li>Set visible to true on tap.</li>
                <li>Render ImageView with imageIndex and onRequestClose.</li>
                <li>Add custom header actions like close icon or share button.</li>
              </ol>
            </Section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageViewerDocs;
