# SimplePrep

SimplePrep is a comprehensive platform designed to help students prepare for the SAT exams. It includes practice features, analytics for visualizing student progress, and adapts to the new digital SAT format, which has shorter passages and fewer questions in the Reading and Writing sections.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Practice Exams**: Simulate real SAT exams with digital format support.
- **Analytics**: Track and visualize student progress with detailed analytics.
- **Dynamic Content**: Automatically updates section names and navigates users to relevant pages.
- **User Authentication**: Secure login and registration with Firebase authentication.
- **Two-Factor Authentication**: Enhanced security for admin access.
- **Mobile Responsive**: Fully responsive design for all devices.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Redux
- **Backend**: Django, Firebase
- **Database**: Firestore (temporary), PostgreSQL (main)
- **Deployment**: Docker, Nginx, EC2
- **Others**: Djoser for authentication, Certbot for SSL certificates

## Setup and Installation

### Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed
- Python and pip installed

### Installation Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/simpleprep.git
    cd simpleprep
    ```

2. **Set up environment variables**: Create a `.env` file in the project root and add the following:
    ```env
    DB_NAME=
    DB_USER=
    DB_PASS=
    DJANGO_SECRET_KEY=
    DJANGO_ALLOWED_HOSTS=
    ACME_DEFAULT_EMAIL=
    DOMAIN=
    ```

3. **Build and run the Docker containers**:
    ```bash
    docker-compose up --build
    ```

4. **Apply Django migrations**:
    ```bash
    docker-compose exec backend python manage.py migrate
    ```

5. **Create a superuser for Django admin**:
    ```bash
    docker-compose exec backend python manage.py createsuperuser
    ```

6. **Install frontend dependencies and build the project**:
    ```bash
    cd frontend
    npm install
    npm run build
    ```

7. **Navigate to your domain**: Open your browser and navigate to `http://beta-simpleprep.com`.

## Usage

1. **User Registration and Login**: Users can register and log in securely with Firebase authentication.
2. **Practice Exams**: Access and take practice exams that mimic the new digital SAT format.
3. **Progress Tracking**: View detailed analytics and progress reports.
4. **Admin Panel**: Access the admin panel with enhanced security features to manage content and users.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README further to better fit your project's needs and specifics.
