# AI Chatterbox - Software Project (SA RedBack)

Welcome to the SA RedBack project! The AI Chatterbox is a web-based AI chatbot designed to stimulate creativity and critical thinking by generating speculative "What If" questions based on user input. This project aims to promote interdisciplinary dialogue through engaging and thought-provoking questions.

## Table of Contents

- [AI Chatterbox - Software Project (SA RedBack)](#ai-chatterbox---software-project-sa-redback)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
  - [Project Links](#project-links)
  - [Usage](#usage)
  - [Dependencies](#dependencies)
  - [API Endpoints](#api-endpoints)
  - [API Usage](#api-usage)
    - [Node Framework](#node-framework)
    - [OpenAI API (ChatGPT)](#openai-api-chatgpt)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)
  - [Changelog](#changelog)
    - [Sprint 1 - 18 August 2024](#sprint-1---18-august-2024)
      - [Added](#added)
      - [Changed](#changed)
      - [Fixed](#fixed)
    - [Sprint 2 - 20 September 2024](#sprint-2---20-september-2024)
      - [Added](#added-1)
      - [Changed](#changed-1)
      - [Fixed](#fixed-1)
      - [Removed](#removed)
      - [Notes](#notes)
    - [Sprint 3 - 18 October 2024](#sprint-3---18-october-2024)
      - [Added](#added-2)
      - [Changed](#changed-2)
      - [Fixed](#fixed-2)
    - [Sprint 4 - 1 November 2024](#sprint-4---1-november-2024)
      - [Added](#added-3)
      - [Changed](#changed-3)
      - [Fixed](#fixed-3)
      - [Notes](#notes-1)

## Project Overview

The AI Chatterbox reimagines the traditional paper-based chatterbox into a digital platform. It generates eight unique "What If" questions based on user input to foster creativity and critical thinking. The chatbot is designed to engage users in various settings, such as art galleries and educational environments, promoting in-depth exploration of complex topics.

## Features

- **Web-Based Platform**: Accessible from any device with internet access, requiring no app downloads.
- **AI-Generated Questions**: Generates eight unique "What If" questions to stimulate creativity and critical thinking.
- **Multilingual Support**: Supports multiple languages, making the platform accessible to a global audience.
- **No Login Required**: Allows immediate interaction without the need for account creation or login.
- **Adaptive Question Generation**: Tailors questions based on user input, offering a diverse range of speculative scenarios.
- **Data Collection and Analysis**: Collects and securely stores user interactions for research and system improvement.
- **QR Code Access**: Facilitates easy access, especially in public settings, through QR codes.
- **Output Filtering**: Ensures generated questions adhere to safety and appropriateness standards.
- **User Feedback Mechanism**: Allows users to provide feedback to help refine and improve the chatbot's performance.

## Prerequisites

Ensure you have the following tools installed before setting up the project:

- **Node.js**: Essential for running both frontend and backend servers.
- **npm (Node Package Manager)**: Comes with Node.js and is used to manage project dependencies.
- **MongoDB**: A NoSQL database for data storage.
- **Git**: For version control and managing the codebase.

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the project repository:**

   ```bash
   git clone https://github.com/feit-comp90082/SA-RedBack.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd SA-RedBack
   ```

3. **Install dependencies using npm:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in both the backend and frontend directories, and configure the necessary environment variables such as MongoDB connection string and API keys.

   Example `.env` for the backend:

   ```bash
   MONGO_URI=your-mongo-connection-string
   OPENAI_API_KEY=your-openai-api-key
   ```

5. **Start MongoDB locally or connect to MongoDB Atlas:**

   - If running MongoDB locally:

     ```bash
     mongod
     ```

   - Alternatively, connect to MongoDB Atlas using the appropriate connection string in the `.env` file.

6. **Start the servers:**

   ```bash
   npm run start
   ```

   - This will launch the React frontend on port `5173` and the backend on port `3001`.

7. **Access the application:**

   - Navigate to [http://localhost:5173](http://localhost:5173) in your web browser.

8. **Testing:**

   Set up the testing environment:

   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-jest
   ```

   - To run tests, navigate to the `backend` directory and execute:

   ```bash
   npm test
   ```

## Project Links

- **Live Website (AWS Deployment)**: [SA Redback - Live Application](https://sa-redback.mb6.top/)
- **Trello Board**: [COMP90082 2024 SM2 SA Redback Trello Board](https://trello.com/b/jHGbpSQC/comp90082-2024-sm2-sa-redback)
- **Confluence Wiki**: [COMP90082 2024 S2 Confluence Wiki](https://comp90082-2024-s2-sa-redback.atlassian.net/wiki/spaces/comp9008223/overview)
- **Figma Design**: [Project Design on Figma](https://www.figma.com/proto/ik7MYv4wULWS3Dhnu8QjKG/SA-Redback?page-id=0%3A1&node-id=21-212&viewport=583%2C1320%2C0.37&t=gGjkFiaqu2qhT8tz-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=21%3A212&share=1)

## Usage

To interact with the AI Chatterbox:

1. **Access the Application**: Open the deployed application via [SA Redback - Live Application](https://sa-redback.mb6.top/).

2. **Enter Input**: Submit your topics or questions into the input field. The chatbot will generate a set of creative "What If" questions based on your input.

3. **Explore Questions**: Review the generated questions displayed on the screen.

4. **Provide Feedback**: Offer feedback on the generated questions to help improve the system.

For local development, ensure your server is running by following the setup instructions in the **Installation and Setup** section. Access the application at [http://localhost:5173](http://localhost:5173).

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime for backend development.
- **MongoDB**: A NoSQL database for managing and storing data.
- **AWS**: Hosting platform for deploying both frontend and backend.
- **Express**: A Node.js web application framework for creating APIs and managing backend routing.

## API Endpoints

| API                      | Type               | Features                                            | Role in Project                                              |
| ------------------------ | ------------------ | --------------------------------------------------- | ------------------------------------------------------------ |
| **OpenAI API (ChatGPT)** | Language Model API | Generates human-like text based on prompts          | Provides creative "What If" questions to engage users and stimulate thinking |
| **React Library**        | Frontend Library   | Component-based architecture, state management      | Fetches and displays data from APIs, and manages dynamic content. |
| **MongoDB Atlas API**    | NoSQL Database API | Flexible document model, high performance, scalable | Manages and stores user data such as sessions and feedback efficiently. |

## API Usage

We follow RESTful API design principles to provide a consistent and intuitive interface.

### **Node Framework**

**Request:**

- **Method:** `POST`
- **URL:** `/api/conversations/`
- **Description:** Creates a new chat record and retrieves the corresponding reply.

### **OpenAI API (ChatGPT)**

**Request:**

- **Method:** `POST`

- **URL:** `https://api.openai.com/v1/chat/completions`

- **Description:** Sends a message to the OpenAI GPT model and receives a generated reply.

- **Headers:**

  - `Authorization: Bearer YOUR_API_KEY`
  - `Content-Type: application/json`

- **Request Body:**

  ```json
  {
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": "What if we could travel through time?"
      }
    ]
  }
  ```

## Testing

Testing ensures the reliability and functionality of the AI Chatterbox. We employ the following strategies:

1. **Unit Testing**: Tests individual components and functions in isolation.
2. **Integration Testing**: Verifies that different system parts work together correctly.
3. **End-to-End Testing**: Simulates user interactions to ensure the entire system functions as intended.
4. **Performance Testing**: Assesses the application’s performance under various conditions.

## Contributing

We welcome contributions from the community! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details on how to contribute.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Contact

For inquiries or feedback, please contact the project team:

- **Yujun Yan (Mentor)**: yujun.yan.1@unimelb.edu.au
- **YiYao Li Shaelyn (Product Owner)**: yiyao3@student.unimelb.edu.au

- **Yiqun Liu Elva (Scrum Master)**: yiqun2@student.unimelb.edu.au
- **Yingying Guo Vicky (Quality Assurance Leader)**: yinguo3@student.unimelb.edu.au
- **Leyao Lyu Lydia (Developer)**: lyull@student.unimelb.edu.au
- **Jionghao Song Harry (Developer)**: jionghaos@student.unimelb.edu.au

## Changelog

All notable changes to this project will be documented in this section.

### [Sprint 1] - 18 August 2024

#### Added

- **GitHub Repository**: Created the initial GitHub repository.
- **Initial Project Structure**: Set up the project with `docs` and `src` directories.
- **Essential Files**: Added `.gitignore`, `CONTRIBUTING.md`, and `LICENSE` files.
- **Frontend Framework**: Integrated React for the user interface.
- **Backend Framework**: Set up Django for the backend infrastructure.
- **Database Integration**: Implemented MongoDB for managing and storing data.
- **API Integration**: Added OpenAI API (ChatGPT) for generating "What If" questions.
- **Initial API Endpoints**: Created endpoints for ChatGPT and Translation API.

#### Changed

- **README.md**: Updated to include project overview, installation instructions, and technical considerations.
- **Technical Considerations**: Adjusted to reflect the finalized technology stack, including the transition to serverless Netlify.

#### Fixed

- **Documentation Errors**: Corrected typos and formatting issues in the README file.

### [Sprint 2] - 20 September 2024

#### Added

- **Backend Refactor to Node.js**: Migrated the backend from Django to Node.js (Express) for better integration with the JavaScript-based frontend.
- **Prompt Engineering**: Implemented logic for the OpenAI API to generate dynamic "What If" questions based on different creativity levels.
- **Frontend-Backend Integration**: Integrated the React frontend with the Node.js backend.
- **Data Storage with MongoDB**: Designed and implemented a schema to securely store user interactions and generated questions.
- **User Interface for Topic Input**: Developed an input interface for users to submit topics.
- **Question Display Interface**: Implemented a layout for displaying generated "What If" questions.
- **Regenerate Feature**: Added functionality to regenerate a new set of questions.
- **Session Management**: Implemented session tracking using `node-snowflake`.
- **Data Security and Privacy**: Ensured secure storage of sensitive data.
- **Automatic Topic Extraction**: Enabled automatic extraction of topics from user input.
- **Language and Content Filtering**: Integrated real-time filtering of inappropriate language.
- **Ethical Content Guidelines**: Established guidelines to ensure socially responsible question generation.

#### Changed

- **Technology Stack Update**: Transitioned the backend from Django to Node.js.
- **Project Hosting Platform Migration**: Moved hosting from Netlify to AWS.
- **Project Deployment**: Deployed the application on AWS.
- **Frontend Layout Enhancements**: Improved the UI/UX design for better readability.
- **Long-Term Data Storage**: Configured MongoDB for storing interaction data.

#### Fixed

- **Session Persistence Issues**: Resolved issues with session continuity.
- **Frontend-Backend API Communication**: Fixed communication bugs between the frontend and backend.
- **Responsive Design Fixes**: Corrected layout issues for better responsiveness.
- **Input Validation and Feedback**: Implemented real-time input validation.

#### Removed

- **Django Backend**: Removed the Python (Django) backend code.

#### Notes

- **Testing**: Conducted unit, integration, and end-to-end tests.
- **Future Enhancements**: Plans include additional interaction features and data analysis improvements.

### [Sprint 3] - 18 October 2024

#### Added
- **State Management Enhancements**: Introduced new states (`conversations`, `currentConversationId`) to manage conversation history, including deletion functionality.
- **Local Storage Integration**: Added localStorage to save and retrieve conversation data for persistence across user sessions.
- **Responsive Sidebar Design**: Implemented dynamic sidebar adjustments based on screen size (`isMobile`) to optimize the layout for mobile and desktop devices.
- **Multi-Conversation Management**: Introduced the ability to manage multiple chat sessions, allowing users to save, load, and delete conversations.
- **Creativity Level Selector**: Added a feature that lets users adjust the chatbot’s response creativity, with options for low, medium, and high.

#### Changed
- **Sidebar Behavior Optimization**: Adjusted the sidebar width and behavior on mobile devices for a more seamless user experience.
- **Chat Interface Enhancement**: Preloaded `user_chat.css` to improve performance and user experience when switching between interfaces.
- **Smooth Scroll Functionality**: Added automatic scrolling to the most recent message in chat.

#### Fixed
- **Scrolling Bug**: Resolved incorrect scrolling behavior when loading older conversations.
- **CSS Loading Delays**: Fixed potential performance issues due to CSS loading delays across different pages.

#### Removed
- No features were removed during this sprint.

#### Notes
- **Security Enhancements**: Implemented IP address and browser fingerprint detection using FingerprintJS and a hash generation function for improved rate-limiting protection.
- **API Integrations**: Integrated fingerprint and IP address submission for rate-limiting control, along with improved error handling for API requests related to message processing and rate limit responses.

### [Sprint 4] - 1 November 2024
