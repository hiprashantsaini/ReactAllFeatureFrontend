import { AlertCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CommandBlock from "../../components/common/react-native/CommandBlock";

const Step = ({ number, title, children }) => {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-bg) text-xs font-bold text-(--accent-color1) ring-1 ring-(--primary-hover-border)">
        {number}
      </div>

      <h3 className="text-base font-semibold text-(--primary-text)">{title}</h3>

      <div className="mt-2 text-sm leading-6 text-(--secondary-text)">
        {children}
      </div>
    </div>
  );
};

const SetupCommands = () => {
    const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Expo
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Setup Commands
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            Clean Expo setup from scratch, add navigation, and prepare your app
            for Nativewind styling.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-5 shadow-sm sm:p-7">
          <div className="mb-7">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertCircle size={18} className="text-(--accent-color1)" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-(--primary-text)">
                  Expo app setup from scratch
                </h2>

                <p className="mt-1 text-sm text-(--secondary-text)">
                  Start with a fresh app, install navigation dependencies, and
                  add Nativewind styling support.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Step number="01" title="Create a new Expo app">
              <p>Create the project with the blank template.</p>
              <CommandBlock>
                npx create-expo-app My-App-Name -t blank
              </CommandBlock>

              <div className="mt-4 rounded-xl border border-(--primary-border) bg-(--primary-bg) p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--secondary-text)">
                  SDK version
                </p>
                <code className="mt-2 block break-all text-sm text-(--accent-color1)">
                  SDK 54
                </code>
              </div>
            </Step>

            <Step number="02" title="Install navigation packages">
              <CommandBlock>
                {
                  "npx expo install @react-navigation/native\nnpx expo install react-native-screens react-native-safe-area-context\nnpx expo install @react-navigation/stack\nnpx expo install react-native-gesture-handler @react-native-masked-view/masked-view\nnpx expo install @react-navigation/bottom-tabs"
                }
              </CommandBlock>
            </Step>

            <Step number="03" title="Check version compatibility">
              <p>
                Run the version check to verify installed packages match the
                current Expo SDK.
              </p>
              <CommandBlock>npx expo install --check</CommandBlock>
            </Step>

            <Step
              number="04"
              title="Install Nativewind and related dependencies"
            >
              <CommandBlock>
                npx expo install nativewind tailwindcss@^3.4.17
                react-native-reanimated react-native-safe-area-context
              </CommandBlock>
            </Step>

            <Step number="05" title="Initialize Tailwind config">
              <CommandBlock>npx tailwindcss init</CommandBlock>

              <p className="mt-3">
                Edit the generated config to include Nativewind preset and app
                paths.
              </p>
              <CommandBlock>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};`}</CommandBlock>
            </Step>

            <Step number="06" title="Create the global CSS file">
              <CommandBlock>{`@tailwind base;
@tailwind components;
@tailwind utilities;`}</CommandBlock>
            </Step>

            <Step number="07" title="Set up Babel config">
              <p>If needed, install the Expo Babel preset.</p>
              <CommandBlock>npx expo install babel-preset-expo</CommandBlock>

              <CommandBlock>{`module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
  };
};`}</CommandBlock>
            </Step>

            <Step number="08" title="Set up Metro config">
              <CommandBlock>{`const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });`}</CommandBlock>
            </Step>

            <Step number="09" title="Import CSS in the app entry">
              <CommandBlock>{`import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
// ... rest of your App.js`}</CommandBlock>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupCommands;
