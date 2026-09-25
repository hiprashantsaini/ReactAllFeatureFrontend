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

const RefreshScreenDataDocs = () => {
    const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Data Refresh
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Refresh Screen Data
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            Pull-to-refresh is used when you want to reload data on the current
            screen without resetting the app state. Redux data and local state do
            not refresh automatically. You must manually refetch and update the
            state.
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
                  Main point
                </h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  A refresh action is just a controlled re-fetch. It updates the
                  screen with fresh API data, but it does not reset Redux or other
                  state unless you explicitly write that logic.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="When to use">
              Use it when the user pulls down on a list to load the latest data,
              such as feeds, orders, profile info, or chats.
            </InfoCard>

            <InfoCard title="What it does">
              It starts a loading state, triggers an async request, and then sets
              the new data into state once the request finishes.
            </InfoCard>

            <InfoCard title="Key state">
              You normally keep a <strong>refreshing</strong> boolean so the UI can
              show a spinner while the request is running.
            </InfoCard>

            <InfoCard title="Important note">
              RefreshControl is a React Native component used by ScrollView and
              FlatList. It is not automatically a route reset. It only refreshes
              data.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Step number="01" title="Pull-to-refresh with FlatList">
              <p>
                This is the most common pattern in React Native lists. The list
                listens for pull gestures, and when the user pulls, the
                onRefresh callback runs.
              </p>

              <CommandBlock>{`import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';

const MyList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      const newData = await fetchData();
      setData(newData);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <MyItem item={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};`}</CommandBlock>
            </Step>

            <Step number="02" title="Pull-to-refresh with ScrollView">
              <p>
                If the screen is not a list but still scrollable content, you can
                use the same refresh control pattern on ScrollView.
              </p>

              <CommandBlock>{`<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
>
  {/* content */}
</ScrollView>`}</CommandBlock>
            </Step>

            <Step number="03" title="What RefreshControl does">
              <p>
                The <span className="font-semibold text-(--primary-text)">RefreshControl</span>{" "}
                component shows the spinner and handles the pull gesture. It does
                not magically reset your app’s Redux or local state. You are still
                responsible for calling the data-fetch function and updating the
                state with the result.
              </p>
            </Step>

            <Step number="04" title="Where does RefreshControl come from?">
              <p>
                In most cases, this works from the React Native package itself:
              </p>

              <CommandBlock>{`import { RefreshControl } from 'react-native';`}</CommandBlock>

              <p className="mt-3">
                You may also see it imported from react-native-gesture-handler, but
                in practice the standard React Native import works well for most
                screen refresh flows.
              </p>

              <CommandBlock>{`import { RefreshControl } from 'react-native-gesture-handler';`}</CommandBlock>
            </Step>

            <Step number="05" title="Real-life pattern">
              <div className="space-y-3">
                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">1.</span>{" "}
                  User pulls down the screen.
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">2.</span>{" "}
                  onRefresh starts and sets refreshing to true.
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">3.</span>{" "}
                  API is called and the latest data is fetched.
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">4.</span>{" "}
                  setData(newData) updates UI.
                </div>

                <div className="rounded-xl border border-(--primary-border) bg-(--primary-bg) p-3">
                  <span className="font-semibold text-(--primary-text)">5.</span>{" "}
                  refreshing is set back to false to stop the loader.
                </div>
              </div>
            </Step>

            <Step number="06" title="Best practice">
              <p>
                Keep refresh behavior focused on data reload. If you need to reset
                the screen state or clear Redux cache, do it explicitly in your
                async logic instead of assuming the refresh gesture will do it for
                you.
              </p>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefreshScreenDataDocs;
