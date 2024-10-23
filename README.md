# Activity and Diet Tracker App

This is a React Native application for tracking activities and diet entries. Before starting the project, please configure your own Firestore and create two collections: `activities` and `diet`.

## Getting Started

### Prerequisites

- Node.js
- npm 
- Firebase account

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```sh
    npm install
    

3. Configure Firebase:
    - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Firestore in your Firebase project.
    - Create two collections: `activities` and `diet`.
    - Copy your Firebase configuration and replace the values in the `.env` file:
        ```properties
        EXPO_PUBLIC_apiKey = "YOUR_API_KEY"
        EXPO_PUBLIC_authDomain = "YOUR_AUTH_DOMAIN"
        EXPO_PUBLIC_projectId = "YOUR_PROJECT_ID"
        EXPO_PUBLIC_storageBucket = "YOUR_STORAGE_BUCKET"
        EXPO_PUBLIC_messagingSenderId = "YOUR_MESSAGING_SENDER_ID"
        EXPO_PUBLIC_appId = "YOUR_APP_ID"
        EXPO_PUBLIC_measurementId = "YOUR_MEASUREMENT_ID"
        ```

### Running the App

1. Start the development server:
    ```sh
    npm start

2. Follow the instructions in the terminal to run the app on an emulator or a physical device.

## Project Structure

- `.env`: Environment variables for Firebase configuration.
- `src/components/`: Reusable UI components.
    - [`ItemsList.js`](src/components/ItemsList.js): Component for displaying a list of items.
    - [`PressableButton.js`](src/components/PressableButton.js): Component for a pressable button.
- `src/context/`: Context providers for managing global state.
    - [`DataHelper.js`](src/context/DataHelper.js): Helper functions for data management.
    - [`ThemeContext.js`](src/context/ThemeContext.js): Context for theme management.
- `src/Firebase/`: Firebase setup and configuration.
    - [`FirebaseSetup.js`](src/Firebase/FirebaseSetup.js): Firebase initialization.
- `src/navigation/`: Navigation setup for the app.
    - [`AppNavigator.js`](src/navigation/AppNavigator.js): Main navigator for the app.
- `src/screens/`: Screens for different parts of the app.
    - [`ActivitiesScreen.js`](src/screens/ActivitiesScreen.js): Screen for displaying activities.
    - [`AddActivityScreen.js`](src/screens/AddActivityScreen.js): Screen for adding a new activity.
    - [`AddDietEntryScreen.js`](src/screens/AddDietEntryScreen.js): Screen for adding a new diet entry.
    - [`DietScreen.js`](src/screens/DietScreen.js): Screen for displaying diet entries.
    - [`EditActivityScreen.js`](src/screens/EditActivityScreen.js): Screen for editing an activity.
    - [`EditDietEntryScreen.js`](src/screens/EditDietEntryScreen.js): Screen for editing a diet entry.
    - [`SettingsScreen.js`](src/screens/SettingsScreen.js): Screen for app settings.
- `styles.js`: Common styles for the app.

## License

This project is licensed under the MIT License.
