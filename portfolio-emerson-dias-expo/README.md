# Portfólio — Emerson Willian do Nascimento Dias (React Native + Expo)

Currículo/portfólio mobile feito com **Expo SDK 58**, **React Native** e **Expo Router**.

Telas (rotas em `src/app`): Início, Sobre (tecnologias e módulos), Experiência Acadêmica,
Experiência Profissional, Projetos e Jogo da Forca (React Native puro, sem WebView).

## Rodar no celular

```bash
npm install
npx expo start
```

Abra o app **Expo Go** (versão compatível com o SDK 58) e leia o QR Code.

## Publicar para a entrega

### 1. GitHub

```bash
git init
git add .
git commit -m "Portfólio React Native + Expo"
git branch -M main
git remote add origin https://github.com/EmersonW95/NOME-DO-REPO.git
git push -u origin main
```

### 2. App publicado no Expo (update over-the-air)

```bash
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest update:configure
npx eas-cli@latest update --branch main --message "Primeira versão"
```

No painel https://expo.dev, abra o projeto → **Updates** → clique no update publicado:
a página mostra o **QR Code** e o link para abrir no Expo Go. Esse é o link da entrega.

### 3. Vídeo (até 1 min)

Grave a tela navegando pelas abas e jogando uma partida da forca, envie ao YouTube como
**Público** ou **Não listado** e entregue o link.

## Estrutura

```
src/
├─ app/                 rotas (Expo Router)
│  ├─ _layout.tsx       fontes, splash e abas
│  ├─ index.tsx         Início
│  ├─ sobre.tsx         Sobre + tecnologias/módulos
│  ├─ academico.tsx     Experiência acadêmica
│  ├─ profissional.tsx  Experiência profissional e extracurriculares
│  ├─ projetos.tsx      Galeria de projetos
│  └─ jogo.tsx          Jogo da Forca
├─ components/          UI compartilhada e barra de abas
├─ constants/theme.ts   cores e fontes
└─ data/content.ts      todo o conteúdo (edite aqui para atualizar o app)
```

Verificações: `npm run typecheck`.
