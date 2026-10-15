# Implementation Plan: Number Guessing Mini Game (React Native + Expo)

## 1. Project Overview

Build a small number-guessing mini-game using React Native and Expo.

The game consists of exactly three screens:
1. `StartGameScreen`
2. `GameScreen`
3. `GameOverScreen`

The user selects a secret number between 1 and 69, and the mobile app tries to guess it. The user provides feedback through Higher and Lower buttons until the app guesses the correct number.

**Important:** Keep the implementation simple, readable, and appropriate for a small learning project. Do not introduce unnecessary architecture, libraries, or abstractions.

## 2. Before Implementation

- Inspect the existing project structure and installed dependencies before modifying anything.
- Inspect the available UI screenshots and use them as the source of truth for the screen layouts, spacing, typography, colors, and component appearance.
- Reuse the existing assets:
  - `background`: background image for the start screen, following the provided UI reference.
  - `success`: success image for the game-over screen, following the provided UI reference.
- Locate and reuse the existing `utils/colors.js` file for colors. Do not create a duplicate colors file or hardcode colors throughout the UI.
- Locate and reuse the existing fonts and other relevant assets if they are already configured in the project.
- Do not replace existing project configuration or install additional dependencies unless genuinely necessary.

## 3. Navigation and State Management

Do not use Expo Router or React Navigation for this mini-game.

Manage the current screen using React's `useState` in the root component.

Use clear screen identifiers, such as:
- `start`
- `game`
- `gameOver`

Render the corresponding screen based on the current screen state.

Keep shared game state in the root component or in a small, clearly defined game-state structure. Pass the required values and callbacks to each screen through props.

When starting a new game, reset the secret number, current guess, guess history, attempt count, and validation messages before returning to the start screen.

## 4. Screen Specifications

### A. StartGameScreen

Purpose: Let the user enter the secret number that the app will guess.

Requirements:
- Display a numeric input for the secret number.
- Accept only integer values between 1 and 69, inclusive.
- Reject empty input, zero, negative numbers, decimal values, non-numeric values, and values greater than 69.
- Display a clear validation message when the user presses the start button with an invalid value. The message should explain that the number must be between 1 and 69.
- Provide a reset button to clear the input and validation message.
- Provide a start button to validate the input and begin the game.
- When the input is valid, initialize the game state and navigate to `GameScreen`.
- Follow the supplied UI screenshots and use the existing `background` asset and `utils/colors.js` wherever appropriate.

### B. GameScreen

Purpose: Let the mobile app guess the user's secret number.

#### Initial Guess

- Start with a valid random guess between 1 and 69.
- Use the provided `generateRandomBetween(min, max, exclude)` function as the basis for generating guesses.
- Correct the random range calculation if needed so both endpoints are inclusive.
- Track the current minimum and maximum possible values.
- Exclude the previous guess when generating a new guess.

Use this implementation as the starting point:

```javascript
function generateRandomBetween(min, max, exclude) {
  if (min > max) {
    throw new Error("Invalid guessing range");
  }

  if (min === max) {
    if (min === exclude) {
      throw new Error("No valid guess available");
    }
    return min;
  }

  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === exclude);

  return randomNumber;
}
```

Keep this helper in a separate utility file if that fits the existing project structure.

#### Higher and Lower Logic

Display the current guess prominently, with two buttons:
- `Higher`: The secret number is greater than the current guess.
- `Lower`: The secret number is less than the current guess.

When the user presses `Higher`:
- Update the minimum possible number to `currentGuess + 1`.
- Generate the next guess inside the updated range.

When the user presses `Lower`:
- Update the maximum possible number to `currentGuess - 1`.
- Generate the next guess inside the updated range.

Always exclude the current guess from the next random selection.

#### Prevent Contradictory Answers

The app must prevent users from giving contradictory feedback.

For example:
- If the user previously selected Higher after a guess of 33, the secret number must remain greater than 33.
- If the app later guesses 40, selecting Lower is valid.
- If the app later guesses 30, selecting Higher is invalid because the previous feedback already established that the secret number is greater than 33.

Maintain the valid lower and upper bounds based on all previous answers.

If the user's selected answer would create an impossible range, display a native React Native `Alert` with a short, friendly message explaining that the answer contradicts previous answers and asking the user to choose honestly.

Do not update the game state or guess history when an answer is rejected.

#### Guess Logs

Display a guess history list using React Native's `FlatList`.

Each entry should contain:
- The attempt number.
- The guess itself.

Show the newest guesses first if that matches the reference screenshots.

Use stable keys and avoid unnecessary list rendering work.

#### Correct Guess

When the current guess matches the secret number, provide a clear confirmation action, such as a `Correct` button.

