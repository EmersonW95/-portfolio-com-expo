import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Linking, View } from 'react-native';
import { Button, Card, FadeIn, Screen, TagRow, Txt } from '@/components/ui';
import { colors, radius } from '@/constants/theme';
import { projects } from '@/data/content';
export default function Projetos() {
  return (
    <Screen
      eyebrow="§4 — Galeria"
      title="Projetos"
      subtitle="Trabalhos realizados, com link para o código no GitHub."
    >
      {projects.map((p, i) => (
        <FadeIn key={p.code} delay={80 + i * 70}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: radius.sm,
                  borderWidth: 1,
                  borderColor: colors.line,
                  backgroundColor: colors.ink2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name={p.icon} size={20} color={colors.signal} />
              </View>
              <View style={{ flex: 1 }}>
                <Txt variant="eyebrow">{p.code}</Txt>
                <Txt variant="h3">{p.title}</Txt>
              </View>
            </View>
            <Txt variant="dim">{p.description}</Txt>
            <TagRow items={p.stack} />
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              {p.link ? (
                <Button
                  icon="external-link"
                  label="Ver repositório"
                  onPress={() => Linking.openURL(p.link)}
                />
              ) : (
                <Button
                  variant="primary"
                  icon="play"
                  label="Jogar agora"
                  onPress={() => router.navigate(p.internalRoute ?? '/jogo')}
                />
              )}
            </View>
          </Card>
        </FadeIn>
      ))}
    </Screen>
  );
}
