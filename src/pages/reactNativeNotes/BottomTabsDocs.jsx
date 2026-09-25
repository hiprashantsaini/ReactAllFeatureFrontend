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

const BottomTabsDocs = () => {
    const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span ref={headingRef} className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Navigation
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Bottom Tabs
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            Bottom tabs are the main mobile navigation pattern for switching between key app sections such as Home, Working, Catalogue, and Profile.
            A custom tab bar lets you fully control the inner design, icon states, active backgrounds, label style, spacing, and layout from a single outer container.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-5 shadow-sm sm:p-7">
          <div className="mb-7">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertCircle size={18} className="text-(--accent-color1)" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-(--primary-text)">What is a custom bottom tab bar?</h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  It is a tab navigator where the developer replaces the default UI with a custom container.
                  The outer style controls the entire tab bar while each inner item can change icon, text, active state, and background styling.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Definition">
              A custom bottom tab bar is a reusable navigation container that controls which screen is active and how the bar looks.
            </InfoCard>

            <InfoCard title="Purpose">
              Used when the app needs a branded, animated, or more design-specific mobile navigation bar than the default one.
            </InfoCard>

            <InfoCard title="Use cases">
              Home, search, cart, settings, profile, dashboards, working modules, catalogue sections, and app-specific flows.
            </InfoCard>

            <InfoCard title="Requirements">
              Needs tab screens, active/inactive icons, state tracking, a container style, and press logic to navigate between routes.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Step number="01" title="Install bottom tab navigation">
              <CommandBlock>npx expo install @react-navigation/bottom-tabs</CommandBlock>
            </Step>

            <Step number="02" title="Core idea">
              <p>
                The <span className="font-semibold text-(--primary-text)">outer style</span> defines the whole tab bar visuals, while each tab item decides its inner content.
                This gives you full flexibility for spacing, alignment, radius, active background, icon tint, and label styling.
              </p>
            </Step>

            <Step number="03" title="Actual custom tab bar example">
              <CommandBlock>{`import React from "react";
import { View, Image, TouchableOpacity, Text, StatusBar, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: "#A29FAE",
        borderRadius: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        position: "absolute",
        bottom: insets.bottom + 10,
        left: 8,
        right: 8,
        backgroundColor: "rgba(42,41,47,0.95)",
        gap: 2,
        zIndex: 99,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let icon;

        if (route.name === "Home") {
          icon = isFocused ? home_filled : home;
        } else if (route.name === "About") {
          icon = isFocused ? working_filled : working;
        } else if (route.name === "Catalogue") {
          icon = isFocused ? catalogue_filled : catalogue;
        } else if (route.name === "Profile") {
          icon = isFocused ? profile_filled : profile;
        }

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <ImageBackground
            source={isFocused ? activeTabBg : ""}
            style={{ flex: 1 }}
            resizeMode="stretch"
          >
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={{
                width: "100%",
                paddingVertical: 10,
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 2,
              }}
              activeOpacity={0.8}
            >
              <Image
                source={icon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
                tintColor="#FFFFFF"
              />
              <Text style={{ fontSize: 10, letterSpacing: 2, textAlign: "center", color: "#FFFFFF" }}>
                {route.name}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      })}
    </View>
  );
};

const TabNavigator = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" />
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        animation: "shift",
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutNavigator} />
      <Tab.Screen name="Catalogue" component={CatalogueScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </>
);

export default TabNavigator;`}</CommandBlock>
            </Step>

            <Step number="04" title="How the outer container styles the whole bar">
              <div className="space-y-3">
                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">position: "absolute"</span>
                  <span className="ml-2 text-(--secondary-text)">Keeps the tab bar floating above the screen content.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">bottom: insets.bottom + 10</span>
                  <span className="ml-2 text-(--secondary-text)">Handles safe-area spacing for iPhones with home indicators.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">borderRadius: 999</span>
                  <span className="ml-2 text-(--secondary-text)">Creates a pill-style or capsule tab container.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">backgroundColor</span>
                  <span className="ml-2 text-(--secondary-text)">Controls the overall bar color, such as dark translucent glass styling.</span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">gap and padding</span>
                  <span className="ml-2 text-(--secondary-text)">Controls overall spacing between inner tab items.</span>
                </div>
              </div>
            </Step>

            <Step number="05" title="How the inner tab styling is controlled">
              <p>
                Each tab item gets its own state through <span className="font-semibold text-(--primary-text)">isFocused</span>. Then the active icon, label color, background, and spacing can be changed dynamically.
              </p>

              <CommandBlock>{`const isFocused = state.index === index;

<ImageBackground
  source={isFocused ? activeTabBg : ""}
  style={{ flex: 1 }}
>
  <TouchableOpacity
    onPress={() => navigation.navigate(route.name)}
    style={{
      width: "100%",
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Image source={isFocused ? activeIcon : inactiveIcon} />
    <Text style={{ color: isFocused ? "#FFFFFF" : "#FFFFFF" }}>
      {route.name}
    </Text>
  </TouchableOpacity>
</ImageBackground>`}</CommandBlock>
            </Step>

            <Step number="06" title="Responsive and practical patterns">
              <ul className="list-disc space-y-2 pl-5">
                <li>Keep the floating bar width constrained with left/right margins for mobile screens.</li>
                <li>Use safe-area insets to avoid the home indicator area.</li>
                <li>Give each tab a consistent layout and size so the bar stays balanced.</li>
                <li>Show only necessary labels or use short names for a clean compact bar.</li>
                <li>Use active background images or tinted containers to highlight the selected tab.</li>
              </ul>
            </Step>

            <Step number="07" title="Typical structure for tab items">
              <p>
                In most apps, a tab item contains an icon, a label, and an active state. If a tab is blocked by business rules, you can also show a custom alert before navigating.
              </p>

              <CommandBlock>{`const onPress = () => {
  if (!isFocused) {
    if (route.name === "about" && !baseid.label) {
      setAlertVisible(true);
      return;
    }
    navigation.navigate(route.name);
  }
};`}</CommandBlock>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomTabsDocs;
