import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, FadeIn, GridBackground, SpecRow, Txt } from '@/components/ui';
import { colors, radius } from '@/constants/theme';
import { academic, hangmanWords, profile, projects } from '@/data/content';
const shortcuts = [
  { icon: 'user', title: 'Sobre', sub: 'Quem sou e as tecnologias deste app', href: '/sobre' },
  { icon: 'book-open', title: 'Experiência acadêmica', sub: 'Disciplinas e trabalhos', href: '/academico' },
  {
    icon: 'briefcase',
    title: 'Experiência profissional',
    sub: 'Objetivo e atividades extras',
    href: '/profissional',
  },
  { icon: 'layers', title: 'Projetos', sub: 'Galeria com links do GitHub', href: '/projetos' },
  { icon: 'play-circle', title: 'Jogo da Forca', sub: 'Jogue direto no app', href: '/jogo', accent: true },
];
function PulseDot() {
  const v = useRef(new Animated.Value(0.35)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(v, {
          toValue: 0.35,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v]);
  return <Animated.View style={[styles.dot, { opacity: v }]} />;
}
export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <GridBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 28,
          paddingHorizontal: 20,
          paddingBottom: 36,
          gap: 22,
        }}
      >
        <FadeIn style={{ gap: 10 }}>
          <View style={styles.brandRow}>
            <Txt variant="mono" style={{ letterSpacing: 0.6 }}>
              EWD
            </Txt>
            <PulseDot />
            <Txt variant="monoDim" style={{ marginLeft: 'auto' }}>
              rev. 2026
            </Txt>
          </View>
          <Txt variant="eyebrow" style={{ marginTop: 14 }}>
            Ficha técnica — estudante de Ciência da Computação
          </Txt>
          <Txt variant="h1" style={{ fontSize: 36, lineHeight: 41 }}>
            {profile.name}
          </Txt>
          <Txt variant="dim" style={{ fontSize: 15.5 }}>
            {profile.goal}
          </Txt>
        </FadeIn>

        <FadeIn delay={120} style={styles.buttonRow}>
          <Button
            variant="primary"
            icon="mail"
            label="E-mail"
            onPress={() => Linking.openURL(`mailto:${profile.email}`)}
          />
          <Button icon="github" label="GitHub" onPress={() => Linking.openURL(profile.github)} />
          <Button icon="linkedin" label="LinkedIn" onPress={() => Linking.openURL(profile.linkedin)} />
        </FadeIn>

        <FadeIn delay={220}>
          <View style={styles.titleBlock}>
            <SpecRow label="Curso" value={profile.course} />
            <SpecRow label="Instituição" value={profile.institution} />
            <SpecRow label="Período" value={profile.period} />
            <SpecRow label="Local" value={profile.location} />
            <SpecRow label="Status" value="Disponível para estágio" accent last />
          </View>
        </FadeIn>

        <FadeIn delay={320} style={styles.statsRow}>
          <Stat value={academic.length} label="experiências acadêmicas" />
          <Stat value={projects.length} label="projetos" />
          <Stat value={hangmanWords.length} label="palavras no jogo" />
        </FadeIn>

        <FadeIn delay={420} style={{ gap: 10 }}>
          <Txt variant="eyebrow">Navegar</Txt>
          {shortcuts.map((s) => (
            <Pressable
              key={s.href}
              onPress={() => router.navigate(s.href)}
              style={({ pressed }) => pressed && { opacity: 0.8 }}
            >
              <Card accent={s.accent} style={styles.shortcut}>
                <View style={[styles.iconBox, s.accent && { borderColor: colors.signal }]}>
                  <Feather name={s.icon} size={18} color={s.accent ? colors.signal : colors.paper} />
                </View>
                <View style={{ flex: 1 }}>
                  <Txt variant="h3" style={{ fontSize: 16 }}>
                    {s.title}
                  </Txt>
                  <Txt variant="dim" style={{ fontSize: 13 }}>
                    {s.sub}
                  </Txt>
                </View>
                <Feather name="chevron-right" size={18} color={colors.paperDim} />
              </Card>
            </Pressable>
          ))}
        </FadeIn>
      </ScrollView>
    </View>
  );
}
function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Txt variant="h2" style={{ color: colors.signal, fontSize: 26 }}>
        {value}
      </Txt>
      <Txt variant="monoDim" style={{ fontSize: 10.5 }}>
        {label}
      </Txt>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.ink1 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.signal },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  titleBlock: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    backgroundColor: colors.panel,
    overflow: 'hidden',
  },
  statsRow: { flexDirection: 'row', gap: 10 },
  stat: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    backgroundColor: colors.panel,
    padding: 12,
    gap: 2,
  },
  shortcut: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink2,
  },
});
