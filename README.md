# Code Nation Trivia Database Manager

Allows users to add new multiple choice questions to the database used by all
students in their trivia applications. Requires users to log in via Google so
question creators get the credit they deserve! Also allows users to view and
edit their existing trivia questions.

## Data model

The shared database has the following top-level paths:

  - `users`<br>
    Object containing basic info about all authenticated users

    - `<user-id>`<br>
      Object containing basic info about a single user

      - `name`<br>
      String display name, e.g. "Joe Tessler"

      - `avatar_url`<br>
        String URL to a profile picture a.k.a. avatar

    - `...`<br>
      Repeating `<user-id>` objects for each authenticated user

  - `questions`<br>
    Object containing all user-submitted trivia questions and answers

    - `<question-id>`<br>
      Object containing data for a single trivia question and answer

      - `question_text`<br>
        String question text, e.g. "How many states are in the USA?"

      - `choices`<br>
        Array of strings representing multiple choice answers

      - `correct_choice_index`<br>
        Index of the correct answer in the `choices` array

      - `user_id`
        String ID of the user who created the question of the form `<user-id>`

    - `...`<br>
      Repeating `<question-id>` objects for each trivia question and answer

Note, `<user-id>` and `<question-id>` are randomly generated string IDs and
guaranteed unique.

# Create React App

This project was bootstrapped with [Create React App].

[Create React App](https://github.com/facebook/create-react-app)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests] for more information.

[running tests](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the
best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment] for more information.

[deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (Webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you
couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation].

To learn React, check out the [React documentation](https://reactjs.org/).

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
