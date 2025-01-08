# Chat Application with Next.js, Django, and Webhooks

![Chat Application Screenshot](./Screenshot%202025-01-08%20at%2016.37.50.png)

Welcome to the **GRF Chat**, a modern, real-time chat application built using **Next.js** for the frontend and **Django** for the backend, integrated with **Webhooks** for event-driven communication.

## 🚀 Features

- **Real-Time Messaging**: Chat with users instantly.
- **Webhook Integration**: Receive notifications and automate actions seamlessly.
- **Responsive Design**: Optimized for web and mobile.
- **Scalable Backend**: Powered by Django for a robust and secure API.

---

## 🛠️ Technologies Used

### Frontend:

- **Next.js**: React-based framework for server-side rendering and static site generation.

### Backend:

- **Django**: Web framework for building the REST API.
- **Django Rest Framework**: Web framework for building the REST API.
- **Webhooks**: Event-driven mechanism for handling real-time communication.


## 🎬 Demo

### Screenshots

#### Chat Interface

![Chat Interface Screenshot](./Screenshot%202025-01-08%20at%2016.37.56.png)

#### Settings Page

![Settings Screenshot](./Screenshot%202025-01-08%20at%2016.37.28.png)

#### Webhook Notifications

![Webhook Screenshot](./Screenshot%202025-01-08%20at%2016.37.42.png)

---

### Video Walkthrough

[![Watch the Walkthrough](./Screenshot%202025-01-08%20at%2016.37.50.png)](./Screen%20Recording%202025-01-08%20at%2016.43.39.mov)

Click on the image above or [here](./recording.mov) to watch a full walkthrough of the application.

---

## 📦 How to Run the Project

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.9 or higher)
- **Django** (v5.0 or higher)

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/lscavalcante/GRF-Chat.git
```

#### 2. Frontend Setup (Next.js)

```bash
# Navigate to the frontend directory
cd web.chat

# Install dependencies
npm install

https://github.com/user-attachments/assets/1a63ef96-0902-4770-baef-13fed68dbf3d



# Start the development server

https://github.com/user-attachments/assets/a7ef423e-ab32-4b36-9bc5-e579285e9e57


npm run dev
```

#### 3. Backend Setup (Django)

```bash
# Navigate to the backend directory
cd api.webchat

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Linux/MacOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver

```

---

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/nameForFeature`).
3. Commit your changes (`git commit -m 'Add some nameForFeature'`).
4. Push to the branch (`git push origin feature/nameForFeature`).
5. Open a pull request.

---

## 📧 Contact

For any questions or issues, please reach out to the [team](mailto:lucasantoscv@gmail.com).

---

Enjoy the app! 🎉