When the user confirms that the guess is correct:
- Count the successful guess as an attempt.
- Preserve the final guess history and total attempt count.
- Navigate to `GameOverScreen`.

Do not count invalid feedback or rejected contradictory answers as attempts.

### C. GameOverScreen

Purpose: Celebrate the successful guess and summarize the game.

Requirements:
- Display the existing `success` image.
- Show a success message.
- Display the secret number that was guessed.
- Display the total number of guesses needed to find the correct number.
- Provide a `Start a New Game` button.
- When pressed, reset all game-related state and return to `StartGameScreen`.
- Match the provided UI screenshots and use colors from `utils/colors.js`.

## 5. Suggested Project Structure

Adapt this structure to the existing project instead of reorganizing unrelated files.

```text
project/
├── App.js
├── screens/
│   ├── StartGameScreen.js
│   ├── GameScreen.js
│   └── GameOverScreen.js
├── components/
│   ├── PrimaryButton.js
│   ├── NumberInput.js
│   └── GuessLogItem.js
├── utils/
│   ├── colors.js
│   └── game.js
└── assets/
    ├── background
    ├── success
    └── fonts/
```

The asset filenames above are descriptive placeholders. Locate the actual existing files and preserve their extensions and paths.

Keep screen-specific UI inside its screen file. Move only genuinely reusable UI into the `components` folder.

Keep random-number generation and other reusable game helpers in `utils/game.js` if appropriate.

Do not create extra folders or files without a clear reason.

## 6. Reusable Components

Create small reusable components only where they improve clarity or eliminate repeated UI.

- `PrimaryButton`: A configurable button with a label, callback, and optional disabled state.
- `NumberInput`: A controlled numeric input with clear value and change-handling props.
- `GuessLogItem`: Displays one guess-history entry.

If the project already has suitable components, reuse them instead of creating duplicates.

Keep components focused and avoid excessive prop complexity.

## 7. UI and Styling Requirements

- Treat the supplied screenshots as the UI source of truth.
- Match the reference layout as closely as possible.
- Reuse `background` and `success` assets from the existing assets directory.
- Reuse colors from `utils/colors.js`.
- Reuse configured fonts and existing shared styles.
- Avoid hardcoded colors and repeated style values.
- Use `StyleSheet.create` and clear style names.
- Use `SafeAreaView` from `react-native-safe-area-context` if it is already installed; otherwise use the appropriate supported safe-area approach for the current Expo project.
- Keep the UI responsive across common mobile screen sizes.
- Do not invent a substantially different design when a reference screenshot is available.

## 8. Code Quality Requirements

- Use functional components and React hooks.
- Use clear, descriptive names for variables, functions, props, and callbacks.
- Keep screen components separate from reusable components.
- Keep game logic out of presentation components wherever reasonably possible.
- Avoid duplicated validation and guessing logic.
- Use immutable state updates.
- Avoid unnecessary dependencies and unnecessary abstractions.
- Follow the project's existing JavaScript or TypeScript conventions.
- Do not migrate the project between JavaScript and TypeScript.
- Do not add global state management libraries for this small game.
- Do not modify unrelated files.

## 9. Implementation Order

Implement in small, verifiable steps:

1. Inspect the project, screenshots, assets, colors file, and dependencies.
2. Implement and verify the random-number helper and range validation.
3. Implement the root screen-state handling and game initialization.
4. Build `StartGameScreen` and validate all input edge cases.
5. Build `GameScreen`, including Higher/Lower handling, contradictory-answer alerts, and the `FlatList` guess history.
6. Build `GameOverScreen` and the new-game reset flow.
7. Create or reuse shared components as needed.
8. Apply the reference UI, existing images, fonts, and colors.
9. Run the available linting or checks and test the game manually.

## 10. Acceptance Criteria

The implementation is complete when:

- The app has exactly three game screens.
- No navigation library is used for switching between these screens.
- Only integers from 1 to 69 are accepted as secret numbers.
- Invalid input displays a useful validation message.
- Reset clears the input and validation state.
- The app generates valid guesses without repeating the immediately previous guess.
- Higher and Lower correctly update the possible number range.
- Contradictory answers display an alert and do not corrupt the game state.
- The guess history displays attempt numbers and guesses.
- The correct guess leads to the game-over screen with the correct attempt count.
- Starting a new game resets all game-related state.
- Existing assets, fonts, screenshots, and `utils/colors.js` are reused.
- The code is readable, maintainable, and appropriately simple for a mini-game.

Implement the game end to end. Make reasonable decisions for minor unspecified details, following the reference UI and existing project conventions. Do not stop after producing a plan or ask for approval between implementation steps.