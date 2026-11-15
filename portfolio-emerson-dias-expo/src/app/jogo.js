import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { Button, Card, Screen, Txt } from '@/components/ui';
import { colors, fonts, radius } from '@/constants/theme';
import { hangmanWords } from '@/data/content';
const MAX_WRONG = 6;
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
function pickWord(exclude) {
  const pool = hangmanWords.filter((w) => w.word !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}
function chunk(arr, size) {
  const rows = [];
  for (let i = 0; i < arr.length; i += size) rows.push(arr.slice(i, i + size));
  return rows;
}

function haptic(fn) {
  fn().catch(() => {});
}
export default function Jogo() {
  const { width } = useWindowDimensions();
  const [current, setCurrent] = useState(() => pickWord());
  const [guessed, setGuessed] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const letters = current.word.split('');
  const wrongGuesses = guessed.filter((l) => !letters.includes(l));
  const win = letters.every((l) => guessed.includes(l));
  const lose = wrongGuesses.length >= MAX_WRONG;
  const gameOver = win || lose;
  /* tremor do boneco a cada erro */
  const shake = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (wrongGuesses.length === 0) return;
    Animated.sequence([
      Animated.timing(shake, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 5, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  }, [wrongGuesses.length, shake]);
  /* entrada do banner de vitória/derrota */
  const banner = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    banner.setValue(0);
    if (gameOver) {
      Animated.timing(banner, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }).start();
    }
  }, [gameOver, banner]);
  const guessLetter = useCallback(
    (letter) => {
      if (gameOver || guessed.includes(letter)) return;
      const next = [...guessed, letter];
      const nextWrong = next.filter((l) => !letters.includes(l)).length;
      const nextWin = letters.every((l) => next.includes(l));
      const nextLose = nextWrong >= MAX_WRONG;
      setGuessed(next);
      if (nextWin) {
        setWins((w) => w + 1);
        haptic(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
      } else if (nextLose) {
        setLosses((l) => l + 1);
        haptic(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error));
      } else if (letters.includes(letter)) {
        haptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
      } else {
        haptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy));
      }
    },
    [gameOver, guessed, letters],
  );
  const restart = useCallback(() => {
    setCurrent((prev) => pickWord(prev.word));
    setGuessed([]);
    haptic(() => Haptics.selectionAsync());
  }, []);
  /* dimensões responsivas */
  const innerWidth = width - 40 - 34; // margem da tela + padding do card
  const perRow = letters.length <= 9 ? letters.length : Math.ceil(letters.length / 2);
  const gap = 6;
  const slotW = Math.min(36, Math.floor((innerWidth - gap * (perRow - 1)) / perRow));
  const rows = chunk(letters, perRow);
  const gallowsSize = Math.min(220, innerWidth);
  const keyGap = 5;
  const keyW = Math.floor((width - 40 - keyGap * 9) / 10);
  const figureColor = lose ? colors.bad : win ? colors.ok : colors.signal;
  return (
    <Screen
      eyebrow="Projeto pessoal — §6"
      title="Jogo da Forca"
      subtitle="Descubra o termo de tecnologia antes de completar o desenho. Você pode errar até 6 vezes."
    >
      {/* placar */}
      <View style={styles.scoreRow}>
        <Score label="vitórias" value={wins} color={colors.ok} />
        <Score label="derrotas" value={losses} color={colors.bad} />
      </View>

      <Card style={{ alignItems: 'center', gap: 14 }}>
        <Animated.View style={{ transform: [{ translateX: shake }] }}>
          <Svg width={gallowsSize} height={gallowsSize * 1.05} viewBox="0 0 200 210">
            <Line
              x1={20}
              y1={198}
              x2={140}
              y2={198}
              stroke={colors.paperDim}
              strokeOpacity={0.5}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            <Line
              x1={50}
              y1={198}
              x2={50}
              y2={14}
              stroke={colors.paperDim}
              strokeOpacity={0.5}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            <Line
              x1={50}
              y1={14}
              x2={130}
              y2={14}
              stroke={colors.paperDim}
              strokeOpacity={0.5}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            <Line
              x1={130}
              y1={14}
              x2={130}
              y2={38}
              stroke={colors.paperDim}
              strokeOpacity={0.5}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            {wrongGuesses.length >= 1 && (
              <Circle cx={130} cy={55} r={17} stroke={figureColor} strokeWidth={4} fill="none" />
            )}
            {wrongGuesses.length >= 2 && (
              <Line
                x1={130}
                y1={72}
                x2={130}
                y2={125}
                stroke={figureColor}
                strokeWidth={4}
                strokeLinecap="round"
              />
            )}
            {wrongGuesses.length >= 3 && (
              <Line
                x1={130}
                y1={88}
                x2={108}
                y2={110}
                stroke={figureColor}
                strokeWidth={4}
                strokeLinecap="round"
              />
            )}
            {wrongGuesses.length >= 4 && (
              <Line
                x1={130}
                y1={88}
                x2={152}
                y2={110}
                stroke={figureColor}
                strokeWidth={4}
                strokeLinecap="round"
              />
            )}
            {wrongGuesses.length >= 5 && (
              <Line
                x1={130}
                y1={125}
                x2={112}
                y2={158}
                stroke={figureColor}
                strokeWidth={4}
                strokeLinecap="round"
              />
            )}
            {wrongGuesses.length >= 6 && (
              <Line
                x1={130}
                y1={125}
                x2={148}
                y2={158}
                stroke={figureColor}
                strokeWidth={4}
                strokeLinecap="round"
              />
            )}
          </Svg>
        </Animated.View>

        {/* tentativas restantes */}
        <View style={{ alignItems: 'center', gap: 6 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {Array.from({ length: MAX_WRONG }).map((_, i) => (
              <View key={i} style={[styles.pip, i < MAX_WRONG - wrongGuesses.length && styles.pipOn]} />
            ))}
          </View>
          <Txt variant="monoDim">
            tentativas restantes:{' '}
            <Txt
              variant="mono"
              style={{ color: MAX_WRONG - wrongGuesses.length <= 2 ? colors.bad : colors.paper }}
            >
              {MAX_WRONG - wrongGuesses.length}
            </Txt>
          </Txt>
        </View>
      </Card>

      {/* palavra */}
      <Card style={{ alignItems: 'center', gap: 12 }}>
        <Txt variant="monoDim" style={{ textAlign: 'center' }}>
          Dica: {current.hint}
        </Txt>
        <View style={{ gap: 10, alignItems: 'center' }}>
          {rows.map((row, ri) => (
            <View key={ri} style={{ flexDirection: 'row', gap }}>
              {row.map((l, i) => {
                const guessedIt = guessed.includes(l);
                const shown = guessedIt || gameOver;
                return (
                  <View key={i} style={[styles.slot, { width: slotW }]}>
                    <Txt
                      variant="mono"
                      style={{
                        fontFamily: fonts.monoMedium,
                        fontSize: Math.min(24, slotW - 6),
                        color: guessedIt ? colors.paper : colors.bad,
                      }}
                    >
                      {shown ? l : ' '}
                    </Txt>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </Card>

      {gameOver && (
        <Animated.View
          style={[
            styles.banner,
            win ? styles.bannerWin : styles.bannerLose,
            {
              opacity: banner,
              transform: [{ scale: banner.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }],
            },
          ]}
        >
          <Txt variant="h3" style={{ color: win ? colors.ok : colors.bad }}>
            {win ? 'Parabéns, você venceu!' : 'Fim de jogo — você perdeu'}
          </Txt>
          <Txt variant="dim">
            {win ? 'Você descobriu a palavra: ' : 'A palavra era: '}
            <Txt variant="mono" style={{ color: colors.paper }}>
              {current.word}
            </Txt>
          </Txt>
        </Animated.View>
      )}

      {/* teclado virtual */}
      <View style={{ gap: keyGap, alignItems: 'center' }}>
        {KEY_ROWS.map((row) => (
          <View key={row} style={{ flexDirection: 'row', gap: keyGap }}>
            {row.split('').map((letter) => {
              const used = guessed.includes(letter);
              const correct = used && letters.includes(letter);
              const wrong = used && !letters.includes(letter);
              return (
                <Pressable
                  key={letter}
                  disabled={used || gameOver}
                  onPress={() => guessLetter(letter)}
                  accessibilityRole="button"
                  accessibilityLabel={`Letra ${letter}`}
                  style={({ pressed }) => [
                    styles.key,
                    { width: keyW },
                    correct && styles.keyCorrect,
                    wrong && styles.keyWrong,
                    pressed && { backgroundColor: colors.line },
                    (used || gameOver) && !correct && !wrong && { opacity: 0.45 },
                  ]}
                >
                  <Txt
                    variant="mono"
                    style={{
                      fontFamily: fonts.monoMedium,
                      color: correct ? colors.ok : wrong ? colors.bad : colors.paper,
                    }}
                  >
                    {letter}
                  </Txt>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      {/* tentativas anteriores */}
      <Card>
        <Txt variant="eyebrow">Tentativas anteriores</Txt>
        {guessed.length === 0 ? (
          <Txt variant="monoDim">nenhuma ainda</Txt>
        ) : (
          <View style={styles.chipRow}>
            {guessed.map((l) => {
              const ok = letters.includes(l);
              return (
                <View key={l} style={[styles.chip, { borderColor: ok ? colors.ok : colors.bad }]}>
                  <Txt variant="mono" style={{ color: ok ? colors.ok : colors.bad }}>
                    {l}
                  </Txt>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Legend color={colors.ok} label="letra certa" />
          <Legend color={colors.bad} label="letra errada" />
        </View>
      </Card>

      <View style={{ flexDirection: 'row' }}>
        <Button variant="primary" icon="refresh-cw" label="Reiniciar" onPress={restart} />
      </View>
    </Screen>
  );
}
function Score({ label, value, color }) {
  return (
    <View style={styles.score}>
      <Txt variant="h2" style={{ color, fontSize: 24 }}>
        {value}
      </Txt>
      <Txt variant="monoDim" style={{ fontSize: 11 }}>
        {label}
      </Txt>
    </View>
  );
}
function Legend({ color, label }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
      <Txt variant="monoDim" style={{ fontSize: 11 }}>
        {label}
      </Txt>
    </View>
  );
}
const styles = StyleSheet.create({
  scoreRow: { flexDirection: 'row', gap: 10 },
  score: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    backgroundColor: colors.panel,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pip: { width: 22, height: 6, borderRadius: 3, backgroundColor: colors.line },
  pipOn: { backgroundColor: colors.signal },
  slot: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: colors.line,
    paddingBottom: 2,
  },
  banner: { borderWidth: 1, borderRadius: radius.md, padding: 16, gap: 4 },
  bannerWin: { borderColor: colors.ok, backgroundColor: 'rgba(74,222,128,0.1)' },
  bannerLose: { borderColor: colors.bad, backgroundColor: 'rgba(255,93,93,0.1)' },
  key: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink2,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
  },
  keyCorrect: { borderColor: colors.ok, backgroundColor: 'rgba(74,222,128,0.1)' },
  keyWrong: { borderColor: colors.bad, backgroundColor: 'rgba(255,93,93,0.1)' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
