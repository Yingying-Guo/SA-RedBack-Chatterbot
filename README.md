# AI Chatterbox - Software Project (SA RedBack)

Welcome to the SA RedBack project! The AI Chatterbox is a web-based AI chatbot designed to stimulate creativity and critical thinking by generating speculative "What If" questions based on user input. This project aims to promote interdisciplinary dialogue through engaging and thought-provoking questions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Project Links](#project-links)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [API Endpoints](#api-endpoints)
  - [Chat Completion API](#chat-completion-api)
  - [User Information API](#user-information-api)
  - [Export Data APIs](#export-data-apis)
  - [Admin APIs](#admin-apis)
  - [Rate Limit API](#rate-limit-api)
  - [Heartbeat API](#heartbeat-api)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Changelog](#changelog)
  - [Sprint 1 - August 18, 2024]
    - [Added](#added)
    - [Changed](#changed)
    - [Fixed](#fixed)
  - [Sprint 2 - September 20, 2024]
    - [Added](#added-1)
    - [Changed](#changed-1)
    - [Fixed](#fixed-1)
    - [Removed](#removed)
    - [Notes](#notes)
  - [Sprint 3 - October 18, 2024]
    - [Added](#added-2)
    - [Changed](#changed-2)
    - [Fixed](#fixed-2)
    - [Notes](#notes-1)
  - [Sprint 4 - November 1, 2024]
    - [Added](#added-3)
    - [Changed](#changed-3)
    - [Fixed](#fixed-3)
    - [Notes](#notes-2)


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
   cd SA-RedBack/src
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
   VITE_GOOGLE_SITE_KEY=your-key
   VITE_HCAPTCHA_SITE_KEY=your-key
   MAX_REQUESTS=your-limitation
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
- **Live Demo**: [SA Redback - Live Demo](https://youtu.be/qkQzpm7dejY)

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

### Chat Completion API

- **Endpoint**: `/openai/completion`
- **Method**: `POST`
- **Description**: Generates a response based on a given message and creativity level.
- **URL**: <https://ai-chatterbox.mb6.top/openai/completion>

**Request Body**:

```json
{
  "message": "climate change",
  "creativityLevel": 0.5,
  "sessionId": ""
}
```

**Response**

**Description**: The AI-generated response to the input message.

### User Information API

- **Endpoint**: `/db/user-info`
- **Method**: `POST`
- **Description**: Stores or updates user information.
- **URL**: <https://ai-chatterbox.mb6.top/db/user-info>

**Request Body**:

```json
{
  "location": "Brizal",
  "gender": "Male",
  "DoB": "22-11-2000",
  "sessionId": ""
}
```

### Export Data APIs

- **Users Count API**
  - **Endpoint**: `/admin/export/users/count`
  - **Method**: `GET`
  - **Description**: Retrieves the total number of users.

- **Chats Count API**
  - **Endpoint**: `/admin/export/chats/count`
  - **Method**: `GET`
  - **Description**: Retrieves the total number of chats.

- **Export Users API**
  - **Endpoint**: /admin/export/users
  - **Method**: GET
  - **Description**: Exports all user data.

- **Export Chats API**
  - **Endpoint**: /admin/export/chats
  - **Method**: GET
  - **Description**: Exports all chat data.

### Admin APIs

- **Verify Password API**
  - **Endpoint**: `/admin/verify-password`
  - **Method**: `POST`
  - **Description**: Verifies admin password to allow access to secure resources.

**Request Body**:

```json
{
  "password": "youradminkey"
}
```
### Rate Limit API
- **Endpoint**: `/rate_limit/submitFingerprint`
- **Method**: `POST`
- **Description**: Submits a combined hash of IP address and browser fingerprint for rate limiting purposes.

**Request Body**:
```json
{
  "hash": "a1b2c3d4e5f6g7h8i9j0"
}
```
### Heartbeat API
- Endpoint: `/heartbeat`
- Method: `GET`
- Description: Receives periodic heartbeat signals to ensure server uptime and maintain active connection.

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

- Created GitHub repository.
- Set up initial project structure with `docs` and `src` directories.
- Added `.gitignore`, `CONTRIBUTING.md`, and `LICENSE` files.
- Integrated React for frontend and Django for backend.
- Implemented MongoDB for data storage.
- Added OpenAI API (ChatGPT) for generating "What If" questions.

#### Changed

- Updated `README.md` with project overview, installation instructions, and technical considerations.
- Refined technology stack, transitioning to serverless Netlify.

#### Fixed

- Corrected typos and formatting issues in `README.md`.

### [Sprint 2] - 20 September 2024

#### Added

- Migrated backend from Django to Node.js (Express).
- Implemented prompt engineering for OpenAI API.
- Integrated React frontend with Node.js backend.
- Developed schema for MongoDB to store user interactions.
- Built UI for topic input and question display.
- Added regenerate feature for generating new questions.

#### Changed

- Transitioned backend to Node.js and hosting to AWS.
- Enhanced frontend UI/UX for improved readability.

#### Fixed

- Resolved session persistence issues and bugs in frontend-backend communication.

#### Removed

- Removed Python (Django) backend code.

#### Notes

- Conducted unit, integration, and end-to-end testing.

### [Sprint 3] - 18 October 2024

#### Added

- Introduced new states for managing conversation history.
- Integrated localStorage for conversation persistence.
- Enhanced sidebar design for mobile devices.
- Added creativity level selector for responses.

#### Changed

- Optimized sidebar behavior for mobile users.
- Improved chat interface performance.

#### Fixed

- Resolved scrolling bug and CSS loading delays.

#### Notes

- Enhanced security with IP address and browser fingerprint detection.

### [Sprint 4] - 1 November 2024

#### Added

- Updated session and rate-limiting controls.
- Added GitHub Actions for CI/CD management.
- Added the About Us section on the landing page.

#### Changed

- Minor style tweaks on the landing page to align with the new "About Us" section.

#### Fixed

- Resolved an issue where the About Us section was not fully visible on mobile devices.
- Further enhancements for mobile responsiveness are planned for future releases.

#### Notes

- Further mobile optimization will be included in upcoming updates.
