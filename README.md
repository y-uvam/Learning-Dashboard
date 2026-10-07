# Learning Dashboard — Mobile Engineering Technical Assignment

A robust, production-grade **Learning Dashboard** mobile application implementing clean architecture, reactive state management, write-through offline caching, lesson progress tracking, and comprehensive unit tests.

---

## Technical Assignment Q&A (1-Page Engineering Overview)

### 1. Architecture: Why did you choose your architecture?
We chose **Clean Architecture / MVVM with the Repository Pattern**:
```
UI (Screens & Reusable Components)
  ↓
Presentation / State Layer (Redux Toolkit Slices & Thunks)
  ↓
Repository Layer (CourseRepository)
  ↓
Data Sources: Remote Mock API + Local Storage (AsyncStorage) + NetInfo
```
- **Separation of Concerns:** The UI layer remains purely declarative and free of data fetching or caching logic.
- **Single Source of Truth:** `CourseRepository` mediates between network and local cache. UI components consume normalized state from Redux selectors.
- **Testability & Maintainability:** Business logic (progress calculation, form validation, state mutations) is isolated in pure functions and tested independently with 100% predictability.
- **Production Scalability:** Swapping mock APIs with Axios/GraphQL or replacing AsyncStorage with SQLite/WatermelonDB requires zero changes to the UI layer.

---

### 2. Offline Support: How are you storing and loading offline data?
- **Storage Mechanism:** `@react-native-async-storage/async-storage` serves as the persistent key-value cache (`@edu_courses_cache` and `@edu_auth_session`).
- **Offline-First / Cache-Fallback Strategy:**
  1. **Network Detection:** `@react-native-community/netinfo` continuously monitors network reachability.
  2. **Fetch Flow:** If online, fresh data is fetched from the API, merged with local completion states, and persisted to cache. If offline or on network failure, cached courses are immediately served.
  3. **Write-Through Mutation:** When a user toggles a lesson status (`✓ Completed` ↔ `○ Pending`), `CourseRepository.toggleLesson` updates the local array, recalculates course progress (`(completed / total) * 100`), writes immediately to `AsyncStorage`, and updates Redux state.
  4. **Visual Feedback:** A non-intrusive `OfflineBanner` informs the user when viewing cached data.

---

### 3. Security: Where would you store authentication tokens in a production application?
In production, sensitive authentication tokens (JWT access tokens, refresh tokens, biometric keys) **must NEVER** be stored in plaintext `AsyncStorage` or `localStorage`.
- **iOS / macOS:** Stored in the **iOS Keychain** via `kSecClassGenericPassword` with `kSecAccessControl` enforcing biometric / device passcode constraints (using `react-native-keychain` or native `Security.framework`).
- **Android:** Stored in **Android Keystore-backed EncryptedSharedPreferences** (Android Jetpack Security library) using AES-256 GCM encryption.
- **Network Security:** Enforce HTTPS with **SSL/TLS Certificate Pinning** and auto-refresh expired access tokens using silent refresh token rotation via Axios response interceptors.

---

### 4. Scale: If this application had 1M users + hundreds of courses, 3–5 improvements:
1. **Database Upgrade (SQLite / WatermelonDB):** Replace key-value AsyncStorage with a relational database (WatermelonDB / Room / CoreData) supporting indexing, relational queries, and lazy loading instead of loading all course objects into memory.
2. **Pagination & Virtualized Lists:** Implement cursor-based pagination for the course catalog (`pageSize=20`) with windowed rendering (`FlashList` / `LazyColumn` / `LazyVStack`) to maintain 60 FPS scrolling.
3. **Delta Sync & Conflict Resolution:** Instead of sending full course payloads, implement lightweight CRDT or timestamp-based delta sync (`lastModifiedTimestamp`) with a background worker (WorkManager / BGAppRefresh) to queue offline mutations.
4. **CDN & Image Caching:** Serve course media and thumbnails via global CDN (Cloudflare / Fastly) with disk-cached progressive image loading (e.g., `react-native-fast-image` / Coil / Kingfisher).
5. **Analytics & Performance Monitoring:** Integrate Sentry / Firebase Performance Monitoring for real-time crash tracking, API latency tracking, and ANR/freeze detection.

---

### 5. Second Platform Implementation (Native Android & iOS/macOS Mapping)

