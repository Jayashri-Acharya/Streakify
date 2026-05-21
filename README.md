# Streakifyy

Streakifyy is a simple habit and routine tracking web app built using HTML, CSS, and JavaScript. It helps users build consistency by organizing daily goals, tracking completed tasks, maintaining streaks, and viewing progress over time.

## Features

- Track daily habits and routines
- Separate categories for eating healthy, fitness, study, projects, self-care, and daily habits
- Add, edit, delete, and rename tasks or categories
- Mark tasks as completed using checkboxes
- View today's progress percentage
- Track total tasks, completed tasks, and remaining tasks
- Maintain daily streaks
- View weekly progress report
- Display a 7-day progress chart
- Unlock badges for consistency milestones
- Toast notifications for user actions
- Responsive design for desktop and mobile screens

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser LocalStorage

## Data Storage

This project does not use an external database. It stores data locally in the browser using `localStorage`. The habit and progress data is saved in JSON format, so the data remains available in the same browser even after refreshing or closing the page.

## Project Structure

```text
Streakiify_Project/
├── index.html
├── eat_healthy.html
├── fitness.html
├── study.html
├── projects.html
├── self_care.html
├── daily_habits.html
├── progress.html
├── data.js
├── storage.js
├── tracker.js
├── ui.js
├── curd.js
├── toast.js
├── main.js
├── theme.css
├── layout.css
├── components.css
└── style.css
```

## How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in any modern web browser.
4. Start adding and tracking your habits.

## Main Pages

- `index.html` - Home dashboard
- `eat_healthy.html` - Healthy eating routines
- `fitness.html` - Fitness and yoga routines
- `study.html` - Study and career routines
- `projects.html` - Project-related tasks
- `self_care.html` - Self-care routines
- `daily_habits.html` - Daily habit tracker
- `progress.html` - Weekly progress, chart, and badges

## Purpose

The main goal of Streakifyy is to help users stay consistent with their daily routines. It gives a simple dashboard, progress tracking, and streak rewards to motivate users to complete their tasks every day.

## Future Improvements

- Add user login
- Add cloud database support
- Add dark mode
- Add monthly progress charts
- Add task reminders
- Export progress reports

## Author

Created by Sinchana.
