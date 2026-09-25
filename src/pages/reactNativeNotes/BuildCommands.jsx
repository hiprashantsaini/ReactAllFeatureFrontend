import { AlertCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CommandBlock from "../../components/common/react-native/CommandBlock";


const Step = ({ number, title, children }) => {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-bg) text-xs font-bold text-(--accent-color1) ring-1 ring-(--primary-hover-border)">
        {number}
      </div>

      <h3 className="text-base font-semibold text-(--primary-text)">
        {title}
      </h3>

      <div className="mt-2 text-sm leading-6 text-(--secondary-text)">
        {children}
      </div>
    </div>
  );
};

const BuildCommands = ({ isGray }) => {
  const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Expo
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Build Commands
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            Common commands for installing EAS CLI, running Expo projects,
            generating native Android projects, and creating release APKs.
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
                  Option 1: Generate Native Project + Gradle
                </h2>

                <p className="mt-1 text-sm text-(--secondary-text)">
                  Useful when you need to work directly with the Android
                  native project and Gradle.
                </p>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  If using expo-go , then it also work. No need to eject expo-go.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Step
              number="01"
              title="Generate the Android native project"
              isGray={isGray}
            >
              <p>
                You do not need to think of this as permanently ejecting from
                Expo. This command generates the native Android project from
                your Expo project.
              </p>
              <p className="mb-3">It takes very short time.</p>

              <CommandBlock isGray={isGray}>
                npx expo prebuild --platform android
              </CommandBlock>
            </Step>

            <Step
              number="02"
              title="Navigate to the Android folder and build the APK"
              isGray={isGray}
            >
              <CommandBlock isGray={isGray}>
                {"cd android\n./gradlew assembleRelease"}
              </CommandBlock>
              <p className="mb-3">It may take 10 to 30 minutes first time.</p>

              <div className="mt-5 rounded-xl border border-(--primary-border) bg-(--primary-bg) p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--secondary-text)">
                  Generated APK
                </p>

                <code className="mt-2 block break-all text-sm text-(--accent-color1)">
                  android/app/build/outputs/apk/release/app-release.apk
                </code>
              </div>

              <p className="mt-4 text-(--secondary-text)">
                This requires Android Studio and JDK 17 to be installed on
                your machine.
              </p>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildCommands;