| Layer / Responsibility | React Native (Current) | Android (Kotlin / Jetpack Compose) | iOS / macOS (Swift / SwiftUI) |
| :--- | :--- | :--- | :--- |
| **UI Framework** | React Native JSX | Jetpack Compose (`@Composable`, `LazyColumn`, `LinearProgressIndicator`) | SwiftUI (`View`, `List`, `ProgressView`, `NavigationStack`) |
| **State Management** | Redux Toolkit (`createSlice`, `useSelector`) | `ViewModel` + Kotlin `StateFlow` / `SharedFlow` | `ObservableObject` / `@Observable` + `@Published` / `State` |
| **Asynchronous Ops** | Async/Await + Redux Thunk | Kotlin Coroutines (`suspend`, `viewModelScope`, `Flow`) | Swift Concurrency (`async/await`, `Task`, `AsyncSequence`) |
| **Local Storage** | `@react-native-async-storage` | Room Database (SQLite) + Jetpack DataStore | SwiftData / Core Data / GRDB |
| **Network & Offline** | NetInfo + Fetch/Axios | Retrofit + OkHttp + `ConnectivityManager` NetworkCallback | URLSession + `NWPathMonitor` |
| **Secure Auth Store** | React Native Keychain | Android Keystore + `EncryptedSharedPreferences` | Apple Keychain Services API |
| **Unit Testing** | Jest + React Test Renderer | JUnit 5 + MockK + Turbine (Flow testing) | XCTest + Swift Testing |

---

## Project Structure

```
Learning-Dashboard/
├── __tests__/                      # Comprehensive Unit Tests
│   ├── progressUtils.test.js       # Progress % and rounding business logic tests
│   ├── validators.test.js          # Email, password & form validation tests
│   ├── courseSlice.test.js         # Redux reducer and lesson toggle state tests
│   └── App.test.tsx                # App root smoke test
├── src/
│   ├── assets/                     # Typography & fonts
│   │   ├── fontFamily.js           # Poppins font definitions
│   │   └── index.js
│   ├── components/                 # Reusable UI Design System
│   │   ├── courseCard/             # Course overview card with progress bar
│   │   ├── customButton/           # Accessible button with loading/disabled states
│   │   ├── customInput/            # Form input with validation error states
│   │   ├── lessonItem/             # Interactive lesson row with completion toggle
│   │   ├── offlineBanner/          # Persistent offline notice banner
│   │   ├── progressBar/            # Configurable rounded progress indicator
│   │   ├── stateViews/             # Loading, Empty, and Error state views
│   │   └── index.js
│   ├── helper/                     # Data Architecture & Repository
│   │   ├── apiService.js           # Mock API service with network latency simulation
│   │   ├── courseRepository.js     # Repository coordinating Remote API + Local Storage
│   │   ├── mockData.js             # Initial courses & lesson syllabus dataset
│   │   ├── networkUtils.js         # Connectivity detection and change listeners
│   │   └── storageService.js       # AsyncStorage persistence engine
│   ├── hooks/                      # Custom React Hooks
│   │   ├── internetHook.js         # Reactive network status hook
│   │   └── index.js
│   ├── navigation/                 # Navigation Stack
│   │   ├── mainStack.js            # Native stack navigator (Login -> Dashboard -> Details)
│   │   ├── navigationServices.js   # Imperative navigation helpers
│   │   ├── routeConstants.js       # Route name constants
│   │   ├── routes.js               # NavigationContainer setup
│   │   └── index.js
│   ├── redux/                      # Global State Management
│   │   ├── slices/
│   │   │   ├── authSlice.js        # Auth state (login, logout, session restoration)
│   │   │   └── courseSlice.js      # Courses state (fetching, offline sync, lesson toggle)
│   │   └── store/
│   │       └── store.js            # Redux Toolkit configured store
│   ├── screens/                    # Application Screens
│   │   ├── login/                  # Screen 1: Login with validation & loading states
│   │   ├── dashboard/              # Screen 2: Course Dashboard with offline support
│   │   ├── courseDetails/          # Screen 3: Course Details with dynamic lesson toggling
│   │   └── index.js
│   └── utils/                      # Design Tokens & Pure Utilities
│       ├── colors.js               # Centralized theme color palette
│       ├── commonText.js           # Centralized string constants
│       ├── progressUtils.js        # Pure progress calculation engine
│       ├── responsive.ts           # Screen scaling and dimension helpers
│       └── validators.js           # Form validation functions
├── App.js                          # Application Root with Redux & Network Initialization
├── jest.config.js                  # Jest testing configuration
├── jest.setup.js                   # Mock definitions for native modules
└── package.json
```

---

## How to Run & Verify

### 1. Install Dependencies
```sh
npm install --legacy-peer-deps
```

### 2. Run Unit Tests
```sh
npm test
```
*Executes all 23 unit tests across 4 test suites testing business logic, form validation, Redux reducers, and app rendering.*

### 3. Start the Application
```sh
# Start Metro bundler
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator / Device
npm run android
```

### 4. Demo Credentials
- **Email:** `test@example.com`
- **Password:** `password123`
*(Any valid email format and 6+ character password will also authenticate successfully)*
