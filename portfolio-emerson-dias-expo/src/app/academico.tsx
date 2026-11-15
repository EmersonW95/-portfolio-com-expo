import { View } from 'react-native';

import { Bullets, Card, FadeIn, Screen, TagRow, Txt } from '@/components/ui';
import { colors } from '@/constants/theme';
import { academic, profile } from '@/data/content';

export default function Academico() {
  return (
    <Screen
      eyebrow="§1 — Formação"
      title="Experiência acadêmica"
      subtitle={`${profile.course} · ${profile.institution} · ${profile.period}`}>
      {academic.map((item, i) => (
        <FadeIn key={item.code} delay={80 + i * 70}>
          <Card>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
              <Txt variant="eyebrow">{item.code}</Txt>
              <Txt variant="monoDim" style={{ flexShrink: 1, textAlign: 'right', fontSize: 11 }}>
                {item.discipline}
              </Txt>
            </View>
            <Txt variant="h3">{item.title}</Txt>
            <Txt variant="dim">{item.description}</Txt>
            <TagRow items={item.stack} />
            <View style={{ height: 1, backgroundColor: colors.lineSoft }} />
            <Bullets items={item.highlights} />
          </Card>
        </FadeIn>
      ))}
    </Screen>
  );
}
