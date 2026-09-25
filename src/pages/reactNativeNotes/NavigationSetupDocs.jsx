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
    <h3 className="text-sm font-semibold capitalize tracking-wider text-(--accent-color1)">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">{children}</div>
  </div>
);

const NavigationSetupDocs = () => {
const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Navigation Setup
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Navigation Setup and Folder Structure
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            This setup is for React Navigation, not Expo Router. The usual idea is to keep navigation logic in a dedicated folder with a root stack and a tab navigator, then wrap the root navigator inside NavigationContainer in App.jsx.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-5 shadow-sm sm:p-7">
          <div className="mb-7">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertCircle size={18} className="text-(--accent-color1)" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-(--primary-text)">Folder structure</h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  Separate your app routing structure from screens so stack navigation and tab navigation remain easy to manage and scale.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="navigation/RootNavigator.jsx">
              Handles the app-level stack navigator and route flow. This is where auth, splash, and tab screens are connected.
            </InfoCard>

            <InfoCard title="navigation/TabNavigator.jsx">
              Handles the tab screen group. This is where bottom tabs such as Home, About, Profile, or Settings are defined.
            </InfoCard>

            <InfoCard title="App.jsx">
              Wraps the whole app with NavigationContainer and then renders the root navigator.
            </InfoCard>

            <InfoCard title="Screens folder">
              Stores actual screens like LoginScreen, SignUpScreen, HomeScreen, ProfileScreen, etc., separate from navigation logic.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Step number="01" title="Example app root with NavigationContainer">
              <CommandBlock>{`import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { useFonts } from "expo-font";
import { fonts } from "./constants/fonts";

const App = () => {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;`}</CommandBlock>
            </Step>

            <Step number="02" title="RootNavigator with stack screens">
              <CommandBlock>{`import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import HomeScreen from "../screens/home/HomeScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ animation: "fade_from_right" }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false, animation: "reveal_from_bottom" }}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;`}</CommandBlock>
            </Step>

            <Step number="03" title="TabNavigator with bottom tabs">
              <CommandBlock>{`import React from "react";
import { View, Text, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import HomeScreen from "../screens/home/HomeScreen";

const MyTabs = (props) => {
  const { state, navigation, descriptors, insets } = props;

  return (
    <View
      style={{
        backgroundColor: "blue",
        zIndex: 99,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: insets.bottom + 5,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let icon = "";

        if (route.name === "Home") {
          icon = "home";
        } else if (route.name === "About") {
          icon = "torso";
        }

        const handleOnPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.name}
            onPress={handleOnPress}
            style={{
              backgroundColor: isFocused ? "white" : "blue",
              width: 40,
              height: 40,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Foundation
              name={icon}
              size={isFocused ? 20 : 30}
              color={isFocused ? "blue" : "white"}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator initialRouteName="Home" tabBar={(props) => <MyTabs {...props} />}>
      <Tabs.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tabs.Screen name="About" component={HomeScreen} options={{ headerShown: false }} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;`}</CommandBlock>
            </Step>

            <Step number="04" title="Typical folder structure">
              <CommandBlock>{`src/
  App.jsx
  navigation/
    RootNavigator.jsx
    TabNavigator.jsx
  screens/
    auth/
      LoginScreen.jsx
      SignUpScreen.jsx
    home/
      HomeScreen.jsx
    profile/
      ProfileScreen.jsx
  components/
    common/
      Button.jsx
      InputField.jsx
    home/
      HomeCard.jsx
  hooks/
    useAuth.js
    useFetchProfile.js
  redux/
    store.js
    authSlice.js
  assets/
    images/
      logo.png
    icons/
      home.png
  utilities/
    formatDate.js
    validation.js
  constants/
    fonts.js
    colors.js
`}</CommandBlock>
            </Step>

            <Step number="05" title="Why this structure is recommended">
              <p>
                It gives a clean separation between UI screens and navigation configuration. The root stack decides the overall entry flow and the tab navigator handles the in-app main sections. This is much easier to extend as the app grows.
              </p>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavigationSetupDocs;
