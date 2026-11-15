import { View } from 'react-native';
import pkg from '../../package.json';
import { Card, FadeIn, Screen, SectionHeading, TagRow, Txt } from '@/components/ui';
import { colors, radius } from '@/constants/theme';
import { profile } from '@/data/content';
const groups = [
  {
    code: 'A',
    title: 'Base do app',
    items: [
      { name: 'expo', purpose: 'SDK e ferramentas (Expo Go, bundler, EAS Update)' },
      { name: 'react-native', purpose: 'Componentes nativos: View, Text, Pressable, ScrollView, Animated' },
      { name: 'react', purpose: 'Componentes, hooks e estado (useState, useEffect, useRef)' },
    ],
  },
  {
    code: 'B',
    title: 'Navegação (Expo Router)',
    items: [
      { name: 'expo-router', purpose: 'Rotas por arquivos em src/app e abas customizadas (expo-router/ui)' },
      { name: 'react-native-screens', purpose: 'Telas nativas otimizadas para navegação' },
      { name: 'react-native-safe-area-context', purpose: 'Respeita notch e barras do sistema' },
      { name: 'react-native-gesture-handler', purpose: 'Gestos exigidos pelo Expo Router' },
      { name: 'react-native-reanimated', purpose: 'Animações exigidas pelo Expo Router' },
      { name: 'react-native-worklets', purpose: 'Runtime de worklets usado pelo Reanimated' },
      { name: 'expo-linking', purpose: 'Deep links e esquema do app' },
      { name: 'expo-constants', purpose: 'Constantes do app, usadas pelo Expo Router' },
    ],
  },
  {
    code: 'C',
    title: 'Interface e visual',
    items: [
      { name: 'react-native-svg', purpose: 'Fundo quadriculado e desenho da forca' },
      { name: '@expo/vector-icons', purpose: 'Ícones (conjunto Feather)' },
      { name: 'expo-font', purpose: 'Carregamento das fontes personalizadas' },
      { name: '@expo-google-fonts/space-grotesk', purpose: 'Fonte dos títulos e textos' },
      { name: '@expo-google-fonts/ibm-plex-mono', purpose: 'Fonte monoespaçada dos rótulos' },
      { name: 'expo-splash-screen', purpose: 'Tela de abertura' },
      { name: 'expo-status-bar', purpose: 'Barra de status clara sobre fundo escuro' },
      { name: 'expo-system-ui', purpose: 'Cor de fundo da janela do sistema' },
    ],
  },
  {
    code: 'D',
    title: 'Recursos nativos e entrega',
    items: [
      { name: 'expo-haptics', purpose: 'Vibração ao acertar, errar e finalizar no jogo' },
      { name: 'expo-updates', purpose: 'Atualizações over-the-air publicadas com EAS Update' },
    ],
  },
  {
    code: 'E',
    title: 'Pré-visualização web (opcional)',
    items: [
      { name: 'react-dom', purpose: 'Renderização web usada pelo Expo Router' },
      { name: 'react-native-web', purpose: 'Rodar o app no navegador durante o desenvolvimento' },
    ],
  },
];
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
const versionOf = (name) => (deps[name] ?? '').replace(/^[~^]/, '');
const tree = `src/
├─ app/
│  ├─ _layout.js        abas + fontes
│  ├─ index.js          Home
│  ├─ sobre.js          Sobre
│  ├─ academico.js      Exp. acadêmica
│  ├─ profissional.js   Exp. profissional
│  ├─ projetos.js       Projetos
│  └─ jogo.js           Jogo da Forca
├─ components/          UI e barra de abas
├─ constants/theme.js   cores e fontes
└─ data/content.js      todo o conteúdo`;
export default function Sobre() {
  return (
    <Screen eyebrow="Sobre" title="Quem sou e como este app foi feito">
      <FadeIn delay={80}>
        <Card>
          <Txt variant="h3">{profile.name}</Txt>
          <Txt variant="dim">
            Estudante do {profile.period} de {profile.course} na {profile.institution}. Já passei por várias
            camadas: sistemas embarcados com Raspberry Pi e sensores, back-end em Java com Spring Boot e
            front-end com React e Next.js. Este app leva o portfólio para o mobile com React Native e Expo.
          </Txt>
          <Txt variant="dim">{profile.goal}</Txt>
        </Card>
      </FadeIn>

      <SectionHeading code="§" title="Tecnologias e módulos" />
      {groups.map((g, gi) => (
        <FadeIn key={g.code} delay={140 + gi * 70}>
          <Card>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'baseline' }}>
              <Txt variant="eyebrow">{g.code}</Txt>
              <Txt variant="h3" style={{ fontSize: 16 }}>
                {g.title}
              </Txt>
            </View>
            {g.items.map((m) => (
              <View key={m.name} style={{ gap: 2, paddingVertical: 4 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                  <Txt variant="mono" style={{ flexShrink: 1, color: colors.paper }}>
                    {m.name}
                  </Txt>
                  <Txt variant="monoDim" style={{ fontSize: 11 }}>
                    {versionOf(m.name)}
                  </Txt>
                </View>
                <Txt variant="dim" style={{ fontSize: 13, lineHeight: 19 }}>
                  {m.purpose}
                </Txt>
              </View>
            ))}
          </Card>
        </FadeIn>
      ))}

      <SectionHeading code="§" title="Estrutura do projeto" />
      <FadeIn delay={200}>
        <View
          style={{
            backgroundColor: colors.ink0,
            borderColor: colors.line,
            borderWidth: 1,
            borderRadius: radius.md,
            padding: 14,
          }}
        >
          <Txt variant="mono" style={{ fontSize: 11.5, lineHeight: 17, color: colors.paperDim }}>
            {tree}
          </Txt>
        </View>
      </FadeIn>

      <SectionHeading code="§" title="APIs do React Native usadas" />
      <TagRow
        items={['Animated', 'Pressable', 'ScrollView', 'StyleSheet', 'Linking', 'useWindowDimensions']}
      />
    </Screen>
  );
}
