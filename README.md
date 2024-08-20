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

- **Python 3.x**: Required for running the backend services. Make sure you have Python 3.x installed and configured on your system.
- **Pip (Python Package Manager)**: Used for managing Python packages. Typically included with Python installations.
- **Node.js and npm**: Required for frontend development with React. npm (Node Package Manager) is included with Node.js.
- **Git**: For version control and managing the codebase. Install Git to clone the repository and manage changes.
- **MongoDB**: An open-source NoSQL database. We use MongoDB Atlas as our cloud database solution for this project.

If you don't have these tools installed, please follow the relevant installation instructions for your operating system to set them up.

## Installation and Setup

1. **Clone the project repository:**
    ```bash
    git clone https://github.com/feit-comp90082/SA-RedBack.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd SA-RedBack
    ```

3. **Install frontend dependencies:**
    Navigate to the `frontend` directory (assuming your frontend is in a subdirectory named `frontend`):
    ```bash
    cd frontend
    npm install
    ```

4. **Install backend dependencies:**
    Navigate to the `backend` directory (assuming your backend is in a subdirectory named `backend`):
    ```bash
    cd ../backend
    pip install -r requirements.txt
    ```

5. **Set up environment variables:**
    - Create a `.env` file in the `backend` directory and add your MongoDB Atlas connection string and other necessary environment variables.

6. **Run the backend server:**
    ```bash
    python manage.py runserver
    ```

7. **Deploy Frontend to Netlify:**
    - Connect your GitHub repository to Netlify and follow the instructions for automatic builds and deployments. Ensure that your `frontend` directory is configured for deployment.

8. **Deploy Backend with Netlify Functions:**
    - Develop Django serverless functions and deploy them using Netlify. Set up API endpoints and configure your Netlify project to handle serverless functions.

9. **Run Frontend Locally:**
    - Ensure your frontend can access the backend API by configuring the API endpoint URLs correctly in your frontend environment files.

10. **Testing:**
    - Run tests for both frontend and backend to ensure everything is functioning correctly.

## Project Links

