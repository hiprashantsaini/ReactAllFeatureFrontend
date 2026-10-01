import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CommandBlock from "../../components/common/react-native/CommandBlock";

const Step = ({ number, title, children }) => (
  <div className="relative pl-11 sm:pl-12">
    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-bg) text-xs font-bold text-(--accent-color1) ring-1 ring-(--primary-hover-border)">
      {number}
    </div>
    <h3 className="text-base font-semibold text-(--primary-text)">{title}</h3>
    <div className="mt-2 space-y-3 text-sm leading-6 text-(--secondary-text)">
      {children}
    </div>
  </div>
);

const Note = ({ children }) => (
  <div className="rounded-lg border border-(--primary-border) bg-(--primary-bg) p-4 text-sm leading-6 text-(--secondary-text)">
    {children}
  </div>
);

const FontSetupAndUse = () => {
  const { headingRef } = useOutletContext();

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-9 sm:mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Expo
          </span>
          <h1
            ref={headingRef}
            className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl"
          >
            Font Setup and Use
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            Add licensed local font files to an Expo app, load them before the
            navigation tree renders, and use consistent font names with
            NativeWind.
          </p>
        </header>

        <div className="rounded-xl border border-(--primary-border) bg-(--secondary-bg) p-4 shadow-sm sm:rounded-2xl sm:p-7">
          <div className="mb-8 flex items-start gap-3">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-(--accent-color1)"
            />
            <div>
              <h2 className="text-lg font-bold text-(--primary-text) sm:text-xl">
                Keep the font names in sync
              </h2>
              <p className="mt-1 text-sm leading-6 text-(--secondary-text)">
                The keys in the Expo font registry are the native font family
                names. NativeWind aliases must point to those exact keys,
                including capitalization. This guide uses Manrope throughout.
              </p>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-9">
            <Step number="01" title="Create the asset and utility folders">
              <p>
                Keep font files in the app source tree so Metro can bundle them.
                Use a subfolder for each family and include only the weights and
                styles the app actually uses.
              </p>
              <CommandBlock>{`assets/
  fonts/
    manrope/
      Manrope-Regular.ttf
      Manrope-Medium.ttf
      Manrope-SemiBold.ttf
      Manrope-Bold.ttf
utilities/
  fonts.js`}</CommandBlock>
              <p>
                Browse and download font families from{" "}
                <a
                  href="https://fonts.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-(--accent-color1) underline underline-offset-2"
                >
                  Google Fonts
                </a>
                . Verify the selected font's license permits app distribution,
                and keep its license notice with your project when required.
                Match the downloaded filenames and letter case in your imports
                exactly.
              </p>
            </Step>

            <Step number="02" title="Register the font assets">
              <p>
                Create <code>utilities/fonts.js</code>. Each key becomes the
                family name that Expo registers after the font loads.
              </p>
              <CommandBlock>{`export const fonts = {
  "Manrope-Regular": require("../assets/fonts/manrope/Manrope-Regular.ttf"),
  "Manrope-Medium": require("../assets/fonts/manrope/Manrope-Medium.ttf"),
  "Manrope-SemiBold": require("../assets/fonts/manrope/Manrope-SemiBold.ttf"),
  "Manrope-Bold": require("../assets/fonts/manrope/Manrope-Bold.ttf"),
};`}</CommandBlock>
              <Note>
                Metro requires static <code>require()</code> paths. Avoid building
                the path dynamically. If your files or folder names differ,
                update the path here and keep the registry keys unchanged unless
                you also update the NativeWind configuration.
              </Note>
            </Step>

            <Step number="03" title="Define NativeWind font aliases">
              <p>
                Add aliases to <code>tailwind.config.js</code>. The alias is the
                class suffix (for example, <code>font-mBold</code>); its value
                must match a key from <code>fonts.js</code>.
              </p>
              <CommandBlock>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./utilities/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        mRegular: ["Manrope-Regular"],
        mMedium: ["Manrope-Medium"],
        mSemiBold: ["Manrope-SemiBold"],
        mBold: ["Manrope-Bold"],
      },
    },
  },
  plugins: [],
};`}</CommandBlock>
              <p>
                Keep the app's existing <code>content</code> globs and include
                every directory containing components that use font classes.
                NativeWind must already be configured for the project's
                installed version.
              </p>
            </Step>

            <Step number="04" title="Load fonts before rendering the app">
              <p>
                Install Expo's font package with the version compatible with
                your Expo SDK:
              </p>
              <CommandBlock>npx expo install expo-font</CommandBlock>
              <p>
                Call <code>useFonts</code> once near the app root, before any
                screen containing custom-font text can render. Put your
                existing navigator or root providers behind this loading gate.
              </p>
              <CommandBlock>{`import { useFonts } from "expo-font";
import { ActivityIndicator, Text, View } from "react-native";
import { fonts } from "./utilities/fonts";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);

  if (fontError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Fonts could not be loaded. Please restart the app.</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator />;
}`}</CommandBlock>
              <Note>
                Replace <code>AppNavigator</code> with your current root app
                tree. Keep existing providers and <code>NavigationContainer</code>
                inside the loaded state. For a polished launch, coordinate the
                loading gate with <code>expo-splash-screen</code> so the native
                splash stays visible until fonts are ready. Send
                <code>fontError</code> to your app's error reporting in
                production.
              </Note>
            </Step>

            <Step number="05" title="Apply the font classes">
              <p>
                Use the alias in NativeWind's <code>font-*</code> utility.
                Define a separate alias for each actual font file and weight.
              </p>
              <CommandBlock>{`<Text className="text-[20px] font-mBold text-center">
  Home Data
</Text>

<Text className="text-[12px] font-mRegular tracking-[2px] text-center">
  ENTERPRISE PORTAL
</Text>

<Text className="text-[14px] font-mMedium">
  Identify yourself to continue
</Text>`}</CommandBlock>
              <p>
                Use a real configured alias such as <code>font-mMedium</code>;
                a typo like <code>font-inMediumr</code> silently falls back to
                another font. Avoid globally setting
                <code>allowFontScaling</code> to false: it removes the user's
                ability to enlarge text for accessibility.
              </p>
            </Step>

            <Step number="06" title="Verify on devices and release builds">
              <p>
                Restart Metro after changing native asset setup, confirm every
                weight on both platforms, then run the SDK and production-build
                checks.
              </p>
              <CommandBlock>{`npx expo start -c
npx expo install --check
npx expo-doctor`}</CommandBlock>
              <div className="flex items-start gap-2 rounded-lg border border-(--primary-border) bg-(--primary-bg) p-4 text-sm leading-6 text-(--secondary-text)">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-(--accent-color2)"
                />
                <p>
                  Before shipping, verify the exact asset paths, visible font
                  weights, fallback/loading behavior, and font licensing in an
                  Android and iOS release build.
                </p>
              </div>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FontSetupAndUse;