# Solscan — Solana Wallet Explorer

A React Native mobile app built with Expo for exploring Solana wallets. Search any wallet address to view SOL balance, token holdings, transaction history, and real-time token market data.

---

## Features

### Wallet Search
- Search any Solana wallet address on mainnet or devnet
- Displays SOL balance and shortened wallet address
- Stores up to 20 recent searches for quick re-access
- Favorite wallets with a heart button

### Token Holdings
- Lists all SPL tokens held in the searched wallet
- Shows token mint address and balance amount
- Tap any token to open its detail screen

### Token Details
- Token logo, name, and symbol
- Live price with 24h percentage change
- Your holding balance and estimated USD value
- Market data: Market Cap, FDV, 24h Volume, Liquidity
- Contract address, network, and DEX info
- Direct links to DexScreener and Solscan.io

### Transaction History
- Last 10 transactions for any searched wallet
- Shows signature (shortened), time elapsed, and success/failure status
- Tap to open any transaction on Solscan.io

### Network Toggle
- Switch between Mainnet and Devnet from home screen or settings
- Visual indicator: green dot = mainnet, orange dot = devnet

### Token Swap (UI)
- Select "from" and "to" tokens with amount inputs
- Displays balances and USD equivalents
- Note: Swap execution is not yet connected to a DEX

### Settings
- View your account email and UID
- Toggle network (Mainnet / Devnet)
- View count of saved wallets and search history
- Clear search history
- Log out

---

## Screens

| Screen | Route | Description |
|---|---|---|
| Onboarding | `/(public)/onboarding` | 3-step intro carousel, shown once on first launch |
| Login | `/(public)/login` | Sign in with email and password |
| Signup | `/(public)/signup` | Create a new account |
| Home | `/(protected)/` | Wallet search, token list, transaction history |
| Token Detail | `/(protected)/token/[mint]` | Live token price and market data |
| Swap | `/(protected)/swap` | Token swap interface |
| Settings | `/(protected)/settings` | Account info, network, history management |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native + Expo (SDK 54) |
| Routing | Expo Router (file-based) |
| Authentication | Firebase Auth (email/password) |
| Blockchain Data | Solana JSON-RPC (direct calls, no backend) |
| Token Market Data | DexScreener API (free, no API key) |
| State Management | Zustand |
| Server State | TanStack React Query |
| Styling | StyleSheet + NativeWind (Tailwind) |
| Storage | AsyncStorage |
| Icons | Expo Vector Icons (Ionicons) |

---

## Project Structure

```
app/
├── _layout.tsx               # Root layout with providers
├── +not-found.tsx            # 404 screen
├── (public)/                 # Unauthenticated screens
│   ├── onboarding.tsx
│   ├── login.tsx
│   └── signup.tsx
└── (protected)/              # Authenticated screens (tab navigator)
    ├── index.tsx             # Home — wallet search
    ├── swap.tsx              # Token swap
    ├── settings.tsx          # Settings
    └── token/[mint].tsx      # Dynamic token detail page

src/
├── components/
│   ├── ui/                   # Button, Input, Screen, Loader
│   └── FavouriteButton.tsx   # Heart button for saving wallets
├── hooks/                    # useAuth, useOnboarding, useColorScheme
├── providers/                # AuthProvider, NavigationGuard, QueryProvider
├── services/                 # Firebase config, AsyncStorage helpers
├── stores/
│   └── wallet-store.ts       # Zustand: favorites, search history, network
├── lib/
│   └── queryClient.ts        # React Query configuration
└── types/                    # TypeScript type definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (macOS), Android Emulator, or Expo Go app

### Installation

```bash
git clone <repo-url>
cd Solscan
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

To get these values:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable Email/Password authentication
3. Go to Project Settings > Your Apps > Web App config

### Run

```bash
npx expo start
```

Then press:
- `i` — iOS simulator
- `a` — Android emulator
- `w` — web browser

---

## APIs Used

### Solana JSON-RPC
Direct calls to Solana nodes. No API key required.

| Method | Purpose |
|---|---|
| `getBalance` | SOL balance for a wallet address |
| `getTokenAccountsByOwner` | All SPL token accounts owned by a wallet |
| `getSignaturesForAddress` | Last 10 transaction signatures |

- Mainnet: `https://api.mainnet-beta.solana.com`
- Devnet: `https://api.devnet.solana.com`

### DexScreener API
Free, no authentication required.

- Endpoint: `https://api.dexscreener.com/latest/dex/tokens/{mint}`
- Returns: price, 24h change, market cap, FDV, volume, liquidity

---

## Navigation Flow

```
App Start
  └── Check onboarding (AsyncStorage)
        ├── First launch → Onboarding → Signup
        └── Returning user
              ├── Not logged in → Login
              └── Logged in → Home
                    ├── Home (Wallet Search + Tokens + Transactions)
                    ├── Swap
                    ├── Settings
                    └── Token Detail (tap any token from the list)
```

Auth state is managed by Firebase and persisted across app restarts via AsyncStorage.

---

## Known Limitations

- Favorited wallets are stored in memory only and lost on app restart (Firebase sync not yet implemented)
- Token swap UI is not connected to any DEX
- No format validation for Solana address input
- Public Solana RPC endpoints are subject to rate limiting under heavy use

---

## Building for Production

### Using EAS Build

```bash
npm install -g eas-cli
eas login
eas build --platform all
```

### Local builds

```bash
# iOS
npx expo run:ios --configuration Release

# Android
npx expo run:android --variant release
```

---

## Troubleshooting

```bash
# Clear Metro cache
npx expo start -c

# Clear all caches
rm -rf node_modules .expo
npm install
```

---

## License

MIT
