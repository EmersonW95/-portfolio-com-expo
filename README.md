# 📱 Portfólio — Emerson Willian

<p align="center">
  <strong>Ciência da Computação • Desenvolvimento de Software • Tecnologia</strong>
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#️-tecnologias">Tecnologias</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-execução-local">Execução</a> •
  <a href="#-publicação-expo-eas-update">Publicação</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" />
  <img src="https://img.shields.io/badge/Expo_Router-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/EAS_Update-000020?style=for-the-badge&logo=expo&logoColor=white" />
</p>

---

## 🌐 Acesse o projeto


| Item | Link |
|---|---|
| 📦 Código no GitHub | `https://github.com/EmersonW95/-portfolio-com-expo` |
| 📲 App publicado no Expo (QR Code / update over-the-air) | `https://expo.dev/preview/update?message=meu-portfolio-mobile&updateRuntimeVersion=1.0.0&createdAt=2026-11-16T00%3A18%3A19.812Z&slug=exp&projectId=d3469d45-6d23-40c2-ba5b-a0e788b8edd2&group=4adc9a91-222c-4523-b35e-e726bbab0676` |
| 🎥 Vídeo de demonstração (YouTube, até 1 min) | `https://youtube.com/shorts/SD0Ab164UQM?feature=share` |

> Aplicativo mobile de portfólio pessoal, feito para apresentar minha trajetória acadêmica, projetos, experiências e conhecimentos na área de Tecnologia da Informação.

---

## 👨‍💻 Sobre o projeto

Este projeto é a evolução do meu **portfólio pessoal**, que antes era um site em Next.js e agora é um **aplicativo mobile** feito com **React Native e Expo**.

A navegação usa o **Expo Router** (rotas baseadas em arquivos) com uma barra de abas personalizada. O app também inclui o **Jogo da Forca**, que roda **dentro do app, em React Native**, aplicando conceitos de componentes, estado e interação com o usuário.

O visual segue o tema de **prancheta técnica**: fundo quadriculado, bloco de título como em desenhos de engenharia, fontes Space Grotesk e IBM Plex Mono e destaque em laranja.

### 🎯 Objetivos

- Apresentar minha trajetória acadêmica e profissional;
- Centralizar meus principais projetos;
- Demonstrar conhecimentos em desenvolvimento mobile;
- Aplicar React Native, Expo e Expo Router em um projeto real;
- Criar uma interface responsiva e organizada;
- Publicar o app via atualização over-the-air (EAS Update).

---

## 🛠️ Tecnologias

### Base do app

| Tecnologia | Utilização |
|---|---|
| **Expo (SDK 58)** | SDK, Expo Go, bundler e EAS Update |
| **React Native** | Componentes nativos (View, Text, Pressable, ScrollView, Animated) |
| **React** | Componentes, hooks e estado |
| **JavaScript (ES2022)** | Linguagem de todo o código do app |

### Navegação — Expo Router

| Módulo | Utilização |
|---|---|
| **expo-router** | Rotas por arquivos em `src/app` e abas customizadas (`expo-router/ui`) |
| **react-native-screens** | Telas nativas otimizadas |
| **react-native-safe-area-context** | Respeita notch e barras do sistema |
| **react-native-gesture-handler** | Gestos exigidos pelo Expo Router |
| **react-native-reanimated** / **react-native-worklets** | Animações exigidas pelo Expo Router |
| **expo-linking** / **expo-constants** | Deep links e constantes do app |

### Interface e visual

| Módulo | Utilização |
|---|---|
| **react-native-svg** | Fundo quadriculado e desenho da forca |
| **@expo/vector-icons** | Ícones (conjunto Feather) |
| **expo-font** + **@expo-google-fonts** | Fontes Space Grotesk e IBM Plex Mono |
| **expo-splash-screen** | Tela de abertura |
| **expo-status-bar** / **expo-system-ui** | Barra de status e cor de fundo do sistema |

### Recursos nativos e entrega

| Módulo | Utilização |
|---|---|
| **expo-haptics** | Vibração ao acertar, errar e finalizar uma partida |
| **expo-updates** | Atualizações over-the-air com EAS Update |

### Ferramentas

| Ferramenta | Utilização |
|---|---|
| **Git** / **GitHub** | Controle de versão e hospedagem do código |
| **EAS (Expo Application Services)** | Publicação do app |
| **npm** | Gerenciamento de dependências |

---

## ✨ Funcionalidades

### 📲 Telas do app

| Aba | Rota | Conteúdo |
|---|---|---|
| 🏠 **Início** | `/` | Apresentação, bloco de título com meus dados, links de contato e atalhos |
| 👤 **Sobre** | `/sobre` | Quem sou e todas as tecnologias e módulos usados no app, com as versões |
| 🎓 **Acadêmico** | `/academico` | Experiência acadêmica: disciplinas e trabalhos |
| 💼 **Carreira** | `/profissional` | Experiência profissional (objetivo de estágio) e atividades extracurriculares |
| 🗂️ **Projetos** | `/projetos` | Galeria de projetos com link para o GitHub |
| 🎮 **Jogo** | `/jogo` | Jogo da Forca em React Native |

### 🎮 Jogo da Forca

O jogo roda inteiramente em React Native, na aba **Jogo**:

- Palavra exibida com espaços em branco para as letras ainda não descobertas;
- Teclado virtual com todas as letras do alfabeto;
- Cada letra errada diminui as tentativas restantes (limite de **6 erros**) e desenha uma parte do boneco em SVG;
- Lista de tentativas anteriores, diferenciando letras certas e erradas;
- Mensagem de vitória ou derrota, mostrando a palavra completa;
- Botão **Reiniciar**, que sorteia uma nova palavra e zera o estado da partida;
- Banco com **32 palavras** de Tecnologia, cada uma com uma dica;
- Placar de vitórias e derrotas da sessão, animação de tremor a cada erro e vibração (haptics).

---

## 🗂️ Estrutura do projeto

```text
src/
├─ app/                       # rotas (Expo Router)
│  ├─ _layout.js              # fontes, splash e abas
│  ├─ index.js                # Início
│  ├─ sobre.js                # Sobre + tecnologias/módulos
│  ├─ academico.js            # Experiência acadêmica
│  ├─ profissional.js         # Experiência profissional e extracurriculares
│  ├─ projetos.js             # Galeria de projetos
│  └─ jogo.js                 # Jogo da Forca
├─ components/
│  ├─ tab-bar.js              # barra de abas responsiva
│  └─ ui.js                   # Card, Tag, Button, Screen, fundo quadriculado...
├─ constants/theme.js         # cores e fontes
└─ data/content.js            # todo o conteúdo do portfólio
assets/images/                # ícone, splash e favicon
app.json                      # configuração do Expo
```

---

## 🚀 Execução local

**Pré-requisitos:** Node.js e o app **Expo Go** no celular (versão compatível com o SDK 58).

```bash
# instalar as dependências
npm install

# iniciar o servidor de desenvolvimento
npx expo start
```

Leia o QR Code com o Expo Go (Android) ou com a câmera (iOS).

---

---

## 🎓 Contexto acadêmico

Projeto desenvolvido na disciplina de Programação Web e Mobile, como evolução do portfólio em React/Next.js.

---

## 👨‍💻 Autor

**Emerson Willian do Nascimento Dias**
(Ciência da Computação) — Universidade Católica de Pernambuco

- GitHub: https://github.com/EmersonW95
- LinkedIn: https://www.linkedin.com/in/emerson-willian-19984630b/
- E-mail: emersonwdias2013@gmail.com
