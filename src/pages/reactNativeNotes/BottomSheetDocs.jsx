import { AlertCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CommandBlock from "../../components/common/react-native/CommandBlock";


const Step = ({ number, title, children }) => (
  <div className="relative pl-12">
    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-bg) text-xs font-bold text-(--accent-color1) ring-1 ring-(--primary-hover-border)">
      {number}
    </div>

    <h3 className="text-base font-semibold text-(--primary-text)">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">{children}</div>
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="rounded-2xl border border-(--primary-border) bg-(--primary-bg) p-4">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-(--accent-color1)">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">{children}</div>
  </div>
);

const BottomSheetDocs = () => {
    const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Modals
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Bottom Sheet
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            A bottom sheet is a mobile-friendly modal that slides up from the bottom of the screen.
            It is perfect for menus, filters, delivery options, pickers, and quick actions without fully navigating away from the current screen.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-5 shadow-sm sm:p-7">
          <div className="mb-7">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertCircle size={18} className="text-(--accent-color1)" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-(--primary-text)">What is Bottom Sheet?</h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  A bottom sheet is a floating sheet that sits above the page and can be dragged up or down.
                  It is commonly used when the action is related to the current screen but should not take over the whole app flow.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Definition">
              A bottom sheet is a draggable modal panel attached to the bottom of the screen.
            </InfoCard>

            <InfoCard title="Purpose">
              Use it for quick actions, filters, form choices, location selectors, and mobile-friendly drawer behavior.
            </InfoCard>

            <InfoCard title="Use cases">
              Delivery time selection, sort/filter options, image actions, location picker, checkout choices, quick settings.
            </InfoCard>

            <InfoCard title="Requirements">
              Needs a visible state, a sheet ref, snap points, and a close action when the user swipes down.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Step number="01" title="Install package and app wrapper">
              <CommandBlock>npx expo install @gorhom/bottom-sheet</CommandBlock>

              <p className="mt-3">If you run into a dependency issue, install the required worklets package too.</p>
              <CommandBlock>npx expo install react-native-worklets</CommandBlock>

              <p className="mt-4">
                Wrap the app content in <span className="font-semibold text-(--primary-text)">BottomSheetModalProvider</span> in App.jsx so the modal system works correctly.
              </p>

              <CommandBlock>{`import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  return (
    <BottomSheetModalProvider>
      <NavigationContainer>
        {/* your screens / app content */}
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
}`}</CommandBlock>
            </Step>

            <Step number="02" title="Why it is useful">
              <ul className="list-disc space-y-2 pl-5">
                <li>Better than a full-screen modal for quick actions.</li>
                <li>Feels natural on mobile devices.</li>
                <li>Supports drag to close and snap positions.</li>
                <li>Works well for selection flows and contextual menus.</li>
              </ul>
            </Step>

            <Step number="03" title="Actual modal example">
              <CommandBlock>{`import React, { useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SquircleView from "react-native-fast-squircle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

const DeliveryAtModal1 = ({
  visible = false,
  onClose = () => {},
  data = [],
  onSelect = () => {},
}) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["70%", "90%"], []);

  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: "#111111",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderWidth: 1,
          borderColor: "#1E1E1E",
        }}
        handleIndicatorStyle={{
          backgroundColor: "#555555",
          width: 45,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.6}
            pressBehavior="close"
          />
        )}
      >
        <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 5 }}>
        {/* HEADER SECTION */}
          <View className="mb-4 flex-row items-center">
           
              {/*Header Content Here */}
            
          </View>

          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: insets.bottom + 20,
            }}
          >
            {data.length > 0 ? (
              data.map((item) => (
                <TouchableOpacity key={item.dcode} onPress={() => onSelect(item)} style={{ marginBottom: 20 }}>
                  
                   {/*  Show data here */}
                </TouchableOpacity>
              ))
            ) : (
              <View className="mt-10 items-center justify-center">
                <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl border border-[#474747] bg-[#1A1A1A]">
                  <Ionicons name="location-outline" size={32} color="#fcfcfcfc" />
                </View>

                <Text className="text-[#fcfcfcfc] font-psMedium text-[14px]">
                  No record available.
                </Text>
              </View>
            )}
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};`}</CommandBlock>
            </Step>

            <Step number="04" title="Complete content structure and rendering flow">
              <p>
                This pattern is usually divided into three blocks: <span className="font-semibold text-(--primary-text)">header</span>,
                <span className="font-semibold text-(--primary-text)"> scrollable content</span>, and <span className="font-semibold text-(--primary-text)">empty / list data state</span>.
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">Header block</span>
                  <span className="ml-2 text-(--secondary-text)">Title, subtitle, and close icon with onClose.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">Scrollable content</span>
                  <span className="ml-2 text-(--secondary-text)">Wrapped inside BottomSheetScrollView so long lists can scroll smoothly.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">Data rendering</span>
                  <span className="ml-2 text-(--secondary-text)">Use data.map() to render each item as a pressable card and call onSelect(item).</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">Empty state</span>
                  <span className="ml-2 text-(--secondary-text)">If the array is empty, show a friendly placeholder message and icon.</span>
                </div>
              </div>
            </Step>

            <Step number="05" title="How content is shown or added">
              <p>
                The content is not hardcoded for only one item. It is driven by the <span className="font-semibold text-(--primary-text)">data</span> prop.
                Every object coming from the list is mapped into a selectable card.
              </p>

              <CommandBlock>{`const data = [
  {
   //fields
  },
  {
 //fields
  },
];

{data.length > 0 ? (
  data.map((item) => (
    <TouchableOpacity key={item.dcode} onPress={() => onSelect(item)}>
       {/*Data here*/}
    </TouchableOpacity>
  ))
) : (
  <Text>No delivery locations available.</Text>
)}`}</CommandBlock>
            </Step>

            <Step number="06" title="What each part does">
              <div className="space-y-3">
                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">visible</span>
                  <span className="ml-2 text-(--secondary-text)">Controls whether the bottom sheet is open.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">snapPoints</span>
                  <span className="ml-2 text-(--secondary-text)">Defines how far the sheet opens, like 70% or 90% height.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">enablePanDownToClose</span>
                  <span className="ml-2 text-(--secondary-text)">Allows the user to drag down to dismiss it.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">onClose</span>
                  <span className="ml-2 text-(--secondary-text)">Runs when the sheet is dismissed.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">backdropComponent</span>
                  <span className="ml-2 text-(--secondary-text)">Adds a dim background behind the sheet and lets it close on tap.</span>
                </div>
              </div>
            </Step>

            <Step number="05" title="Practical usage pattern">
              <p>
                This pattern is used when you want a quick mobile action without forcing a new route.
                For example, a delivery-time chooser or a product menu can open from the bottom and feel native to the platform.
              </p>

              <CommandBlock>{`const [visible, setVisible] = useState(false);

<DeliveryModal
  visible={visible}
  onClose={() => setVisible(false)}
  data={deliveryOptions}
  onSelect={(value) => {
    setSelectedValue(value);
    setVisible(false);
  }}
/>`}</CommandBlock>
            </Step>

            <Step number="06" title="Best practices">
              <ul className="list-disc space-y-2 pl-5">
                <li>Use a sheet for short, contextual actions instead of full-page navigation.</li>
                <li>Keep the content compact and readable when the sheet is half-open.</li>
                <li>Add a backdrop and close gesture so the interaction feels familiar.</li>
                <li>Use safe-area spacing for close buttons and top controls.</li>
                <li>Prefer clear snap points for a polished mobile experience.</li>
              </ul>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomSheetDocs;
