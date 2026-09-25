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

const SimpleReusableAnimationDocs = () => {
    const { headingRef } = useOutletContext();
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            React Native / Animation
          </span>

          <h1 ref={headingRef} className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl">
            Simple Reusable Animation
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            This is a small reusable animation wrapper for fade + slide-up
            entrance effects. It is useful when you want to animate multiple items
            with a staggered delay without rewriting the same animation logic in
            every component.
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
                  Why this pattern is useful
                </h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  You can wrap any card, input, or section and animate it with a
                  small delay. This helps create smooth entry transitions without
                  extra complexity.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Definition">
              A reusable component that animates opacity and Y-position from an
              initial hidden state to a visible final state.
            </InfoCard>

            <InfoCard title="Purpose">
              It is mainly used for entering UI blocks, list items, cards, or
              inputs with a soft staggered motion.
            </InfoCard>

            <InfoCard title="Use cases">
              Inputs, form blocks, list cards, profile sections, dashboard cards,
              and any repeated UI where items appear in sequence.
            </InfoCard>

            <InfoCard title="How it works">
              The fade value goes from 0 to 1 and the translateY value moves from
              16 to 0 with a delay, making the item appear smoothly.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Step number="01" title="Reusable animation component">
              <CommandBlock>{`import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInItem = ({ children, delay = 0, style }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[{ opacity: fade, transform: [{ translateY: translate }] }, style]}
    >
      {children}
    </Animated.View>
  );
};`}</CommandBlock>
            </Step>

            <Step number="02" title="Single item example">
              <CommandBlock>{`<FadeInItem delay={120} style={{ marginVertical: 10 }}>
  <ImageBackground source={inputBg} resizeMode="stretch">
    <TextInput
      className="p-5 text-[#525252] font-psMedium text-[16px]"
    />
  </ImageBackground>
</FadeInItem>`}</CommandBlock>
            </Step>

            <Step number="03" title="Multiple items with staggered delay">
              <CommandBlock>{`<FadeInItem delay={120} style={{ marginVertical: 10 }}>
  <ImageBackground source={inputBg} resizeMode="stretch">
    <TextInput
      className="p-5 text-[#525252] font-psMedium text-[16px]"
    />
  </ImageBackground>
</FadeInItem>

<FadeInItem delay={240} style={{ marginVertical: 10 }}>
  <ImageBackground source={inputBg} resizeMode="stretch">
    <TextInput
      className="flex-1 p-5 text-[#525252] font-psMedium text-[16px]"
    />
  </ImageBackground>
</FadeInItem>`}</CommandBlock>
            </Step>

            <Step number="04" title="Inside a list loop">
              <CommandBlock>{`<View>
  {ROLE_CARDS.map((item, index) => (
    <RoleCard
      key={item.id}
      item={item}
      index={index}
      onPress={handleNavigate}
    />
  ))}
</View>

const RoleCard = ({ item, index, onPress }) => (
  <FadeInItem delay={150 + index * 100} style={{ marginBottom: 6 }}>
    <ImageBackground source={item.bg} resizeMode="stretch">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPress(item)}
        className="flex-row items-center gap-4 px-6 pt-5 pb-6"
      >
        {/* data */}
      </TouchableOpacity>
    </ImageBackground>
  </FadeInItem>
);`}</CommandBlock>
            </Step>

            <Step number="05" title="Production-ready FlatList pattern">
              <p>
                In real apps, you often animate list items from a mapped array.
                The pattern stays the same: each item wraps in <span className="font-semibold text-(--primary-text)">FadeInItem</span> and receives a delay based on its index.
              </p>

              <CommandBlock>{`import React, { useCallback } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";

const ListScreen = ({ items, onOpenItem }) => {
  const renderItem = useCallback(({ item, index }) => (
    <FadeInItem delay={100 + index * 90} style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={() => onOpenItem(item)}>
        <View style={{ padding: 16, borderRadius: 12, backgroundColor: "#fff" }}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </FadeInItem>
  ), [onOpenItem]);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};`}</CommandBlock>
            </Step>

            <Step number="06" title="Best practice">
              <p>
                Keep the delay in hundreds like <span className="font-semibold text-(--primary-text)">120</span>, <span className="font-semibold text-(--primary-text)">240</span>, or <span className="font-semibold text-(--primary-text)">150 + index * 100</span> to create a natural stagger effect.
                This gives the interface a premium feel without being distracting.
              </p>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleReusableAnimationDocs;
