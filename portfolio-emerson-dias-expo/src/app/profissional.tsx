import { View } from 'react-native';

import { Card, FadeIn, Screen, SectionHeading, Txt } from '@/components/ui';
import { colors, radius } from '@/constants/theme';
import { extracurricular, profile } from '@/data/content';

export default function Profissional() {
  return (
    <Screen eyebrow="§2 — Carreira" title="Experiência profissional" subtitle="Objetivo atual e atividades fora da sala de aula.">
      <FadeIn delay={80}>
        <Card accent>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Txt variant="eyebrow">PRO-01</Txt>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.ok,
                borderRadius: radius.pill,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}>
              <Txt variant="monoDim" style={{ color: colors.ok, fontSize: 11 }}>
                em aberto
              </Txt>
            </View>
          </View>
          <Txt variant="h3">Primeira oportunidade em andamento</Txt>
          <Txt variant="dim">
            Ainda não possuo experiência profissional formal registrada. {profile.goal}
          </Txt>
          <Txt variant="dim">
            A base vem dos projetos acadêmicos: de sistemas embarcados a back-end e front-end, agora incluindo apps
            móveis com React Native.
          </Txt>
        </Card>
      </FadeIn>

      <SectionHeading code="§3" title="Atividades extracurriculares" />
      {extracurricular.map((item, i) => (
        <FadeIn key={item.code} delay={180 + i * 80}>
          <Card>
            <Txt variant="eyebrow">{item.code}</Txt>
            <Txt variant="h3">{item.title}</Txt>
            <Txt variant="dim">{item.description}</Txt>
          </Card>
        </FadeIn>
      ))}
    </Screen>
  );
}
