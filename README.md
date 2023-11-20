# 21 Days 2.0 - Habit Tracking Application

## Overview

'21 Days' is a full-stack habit tracking application designed to help users build or quit and maintain habits by tracking their progress for 21 days.

It is said that it takes 21 (straight) days to create a habit so our App is the perfect way to put it to the test!

- Is simple to use.
- Only 21 days.
- Has intuitive Check-in systems to check your daily habits.
- Has a progress tracking on the main screen so you can follow your journey.
- Proposes a selection of habits if you need any or more ideas to improve yourself.
- Has a Habit page so you can follow your progress and check-in past days habits if you happen to forget.

The remember that the small changes amount to great things and that the turtle won the race so no hurry.

## Features

- Track habits for 21 days, a scientifically proven duration for habit formation.
- Set daily checkpoints and monitor progress for each habit.
- Add new habits and bookmark existing ones.
- Choose from a list of suggested habits for quick setup.
- Responsive design for seamless usage on various devices.
- Libraries used: Dayjs, Emoji-Picker-React, React-Toastify, Lodash.

## Technologies Used

- **Frontend:** React.js, Axios
- **Backend:** Express.js(Node.js)
- **Database:** MongoDB Atlas, Moongoose
- **Authentication:** JSON Web Token (JWT)

## Project Structure

Pages and Descriptions:

### Main Page

The main page displays a list of your habits, indicating which ones can be completed today. Each habit is represented by colorful rows, allowing users to estimate progress. On the 21st day, the app suggests starting a new 21-day cycle for the habit or deleting it.
![Main](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Main%20page.png)

### Habit Page

The habit page features 21 checkboxes for each day of the habit. Users can check off missed days later and view statistics, including misses and consecutive days.
![Habit Page](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Habit%20page.png)
![Habit Page 2](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Habit%20page%202.png)

### Explore Page

The explore page presents a list of different habits available for users to add. Users can save habits for later, bookmark them, and apply filters by category. (Future feature: filtering by type - quit or build.)
![Explore Page](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Explore%20page.png)

### Profile Page

The profile page showcases user statistics and bookmarks, including the ability to add or delete habits. It also features a form for creating custom habits.
![Profile Page](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Profile%20page.png)
![Form Page](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Add%20new%20habit%20page.png)

### Landing, Login, and Sign Up Pages

The landing page provides an introduction to the app. Users can log in or sign up to access personalized features. Error handling and verification ensure a secure user experience.
![Landing Page](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Landing.png)
![LoginPage](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/Log%20in.png)

## Mobile Responsive Screenshots:

Include links to your mobile screenshots here.

Screenshot 1: Mobile Version - Main Page
![Main](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/mobile-1.jpg)

Screenshot 2: Mobile Version - Explore Page
![Explore](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/mobile-2.jpg)

Screenshot 3: Mobile Version - Profile Page
![Profile](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/mobile-4.jpg)

Screenshot 4: Mobile Version - Habit Page
![Habit](https://github.com/LenaKorsakov/21days_project/blob/main/screenshots/mobile-5.jpg)

## Demo

<a href='https://21days-project-pi.vercel.app/'> GO TO SITE ---> </a>

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account for database access.
- React Developer Tools extension for an enhanced development experience (optional but recommended).

### Installation

1. **Clone the repository.**
   ```bash
   git clone git@github.com:LenaKorsakov/21days_project.git
   git clone git@github.com:LenaKorsakov/21days_project.git
   ```
2. **Navigate to the project directory.**

```
  cd 21days_project
```

3. **Install dependencies for the frontend and backend..**

```
  cd client
npm install

cd ../server
npm install
```

4. **Set up environment variables.**
   Create a .env file in the server directory.
   Add the following variables:

```
PORT=3000
ORIGIN="http://localhost:3000"
TOKEN_SECRET=TOKEN_SECRET
MONGODB_URL='mongodb://127.0.0.1:27017/21-days-backend'
```

5. **Run the development servers.**

```
 cd client
npm run dev

cd ../server
npm run dev
```

6. **Access the application in your browser at http://localhost:3000.**

## Contributing

We welcome contributions and ideas! Feel free to submit issues, feature requests, or even pull requests. For major changes, please open an issue first to discuss potential improvements.

## Future Development

Implement new filtering by type (quit or build).
Allow setting filters in the URL as a query string.
Implement a refresh token mechanism for enhanced security.

## Acknowledgements

Elena Korsakova - developer,
<a href='https://github.com/rrlaforest1'> Rony Laforest</a> - Co-developer
