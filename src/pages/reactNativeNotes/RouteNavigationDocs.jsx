import { AlertCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CommandBlock from "../../components/common/react-native/CommandBlock";

const Step = ({ number, title, children }) => (
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

const InfoCard = ({ title, children }) => (
  <div className="rounded-2xl border border-(--primary-border) bg-(--primary-bg) p-4">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-(--accent-color1)">
      {title}
    </h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">
      {children}
    </div>
  </div>
);

const RouteNavigationDocs = () => {
  const { headingRef } = useOutletContext();

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 border">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Navigation
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Route and Navigation (React Navigation)
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            This section is specifically for React Navigation, not Expo Router.
            Navigation is how the app moves between screens, and a route is the
            object that represents a screen with its name and params. In
            practice, navigation is the driver and route is the bag carrying
            data from one screen to another.
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
                  Core idea
                </h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  <span className="font-semibold text-(--primary-text)">
                    navigation
                  </span>{" "}
                  moves the user between screens and manages the stack history,
                  while{" "}
                  <span className="font-semibold text-(--primary-text)">
                    route
                  </span>{" "}
                  contains the screen information and the params passed to it.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Navigation">
              Navigation is how you move between screens in your app. It
              controls transitions, stack state, and history.
            </InfoCard>

            <InfoCard title="Route">
              A route is an object that represents a screen and may hold params
              such as an order id or selected product.
            </InfoCard>

            <InfoCard title="Route shape">
              {" "}
              A route usually looks like name + params, for example:{" "}
              {`{ name: "OrderDetail", params: { orderId: 123 } }`}.{" "}
            </InfoCard>

            <InfoCard title="Why it matters">
              It lets you pass data between screens without storing everything
              in global state or duplicating logic.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Step number="01" title="What is Navigation?">
              <p>
                Navigation is the action of moving between screens in the
                application.
              </p>
              <CommandBlock>{`navigation.navigate("OrderDetail");`}</CommandBlock>
            </Step>

            <Step number="02" title="What is a Route?">
              <p>
                A route is a screen object. It contains the screen name and any
                data passed to it.
              </p>
              <CommandBlock>{`const route = {
  name: "OrderDetail",
  params: { orderId: 123 },
};`}</CommandBlock>
            </Step>

            <Step number="03" title="What does route contain?">
              <div className="space-y-3">
                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">
                    name
                  </span>
                  <span className="ml-2 text-(--secondary-text)">
                    The screen name to open.
                  </span>
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">
                    params
                  </span>
                  <span className="ml-2 text-(--secondary-text)">
                    The data passed to that screen.
                  </span>
                </div>
              </div>
            </Step>

            <Step number="04" title="Passing data with params">
              <CommandBlock>{`navigation.navigate("OrderDetail", {
  orderId: order.id,
});

const orderId = route?.params?.orderId;

navigation.navigate("OrderDetail", { order });
const order = route?.params?.order;`}</CommandBlock>
            </Step>

            <Step number="05" title="Basic navigation syntax">
              <CommandBlock>{`navigation.navigate(name, params?, options?)

navigation.navigate({
  name: "OrderDetail",
  params: { orderId: 1 },
  merge: true,
});`}</CommandBlock>
            </Step>

            <Step number="06" title="Simple navigate">
              <CommandBlock>{`navigation.navigate("OrderDetail");`}</CommandBlock>
            </Step>

            <Step number="07" title="Navigate with params">
              <CommandBlock>{`navigation.navigate("OrderDetail", { orderId: 1 });`}</CommandBlock>
            </Step>

            <Step number="08" title="Navigate using object form">
              <CommandBlock>{`navigation.navigate({
  name: "OrderDetail",
  params: { orderId: 1 },
});`}</CommandBlock>
            </Step>

            <Step number="09" title="Navigate + merge params">
              <p>
                This is important because it updates existing params instead of
                creating a duplicate screen state.
              </p>
              <CommandBlock>{`navigation.navigate({
  name: "OrderDetail",
  params: { orderId: 2 },
  merge: true,
});`}</CommandBlock>
              <p className="mt-3">
                This updates the existing route instead of pushing a whole new
                one.
              </p>
            </Step>

            <Step number="10" title="Navigate to nested screens">
              <p>
                When screens are nested inside tabs or stacks, you can navigate
                through the route hierarchy.
              </p>
              <CommandBlock>{`navigation.navigate("Tabs", {
  screen: "OrdersTab",
  params: {
    screen: "OrderDetail",
    params: {
      orderId: 1,
    },
  },
});`}</CommandBlock>

              <p className="mt-3">
                If you are already inside the tab, a shortcut is enough:
              </p>
              <CommandBlock>{`navigation.navigate("OrderDetail", { orderId: 1 });`}</CommandBlock>
            </Step>

            <Step number="11" title="Reset (clear history)">
              <p>
                Use reset when you want to clear the current navigation stack
                and land on a new screen.
              </p>
              <CommandBlock>{`navigation.reset({
  index: 0,
  routes: [{ name: "Home" }],
});`}</CommandBlock>

              <p className="mt-4">
                In more advanced flows, you can reset to a whole nested tab
                stack and then push another screen after it.
              </p>

              <CommandBlock>{`navigation.reset({
  index: 1,
  routes: [
    {
      name: "Tabs",
      params: {
        screen: "ERPStack",
      },
    },
    {
      name: "OrderRegister",
    },
  ],
});`}</CommandBlock>

              <p className="mt-3">
                Here,{" "}
                <span className="font-semibold text-(--primary-text)">
                  index: 1
                </span>{" "}
                means the current active route is the second item in the stack.
                The first item opens the{" "}
                <span className="font-semibold text-(--primary-text)">
                  Tabs
                </span>{" "}
                navigator and focuses the{" "}
                <span className="font-semibold text-(--primary-text)">
                  ERPStack
                </span>{" "}
                screen inside it, while the second item is the actual screen
                that appears after that.
              </p>
            </Step>

            <Step number="12" title="Mental model">
              <p>
                Think of it like this:{" "}
                <span className="font-semibold text-(--primary-text)">
                  navigation
                </span>{" "}
                is the driver that moves you, and
                <span className="font-semibold text-(--primary-text)">
                  {" "}
                  route
                </span>{" "}
                is the bag that carries your data.
              </p>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteNavigationDocs;
