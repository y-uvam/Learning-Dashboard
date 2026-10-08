# Learning Dashboard

A React Native mobile application demonstrating clean mobile architecture, offline-first data caching, reactive state management, and unit testing.

---

## 1. Architecture
**Clean Architecture / MVVM with Repository Pattern**
```
UI (Screens & Reusable Components)
  ↓
Presentation Layer (Redux Toolkit Slices & Thunks)
  ↓
Repository Layer (CourseRepository)
  ↓
Data Sources (Remote Mock API + AsyncStorage + NetInfo)
```
* **Separation of Concerns:** UI is purely declarative; all fetching, caching, and business logic are isolated in repository and pure utility functions.
* **Single Source of Truth:** `CourseRepository` mediates between network and local cache. Components consume normalized state from Redux.
* **Testability:** State transitions, validation rules, and progress calculations are pure functions covered by unit tests.

---

## 2. Offline Support
* **Storage Engine:** `@react-native-async-storage/async-storage` persists course data (`@learning_dashboard_courses_v1`) and user session (`@learning_dashboard_auth_session_v1`).
* **Cache-Fallback Strategy:** On launch, the app checks connectivity via `@react-native-community/netinfo`. If online, it fetches fresh data, merges it with local lesson completion states, and updates cache. If offline or network fails, cached courses are immediately served.
* **Write-Through Mutation:** Toggling a lesson recalculates progress (`(completed / total) * 100`), writes immediately to `AsyncStorage`, and updates Redux state.
* **User Feedback:** An `OfflineBanner` displays when viewing cached data offline.

---

## 3. Security
In a production application, sensitive authentication tokens (JWT access & refresh tokens) should **never** be stored in plaintext `AsyncStorage`:
* **iOS / macOS:** Stored in the **iOS Keychain** with `kSecAccessControl` constraints (via `react-native-keychain` or Apple's `Security.framework`).
* **Android:** Stored in **Android Keystore-backed EncryptedSharedPreferences** (Android Jetpack Security library) with AES-256 GCM encryption.
* **Transport:** Enforce HTTPS with **SSL/TLS Certificate Pinning** and automatic token refresh via HTTP response interceptors.

---

## 4. Scale (1 Million Users + Hundreds of Courses)
1. **Relational Database (WatermelonDB / SQLite):** Replace key-value storage with an indexed SQLite/WatermelonDB engine to query and lazy-load courses instead of parsing full JSON arrays in memory.
2. **Windowed Virtualization & Pagination:** Use cursor-based pagination (`pageSize=20`) with `FlashList` for 60 FPS scrolling and low memory consumption.
3. **Delta Sync & Background Sync:** Implement timestamp-based delta sync (`lastModifiedTimestamp`) so only modified lesson states are synced, processed via background workers (`WorkManager` / `BGAppRefresh`).
4. **CDN & Image Caching:** Offload media assets to a global CDN with progressive disk caching (`react-native-fast-image`).
5. **Observability:** Integrate Sentry and Firebase Performance for real-time crash reporting and API latency tracing.

---

## 5. Second Platform Implementation

| Layer | React Native (Current) | Android (Kotlin / Jetpack Compose) | iOS / macOS (Swift / SwiftUI) |
| :--- | :--- | :--- | :--- |
| **UI** | JSX Components | Jetpack Compose (`LazyColumn`, `LinearProgressIndicator`) | SwiftUI (`List`, `ProgressView`, `NavigationStack`) |
| **State** | Redux Toolkit | `ViewModel` + Kotlin `StateFlow` | `ObservableObject` / `@Observable` + `@Published` |
| **Concurrency** | Async / Await | Kotlin Coroutines (`viewModelScope`, `Flow`) | Swift Concurrency (`async/await`, `Task`) |
| **Local Storage** | AsyncStorage | Room Database (SQLite) + DataStore | SwiftData / Core Data / GRDB |
| **Networking** | Fetch + NetInfo | Retrofit + `ConnectivityManager.NetworkCallback` | URLSession + `NWPathMonitor` |
| **Secure Token** | RN Keychain | Android Keystore + `EncryptedSharedPreferences` | Apple Keychain Services API |
| **Testing** | Jest | JUnit 5 + MockK + Turbine | XCTest + Swift Testing |

---

## Run & Test

```sh
# Run Unit Tests (23 tests)
npm test

# Run iOS
npm run ios

# Run Android
npm run android
```

**Demo Credentials:** `test@example.com` / `password123` (or tap the "Quick Demo" button on the login screen).
