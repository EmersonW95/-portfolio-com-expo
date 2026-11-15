import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg';
import { colors, fonts, radius } from '@/constants/theme';

export function GridBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id="grid" width={36} height={36} patternUnits="userSpaceOnUse">
            <Path d="M36 0H0V36" stroke={colors.lineSoft} strokeWidth={1} fill="none" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grid)" />
      </Svg>
    </View>
  );
}
const variantStyles = {
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.paper },
  dim: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 22, color: colors.paperDim },
  mono: { fontFamily: fonts.mono, fontSize: 13, color: colors.paper },
  monoDim: { fontFamily: fonts.mono, fontSize: 12, color: colors.paperDim },
  eyebrow: { fontFamily: fonts.monoMedium, fontSize: 12, color: colors.signal, letterSpacing: 0.3 },
  h1: { fontFamily: fonts.bold, fontSize: 32, lineHeight: 37, color: colors.paper },
  h2: { fontFamily: fonts.semi, fontSize: 22, lineHeight: 27, color: colors.paper },
  h3: { fontFamily: fonts.semi, fontSize: 17, lineHeight: 22, color: colors.paper },
};
export function Txt({ variant = 'body', style, children, ...rest }) {
  return (
    <Text {...rest} style={[variantStyles[variant], style]}>
      {children}
    </Text>
  );
}

export function FadeIn({ delay = 0, children, style }) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 450,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [delay, progress]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

export function Screen({ eyebrow, title, subtitle, children }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <GridBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 24,
          paddingHorizontal: 20,
          paddingBottom: 36,
          gap: 18,
        }}
      >
        <FadeIn style={{ gap: 8 }}>
          <Txt variant="eyebrow">{eyebrow}</Txt>
          <Txt variant="h1">{title}</Txt>
          {subtitle ? <Txt variant="dim">{subtitle}</Txt> : null}
        </FadeIn>
        {children}
      </ScrollView>
    </View>
  );
}
export function SectionHeading({ code, title }) {
  return (
    <View style={styles.sectionHeading}>
      <Txt variant="eyebrow">{code}</Txt>
      <Txt variant="h2">{title}</Txt>
      <View style={styles.sectionRule} />
    </View>
  );
}

export function Card({ children, style, accent }) {
  return <View style={[styles.card, accent && styles.cardAccent, style]}>{children}</View>;
}
export function Tag({ label }) {
  return (
    <View style={styles.tag}>
      <Txt variant="monoDim" style={{ fontSize: 11 }}>
        {label}
      </Txt>
    </View>
  );
}
export function TagRow({ items }) {
  return (
    <View style={styles.tagRow}>
      {items.map((t) => (
        <Tag key={t} label={t} />
      ))}
    </View>
  );
}
export function Bullets({ items }) {
  return (
    <View style={{ gap: 6 }}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Txt variant="mono" style={{ color: colors.signal }}>
            –
          </Txt>
          <Txt variant="dim" style={{ flex: 1, fontSize: 13.5, lineHeight: 20 }}>
            {item}
          </Txt>
        </View>
      ))}
    </View>
  );
}
export function Button({ label, icon, onPress, variant = 'ghost' }) {
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        primary ? styles.buttonPrimary : styles.buttonGhost,
        pressed && { opacity: 0.75 },
      ]}
    >
      {icon ? <Feather name={icon} size={15} color={primary ? colors.ink0 : colors.paper} /> : null}
      <Text
        style={{
          fontFamily: fonts.monoMedium,
          fontSize: 13,
          color: primary ? colors.ink0 : colors.paper,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function SpecRow({ label, value, accent, last }) {
  return (
    <View style={[styles.specRow, last && { borderBottomWidth: 0 }]}>
      <View style={styles.specLabel}>
        <Txt variant="monoDim" style={{ fontSize: 11 }}>
          {label}
        </Txt>
      </View>
      <View style={styles.specValue}>
        <Txt variant="body" style={[{ fontSize: 14 }, accent && { color: colors.ok }]}>
          {value}
        </Txt>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.ink1 },
  sectionHeading: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 8 },
  sectionRule: { flex: 1, height: 1, backgroundColor: colors.line, alignSelf: 'center' },
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: 16,
    gap: 10,
  },
  cardAccent: { borderColor: colors.signalDim },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  bulletRow: { flexDirection: 'row', gap: 8 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  buttonPrimary: { backgroundColor: colors.signal, borderColor: colors.signal },
  buttonGhost: { backgroundColor: 'transparent', borderColor: colors.line },
  specRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.line },
  specLabel: {
    width: 104,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.line,
  },
  specValue: { flex: 1, paddingHorizontal: 12, paddingVertical: 12, justifyContent: 'center' },
});
