Friendsgiving Menu Planner

Overview

    The Friendsgiving Menu Planner is a web application designed to help users organize and manage their Thanksgiving dinner by allowing them to create and manage a menu, track food contributions, and RSVP to the event. The application features a dynamic UI with interactive elements, including a countdown to Thanksgiving, a dish management system, and an RSVP functionality.

Links

Backend API: https://github.com/gillty1995/Friendsgiving-Menu-Planner-Backend

Deployed Website: https://friendsgiving-menu.fr.to

Features

    •	Interactive Menu Management: Users can view and add dishes to the dinner menu, categorized by starters, side dishes, main courses, and desserts.
    •	Dish Contributions: Users can contribute dishes to the event, view ingredients, and delete contributions.
    •	RSVP Functionality: Users can RSVP to the event, and their names are displayed in the RSVP list.
    •	Countdown Timer: A real-time countdown showing the time remaining until Thanksgiving.

Key Technologies & Skills

    •	HTML5: Structured the layout and content of the web application, including navigation, modals, and sections for contributions, dinner menu, and RSVP list.
    •	CSS3: Styled the application using custom styles, ensuring a user-friendly and visually appealing design.
    •	Flexbox: Used for flexible and responsive layout management.
    •	CSS Grid: Utilized for organizing the dinner menu categories and contributions in a structured way.

JavaScript:

    • DOM Manipulation: Interacted with the DOM to add interactivity, such as opening and closing modals, rendering dynamic lists, and handling form submissions.
    • Event Handling: Managed user interactions, including form submissions, button clicks, and modal actions.
    • Countdown Timer: Implemented a countdown function to display the remaining time until Thanksgiving, updating every second.
    • Fetch API: Used to fetch RSVP data and post user submissions to the backend API.

API Integration:

    • Backend API: Integrated with a backend API for handling RSVP data. The API allows the front end to fetch the RSVP list and submit new RSVPs.
    • Modal Interaction: Users can add new dishes to the menu via a modal form, which communicates with the backend to store dish information.

Features in Detail

1. RSVP Functionality

       • Users can submit their name to RSVP for the event.
       • RSVPs are displayed in a list on the page.
       • The RSVP form is accessed through the “RSVP” button in the header.
       • The form features client-side validation and handles errors gracefully.

2. Dish Contributions

       • Users can contribute dishes to the Thanksgiving dinner by providing details such as the dish name, category (starter, main course, side dish, or dessert), ingredients, and an image URL.
       • Each dish is displayed on the main page as a card with a flip functionality, allowing users to view the ingredients on the back of the card.
       • Contributions can be deleted, removing the dish from the display.

3. Countdown to Thanksgiving

       • The countdown is displayed in the header, showing the time remaining until Thanksgiving.
       • The countdown updates every second using JavaScript’s setInterval method.

Technologies Used

Frontend:

    • HTML5, CSS3, JavaScript
    • DOM Manipulation
    • Fetch API
    • Event Listeners
    • Responsive Design (CSS Flexbox, CSS Grid)

Backend:

    • Node.js (for API server)
    • Express.js (for handling routes and API endpoints)
    • MongoDB (for storing RSVP and dish data)
    • Deployment:
    • Hosted on Friendsgiving Menu API

Future Improvements

    •	User Authentication: Implement user authentication to allow individual users to manage their contributions and RSVPs.
    •	Database Integration: Use a database to store dishes and RSVPs persistently.
    •	Enhanced Styling: Improve the design with animations and transitions for a more polished user experience.
    •	Responsive design: Improve responsive design implmentation.

Authors

    •	Sebastian Sanchez
    •	Gill Hermelin
    •	Sri Duvvuri
