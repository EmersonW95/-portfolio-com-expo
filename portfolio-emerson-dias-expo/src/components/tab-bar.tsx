import { Feather } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { TabList, TabTrigger, type TabListProps, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View, useWindowDimensions, type PressableProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '@/constants/theme';
import type { IconName } from '@/data/content';

type TabButtonProps = TabTriggerSlotProps & { icon: IconName; label: string; to: string };

function useTabMetrics() {
  const { width } = useWindowDimensions();
  if (width < 350) return { icon: 18, font: 9, top: 8, maxWidth: width };
  if (width < 600) return { icon: 21, font: 10, top: 10, maxWidth: width };
  if (width < 900) return { icon: 24, font: 12, top: 12, maxWidth: 640 };
  return { icon: 26, font: 13, top: 14, maxWidth: 720 };
}

function TabButton({ icon, label, to, isFocused, children: _children, ...props }: TabButtonProps) {
  const pathname = usePathname();
  const m = useTabMetrics();
  const active = to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);
  const tint = active || isFocused ? colors.signal : colors.paperDim;

  return (
    <Pressable
      {...(props as unknown as PressableProps)}
      onPress={() => router.navigate(to as never)}
      style={[styles.button, { paddingTop: m.top }]}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}>
      <View style={[styles.indicator, active && styles.indicatorOn]} />
      <Feather name={icon} size={m.icon} color={tint} />
      <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8} style={[styles.label, { color: tint, fontSize: m.font }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function TabBarContainer(props: TabListProps) {
  const insets = useSafeAreaInsets();
  const m = useTabMetrics();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom - 6, 8) }]}>
      <View {...props} style={[styles.row, { maxWidth: m.maxWidth }]}>
        {props.children}
      </View>
    </View>
  );
}

export default function AppTabBar() {
  return (
    <TabList asChild>
      <TabBarContainer>
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon="home" label="Início" to="/" />
        </TabTrigger>
        <TabTrigger name="sobre" href="/sobre" asChild>
          <TabButton icon="user" label="Sobre" to="/sobre" />
        </TabTrigger>
        <TabTrigger name="academico" href="/academico" asChild>
          <TabButton icon="book-open" label="Acadêmico" to="/academico" />
        </TabTrigger>
        <TabTrigger name="profissional" href="/profissional" asChild>
          <TabButton icon="briefcase" label="Carreira" to="/profissional" />
        </TabTrigger>
        <TabTrigger name="projetos" href="/projetos" asChild>
          <TabButton icon="layers" label="Projetos" to="/projetos" />
        </TabTrigger>
        <TabTrigger name="jogo" href="/jogo" asChild>
          <TabButton icon="play-circle" label="Jogo" to="/jogo" />
        </TabTrigger>
      </TabBarContainer>
    </TabList>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    backgroundColor: colors.ink0,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
    paddingHorizontal: 2,
  },
  indicator: {
    position: 'absolute',
    top: -1,
    height: 2,
    width: '56%',
    backgroundColor: 'transparent',
  },
  indicatorOn: { backgroundColor: colors.signal },
  label: { fontFamily: fonts.monoMedium },
});
