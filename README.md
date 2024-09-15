# AI Chatterbox - Software Project (SA RedBack)

Welcome to the SA RedBack project! The AI Chatterbox is a web-based AI chatbot designed to enhance creativity and critical thinking by generating speculative "what if" questions based on user input. This project aims to stimulate creativity and interdisciplinary dialogue through engaging and thought-provoking questions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Project Links](#project-links)
- [Usage](#usage)
- [Scripts](#scripts)
  - [example.py](#examplepy)
- [Build Script](#build-script)
- [Dependencies](#dependencies)
- [API Endpoints](#api-endpoints)
- [API Usage](#api-usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Changelog](#changelog)

## Project Overview

The AI Chatterbox transforms the traditional paper-based chatterbox into a digital platform. It generates and explores hypothetical questions to foster creativity and critical thinking. By providing users with eight unique "what if" questions based on their input, the chatbot promotes in-depth exploration of complex topics and enhances user engagement in various settings, such as art galleries and educational environments.

## Features

- **Web-Based Platform**: Accessible via a web interface, eliminating the need for app downloads. Users can engage with the AI Chatterbox from any device with internet access.
  
- **AI-Generated Questions**: The chatbot generates eight unique "what if" questions based on user input. These questions are designed to stimulate creativity and critical thinking on a wide range of topics.

- **Multilingual Support**: The platform supports multiple languages, making it accessible to a global audience. This feature ensures that users from different linguistic backgrounds can interact with the chatbot effectively.

- **No Login Required**: Users can start interacting with the chatbot immediately without the need to create an account or log in, ensuring a seamless and hassle-free experience.

- **Adaptive Question Generation**: The system adapts its question generation based on user input, allowing for a diverse range of speculative questions tailored to various topics.

- **Data Collection and Analysis**: Collects and securely stores user interactions for future research and analysis. This feature helps in understanding user behavior and improving the system based on feedback.

- **QR Code Access**: Simplifies user access by providing QR codes that link directly to the chatbot. This feature ensures easy and quick interaction, especially in public or gallery settings.

- **Output Filtering**: Ensures that generated questions adhere to safety and appropriateness standards by filtering out any potentially harmful or inappropriate content.

- **User Feedback Mechanism**: Provides options for users to give feedback on the questions and their experience, helping to refine and improve the chatbot's performance and content.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Required for running both the frontend and backend servers. Since we are using JavaScript on both sides, Node.js is essential.
- **npm (Node Package Manager)**: Comes with Node.js and is used to manage dependencies for both the frontend and backend.
- **MongoDB**: A NoSQL database used for data storage.
- **Git**: For version control and managing the codebase.

If you don't have these tools installed, please follow the relevant installation instructions for your operating system to set them up.

## Installation and Setup

Follow these steps to set up the project locally.

1. **Clone the project repository:**

    ```bash
    git clone https://github.com/feit-comp90082/SA-RedBack.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd SA-RedBack
    ```

3. **Install backend dependencies:**

    - Navigate to the backend directory:

    ```bash
    cd backend
    ```

    - Install backend dependencies using npm:

    ```bash
    npm install
    ```

4. **Install frontend dependencies:**

    - Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

    - Install frontend dependencies using npm:

    ```bash
    npm install
    ```

5. **Set up environment variables:**

    - Create a `.env` file in both the backend and frontend directories and configure necessary environment variables such as MongoDB connection string, API keys, etc.
    - Example `.env` for the backend:

    ```bash
    MONGO_URI=your-mongo-connection-string
    OPENAI_API_KEY=your-openai-api-key
    ```

6. **Start MongoDB locally or connect to MongoDB Atlas:**

    - If running MongoDB locally, ensure it's started using:

    ```bash
    mongod
    ```

    - Alternatively, connect to MongoDB Atlas by providing the correct connection string in the `.env` file.

7. **Run the backend server:**

    - Start the backend server by running:

    ```bash
    npm run start:backend
    ```

    - This will start the Node.js backend server on the specified port (default: `3001`).

8. **Run the frontend server:**

    - Start the frontend server by running:

    ```bash
    npm run start:frontend
    ```

    - This will launch the React frontend on the default port (default: `3000`).

9. **Access the application:**

    - Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

10. **Testing:**

    - To run tests for the backend, navigate to the `backend` directory and run:

    ```bash
    npm test
    ```

    - To run tests for the frontend, navigate to the `frontend` directory and run:

    ```bash
    npm test
    ```

## Project Links

- **Live Website (AWS Deployment)**: [SA Redback - Live Application](http://54.206.147.247:5173/)
- **Trello Board**: [COMP90082 2024 SM2 SA Redback Trello Board](https://trello.com/b/jHGbpSQC/comp90082-2024-sm2-sa-redback)
- **Confluence Wiki**: [COMP90082 2024 S2 Confluence Wiki](https://comp90082-2024-s2-sa-redback.atlassian.net/wiki/spaces/comp9008223/overview)
- **Figma Design**: [Project Design on Figma](https://www.figma.com/proto/ik7MYv4wULWS3Dhnu8QjKG/SA-Redback?page-id=0%3A1&node-id=21-212&viewport=583%2C1320%2C0.37&t=gGjkFiaqu2qhT8tz-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=21%3A212&share=1)

## Usage

After setting up, you can interact with the AI Chatterbox by following these steps:

1. **Access the Application**: You can directly access the deployed application on AWS via [SA Redback - Live Application](http://54.206.147.247:5173/).

2. **Open Your Browser**: Navigate to the live application link in your web browser.

3. **Interact with the Chatbot**: On the web interface, you will see the AI Chatterbox. Follow the on-screen instructions to begin generating and exploring "what if" questions.

4. **Provide Input**: Enter your prompts or questions into the provided input field. The AI Chatterbox will generate a set of creative "what if" questions based on your input.

5. **Review Questions**: The generated questions will be displayed on the screen. You can explore these questions to stimulate creativity and critical thinking.

6. **Provide Feedback**: If applicable, provide feedback on the generated questions to help improve the system's responses.

For local development or testing, make sure your server is running by following the setup instructions in the **Installation and Setup** section. If you're running locally, navigate to [http://localhost:5173](http://localhost:5173) in your browser.

If you need further assistance, refer to the [Documentation](#) or contact support.

## Scripts

The following scripts are available for managing and running the project:

- **start**: This script starts the Node.js backend server. Use this when you want to run the server in production mode.
  ```bash
  npm run start
  ```
- This script runs both the frontend and backend servers in development mode with hot-reloading enabled. Ideal for local development and debugging.
  ```bash
  npm run dev
  ```
- build: This script builds the frontend assets for production. It compiles and optimizes the frontend files, which will be served by the backend server.
  ```bash
  npm run build
  ```
- test: This script runs the test suite to ensure code functionality and correctness. It covers unit tests, integration tests, and other test cases defined in the project.
  ```bash
  npm run test
  ```
- lint: This script runs ESLint to check the code for stylistic and programmatic errors, ensuring that the code follows the defined coding standards.
  ```bash
  npm run lint
  ```
- lint: This script automatically fixes linting errors where possible. It's useful for quickly resolving minor formatting issues.
  ```bash
  npm run lint:fix
  ```
- start: This script starts the frontend server separately, useful when only the frontend part of the application needs to be worked on or tested.
  ```bash
  npm run start:frontend
  ```
- start: This script starts the backend server separately, allowing for isolated backend testing and development.
  ```bash
  npm run start:backend
  ```

All these scripts can be found in the `package.json` file, and they are executed using `npm`, the Node Package Manager. To run any of these scripts, simply use the following command:

```bash
npm run package.json
  ```

For example, to start the application in development mode, use:
```bash
npm run dev
  ```

## Build Script

The build script prepares the application for production by optimizing and bundling the code. It processes the frontend assets and ensures that the application is ready for deployment.

### To run the build script:

```bash
npm run build
  ```

This command will:
- Compile and minify the JavaScript and CSS files for the frontend.
- Bundle the necessary assets for the application.
- Prepare the project for deployment by creating a dist folder (or similar, depending on your setup), which contains all the files needed for production.

Make sure to run this script before deploying your application to a production server or hosting platform like AWS.

## Dependencies

- **React**: A JavaScript library for building user interfaces. Used for developing the frontend of the application, allowing for a dynamic and responsive user experience.

- **Node.js**: A JavaScript runtime used for the backend development. It allows us to run JavaScript on the server and handle data, create APIs, and manage server-side logic.

- **MongoDB**: A NoSQL database for storing and managing data. It is used to handle complex and dynamic data structures, such as user sessions, prompts, generated questions, and feedback.

- **AWS (Amazon Web Services)**: The hosting platform used to deploy both frontend and backend of the application. AWS provides robust cloud infrastructure, ensuring scalability, security, and continuous availability.

- **Express**: A Node.js web application framework used to create APIs and manage backend routing and middleware.

These dependencies work together to create a full-stack application with a React frontend, Node.js backend, MongoDB database, and AWS for deployment and hosting.

## API Endpoints

| API                        | Type                  | Main Features                                             | How It Fits in the Project |
|----------------------------|-----------------------|-----------------------------------------------------------|-----------------------------|
| **OpenAI API (ChatGPT)**   | Language Model API    | Generates human-like text based on prompts                | Provides creative "what if" questions to engage users and stimulate thinking. |
| **Translation API** (e.g., Google Translate) | Translation API       | Supports multiple languages, text translation capabilities | Enables multilingual support by translating chatbot responses. |
| **MongoDB Atlas API**       | NoSQL Database API    | Flexible document model, high performance, scalable      | Manages and stores user data such as sessions and feedback efficiently. |
| **Django REST Framework**  | Web API Framework     | Builds web APIs quickly, handles serialization and authentication | Creates RESTful APIs for frontend-backend communication. |
| **React Library**          | Frontend Library      | Component-based architecture, state management            | Fetches and displays data from APIs, and manages dynamic content. |

## API Usage

We follow RESTful API design principles to provide a consistent and intuitive interface. Each request path is terminated with a `/`, clearly indicating its functionality and target resource.

#### OpenAI API (ChatGPT)
- `GET /api/chatgpt/prompts/` - Retrieves all stored prompts.
- `GET /api/chatgpt/prompt/{prompt_id}/` - Retrieves a specific prompt by ID.
- `POST /api/chatgpt/prompt/` - Creates a new prompt and retrieves the generated response.
- `PUT /api/chatgpt/prompt/{prompt_id}/` - Updates an existing prompt.
- `DELETE /api/chatgpt/prompt/{prompt_id}/` - Deletes a specific prompt by ID.

#### MongoDB API
- `GET /api/mongodb/collections/` - Retrieves all collections in the database.
- `GET /api/mongodb/collection/{collection_name}/documents/` - Retrieves all documents from a specific collection.
- `GET /api/mongodb/collection/{collection_name}/document/{document_id}/` - Retrieves a specific document by ID.
- `POST /api/mongodb/collection/{collection_name}/document/` - Inserts a new document into a collection.
- `PUT /api/mongodb/collection/{collection_name}/document/{document_id}/` - Updates a specific document in a collection.
- `DELETE /api/mongodb/collection/{collection_name}/document/{document_id}/` - Deletes a specific document by ID.

#### Node.js/Express API
- `GET /api/users/` - Retrieves all users.
- `GET /api/user/{user_id}/` - Retrieves a specific user by ID.
- `POST /api/user/` - Creates a new user.
- `PUT /api/user/{user_id}/` - Updates a specific user by ID.
- `DELETE /api/user/{user_id}/` - Deletes a specific user by ID.

#### React Integration (For Frontend-Backend Communication)
- `GET /api/frontend/components/` - Retrieves all frontend components.
- `GET /api/frontend/component/{component_id}/` - Retrieves a specific component by ID.
- `POST /api/frontend/component/` - Creates a new frontend component.
- `PUT /api/frontend/component/{component_id}/` - Updates a specific frontend component.
- `DELETE /api/frontend/component/{component_id}/` - Deletes a specific frontend component by ID.

## Testing

Testing is a crucial part of ensuring the reliability and functionality of the AI Chatterbox. The following testing strategies are employed:

1. **Unit Testing**: Individual components and functions are tested in isolation to ensure they perform as expected.
2. **Integration Testing**: Tests verify that different parts of the system work together correctly, including API calls and database interactions.
3. **End-to-End Testing**: Tests simulate user interactions with the application to ensure that the entire system works as intended.
4. **Performance Testing**: Evaluates the application’s performance under various conditions to ensure it meets performance requirements.

### Running Tests

To run tests, follow these steps:

1. **Frontend Tests**:
   - Navigate to the frontend directory.
   - Run `npm test` to execute the test suite using tools like **Jest** and **React Testing Library**.

2. **Backend Tests**:
   - Navigate to the backend directory.
   - Run `npm test` to execute the test suite using tools like **Jest** and **Supertest** for API testing.

3. **End-to-End Tests**:
   - Ensure the application is running.
   - Use tools like **Cypress** or **Puppeteer** to run end-to-end tests that simulate user interactions.

4. **Performance Tests**:
   - Use tools like **Lighthouse** (for frontend) or **Artillery** (for backend) to measure and evaluate the performance of the application.

For more detailed information on testing procedures and configurations, refer to the project’s documentation or test files located in the `tests` directory.

## Contributing

We welcome contributions from the community! For more details on how to contribute, please see the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact the project team:
- **Yujun Yan (Mentor)**: yujun.yan.1@unimelb.edu.au
- **YiYao Li Shaelyn (Product Owner)**: yiyao3@student.unimelb.edu.au
- **Yiqun Liu Elva (Scrum Master)**: yiqun2@student.unimelb.edu.au
- **Yingying Guo Vicky (Quality Assurance Leader)**: yinguo3@student.unimelb.edu.au
- **Leyao Lyu Lydia (Developer)**: lyull@student.unimelb.edu.au
- **Jionghao Song Harry (Developer)**: jionghaos@student.unimelb.edu.au

## Changelog

All notable changes to this project will be documented in this file.

### [Sprint 1] - 18 August 2024

#### Added
- **GitHub Repository**: Created the initial GitHub repository for project management.
- **Initial Project Structure**: Set up the project with `docs` and `src` directories.
- **Essential Files**: Added `.gitignore`, `CONTRIBUTING.md`, and `LICENSE` files.
- **Frontend Framework**: Integrated React for the user interface.
- **Backend Framework**: Set up Django for the backend infrastructure.
- **Database Integration**: Implemented MongoDB for managing and storing data.
- **API Integration**: Added OpenAI API (ChatGPT) for generating "what if" questions.
- **Initial API Endpoints**: Created endpoints for ChatGPT and Translation API.

#### Changed
- **README.md**: Updated to include project overview, installation instructions, and technical considerations.
- **Technical Considerations**: Adjusted to reflect the finalized technology stack, including the transition to serverless Netlify.

#### Fixed
- **Documentation Errors**: Corrected typos and formatting issues in the README file.

### [Sprint 2] - 20 September 2024

#### Added
- **Backend Refactor to Node.js**: Migrated the backend from Python (Django) to Node.js (Express) for better integration with the JavaScript-based frontend, streamlining the technology stack.
- **Prompt Engineering**: Implemented prompt engineering logic for the OpenAI API to generate creative and dynamic "what if" questions based on different creativity levels.
- **Frontend-Backend Integration**: Successfully integrated the frontend React application with the backend Node.js API, enabling seamless communication between the user interface and question generation system.
- **Data Storage with MongoDB**: Designed and implemented MongoDB database schema to securely store user interactions, session data, and generated questions for long-term analysis.
- **User Interface for Topic Input**: Developed a user-friendly input interface to allow users to easily submit topics and receive generated questions.
- **Question Display Interface**: Designed and implemented the frontend display layout for showing the generated "what if" questions, providing a clear and readable interface for users.
- **Regenerate Feature**: Added functionality allowing users to regenerate 8 new "what if" questions if they are unsatisfied with the initial set, improving user experience.
- **Session Management**: Implemented session management on the backend using `node-snowflake` to uniquely track user interactions and ensure continuity across sessions.
- **Data Security and Privacy**: Implemented measures to ensure the secure storage of sensitive data such as user input and session data, following industry standards for privacy.
- **Automatic Topic Extraction**: Added automatic topic extraction from user input, ensuring content integrity and allowing for more accurate and relevant question generation.
- **Language and Content Filtering**: Integrated strong language and content filtering capabilities to maintain a healthy platform environment, with real-time detection of inappropriate language.
- **Ethical Content Guidelines**: Defined and implemented ethical content guidelines for question generation to ensure that system-generated questions are socially responsible and appropriate.

#### Changed
- **Technology Stack Update**: Transitioned the backend from Django to Node.js, enabling a full JavaScript stack for easier management, development, and deployment across the team.
- **Project Hosting Platform Migration**: Moved the hosting platform from Netlify to AWS for improved scalability, flexibility, and performance in both frontend and backend deployments.
- **Project Deployment**: Deployed the application on AWS, providing a stable and scalable environment for hosting the AI Chatterbox with improved performance over Netlify.
- **Frontend and Backend Deployment**: Frontend was deployed on AWS, with integration between the frontend and backend to ensure real-time communication for generating and displaying questions.
- **Frontend Layout Enhancements**: Enhanced the UI/UX design of the input interface and question display components, improving readability and user engagement.
- **Long-Term Data Storage**: Configured MongoDB to store user interaction data for future analysis and research, ensuring both short-term session management and long-term storage capabilities.

#### Fixed
- **Session Persistence Issues**: Resolved issues where user sessions were not being properly maintained across interactions. Now, session data is securely stored in MongoDB and properly retrieved for each new interaction.
- **Frontend-Backend API Communication**: Fixed bugs in the communication between the frontend and backend, ensuring smoother data flow and more reliable prompt generation.
- **Responsive Design Fixes**: Corrected layout issues to ensure the frontend interface is fully responsive across different devices and screen sizes.
- **Input Validation and Feedback**: Implemented input validation on the frontend to provide real-time feedback on user submissions, ensuring cleaner and more relevant data is sent to the backend.

#### Removed
- **Django Backend**: Completely removed the previous Python (Django) backend code, as it was replaced with the Node.js (Express) framework for a more consistent and streamlined development process.

#### Notes
- **Testing**: Both unit and integration testing were conducted on the frontend and backend to ensure functionality and stability. End-to-end tests were carried out using Cypress to simulate user interactions and validate the system's performance under real-world conditions.
- **Future Enhancements**: Plans for the next sprint include implementing more advanced interaction features, additional optimizations for the user experience, and improving data analysis capabilities.

### [Sprint 3] - To be updated