- **Trello Board**: [COMP90082 2024 SM2 SA Redback Trello Board](https://trello.com/b/jHGbpSQC/comp90082-2024-sm2-sa-redback)
- **Confluence Wiki**: [COMP90082 2024 S2 Confluence Wiki](https://comp90082-2024-s2.atlassian.net/wiki/spaces/comp9008223/overview)
- **Figma Design**: [Project Design on Figma](https://www.figma.com/proto/ik7MYv4wULWS3Dhnu8QjKG/SA-Redback?page-id=0%3A1&node-id=21-212&viewport=583%2C1320%2C0.37&t=gGjkFiaqu2qhT8tz-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=21%3A212&share=1)

## Usage

After setting up, you can interact with the AI Chatterbox by following these steps:

1. **Start the Application**: Ensure that the application is running locally. You should have followed the setup instructions to start the server.

2. **Open Your Browser**: Navigate to [http://localhost:8000](http://localhost:8000) in your web browser.

3. **Interact with the Chatbot**: On the web interface, you will see the AI Chatterbox. Follow the on-screen instructions to begin generating and exploring "what if" questions.

4. **Provide Input**: Enter your prompts or questions into the provided input field. The AI Chatterbox will generate a set of creative "what if" questions based on your input.

5. **Review Questions**: The generated questions will be displayed on the screen. You can explore these questions to stimulate creativity and critical thinking.

6. **Provide Feedback**: If applicable, provide feedback on the generated questions to help improve the system's responses. 

Make sure your local server is running, and check the browser console for any errors if you encounter issues. If you need further assistance, refer to the [Documentation](#) or contact support.

## Scripts

- **example.py**: For reference only.

## Build Script

The build script automates the data fetching, processing, and analysis workflow. Run the script to set up the environment and start the data pipeline.

## Dependencies

- **React**: A JavaScript library for building user interfaces. Used for developing the frontend of the application, allowing for a dynamic and responsive user experience.

- **Django**: A Python web framework used for the backend development. It provides robust tools for handling data, creating APIs, and managing server-side logic.

- **MongoDB**: A NoSQL database for storing and managing data. It is used to handle complex and dynamic data structures, such as user sessions, prompts, generated questions, and feedback.

- **Netlify**: A platform for deployment and hosting. It provides continuous deployment from Git, a global CDN for fast content delivery, and serverless functions to support backend operations.

These dependencies work together to create a full-stack application with a React frontend, Django backend, MongoDB database, and Netlify for deployment and hosting.

## API Endpoints

| API                        | Type                  | Main Features                                             | How It Fits in the Project |
|----------------------------|-----------------------|-----------------------------------------------------------|-----------------------------|
| **OpenAI API (ChatGPT)**   | Language Model API    | Generates human-like text based on prompts                | Provides creative "what if" questions to engage users and stimulate thinking. |
| **Translation API** (e.g., Google Translate) | Translation API       | Supports multiple languages, text translation capabilities | Enables multilingual support by translating chatbot responses. |
| **MongoDB Atlas API**       | NoSQL Database API    | Flexible document model, high performance, scalable      | Manages and stores user data such as sessions and feedback efficiently. |
| **Django REST Framework**  | Web API Framework     | Builds web APIs quickly, handles serialization and authentication | Creates RESTful APIs for frontend-backend communication. |
| **React Library**          | Frontend Library      | Component-based architecture, state management            | Fetches and displays data from APIs, and manages dynamic content. |

### API Usage

We follow RESTful API design principles to provide a consistent and intuitive interface. Each request path is terminated with a `/`, clearly indicating its functionality and target resource.

#### OpenAI API (ChatGPT)
- `GET /api/chatgpt/prompts/` - Retrieves all stored prompts.
- `GET /api/chatgpt/prompt/{prompt_id}/` - Retrieves a specific prompt by ID.
- `POST /api/chatgpt/prompt/` - Creates a new prompt and retrieves the generated response.
- `PUT /api/chatgpt/prompt/{prompt_id}/` - Updates an existing prompt.
- `DELETE /api/chatgpt/prompt/{prompt_id}/` - Deletes a specific prompt by ID.

#### Translation API (e.g., Google Translate)
- `GET /api/translation/languages/` - Retrieves all supported languages.
- `GET /api/translation/text/{text_id}/` - Retrieves the translated text by ID.
- `POST /api/translation/text/` - Submits a text for translation.
- `PUT /api/translation/text/{text_id}/` - Updates an existing translation request.
- `DELETE /api/translation/text/{text_id}/` - Deletes a translation request by ID.

#### MongoDB Atlas API
- `GET /api/mongodb/collections/` - Retrieves all collections in the database.
- `GET /api/mongodb/collection/{collection_name}/documents/` - Retrieves all documents from a specific collection.
- `GET /api/mongodb/collection/{collection_name}/document/{document_id}/` - Retrieves a specific document by ID.
- `POST /api/mongodb/collection/{collection_name}/document/` - Inserts a new document into a collection.
- `PUT /api/mongodb/collection/{collection_name}/document/{document_id}/` - Updates a specific document in a collection.
- `DELETE /api/mongodb/collection/{collection_name}/document/{document_id}/` - Deletes a specific document by ID.

#### Django REST Framework
- `GET /api/users/` - Retrieves all users.
- `GET /api/user/{user_id}/` - Retrieves a specific user by ID.
- `POST /api/user/` - Creates a new user.
- `PUT /api/user/{user_id}/` - Updates a specific user by ID.
- `DELETE /api/user/{user_id}/` - Deletes a specific user by ID.

#### React Library (For Integration with APIs)
- `GET /api/frontend/components/` - Retrieves all frontend components.
- `GET /api/frontend/component/{component_id}/` - Retrieves a specific component by ID.
- `POST /api/frontend/component/` - Creates a new frontend component.
- `PUT /api/frontend/component/{component_id}/` - Updates a specific frontend component.
- `DELETE /api/frontend/component/{component_id}/` - Deletes a specific frontend component by ID.

## Testing

Testing is a crucial part of ensuring the reliability and functionality of the AI Chatterbox. The following testing strategies are employed:

1. **Unit Testing**: Individual components and functions are tested in isolation to ensure they perform as expected.
2. **Integration Testing**: Tests verify that different parts of the system work together correctly.
3. **End-to-End Testing**: Tests simulate user interactions with the application to ensure that the entire system works as intended.
4. **Performance Testing**: Evaluates the application’s performance under various conditions to ensure it meets performance requirements.

### Running Tests

To run tests, follow these steps:

1. **Frontend Tests**:
   - Navigate to the frontend directory.
   - Run `npm test` or `yarn test` to execute the test suite.

2. **Backend Tests**:
   - Navigate to the backend directory.
   - Run `pytest` or `python manage.py test` to execute the test suite.

3. **End-to-End Tests**:
   - Ensure the application is running.
   - Use tools like Cypress or Selenium to run end-to-end tests.

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

### [Sprint 2] - To be updated

### [Sprint 3] - To be updated

### [Sprint 4] - To be updated
