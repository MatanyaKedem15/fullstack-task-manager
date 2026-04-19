# 📝 Fullstack Task Manager

A fullstack task management application built with **Flask (backend)** and **React (frontend)**.  
The system provides a complete CRUD workflow with a responsive UI and persistent data storage.

## 🚀 Live Demo
- **Frontend:** https://fullstack-task-manager-1.onrender.com/  
- **Backend API:** https://fullstack-task-manager-58pu.onrender.com/

---

## ✨ Features

- Create, update, and delete tasks  
- Mark tasks as completed  
- Persistent storage using SQLite  
- RESTful API design with Flask  
- Responsive React UI with real-time updates  
- Clean separation between frontend and backend services  

---

## 🧱 Architecture

- **Frontend:** React (Vite), component-based architecture  
- **Backend:** Flask REST API  
- **Database:** SQLite with SQLAlchemy ORM  
- **Communication:** HTTP requests (fetch API)  

---

## 🛠 Tech Stack

**Backend**
- Python, Flask  
- SQLAlchemy  
- Flask-CORS  

**Frontend**
- React  
- Vite  
- JavaScript (ES6+)  
- CSS  

---

## 📦 Project Structure
```
fullstack-task-app/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── requirements.txt
│   ├── utils/
│   │   ├── seed.py
│   │   ├── export_tasks.py
│   │   ├── import_tasks.py
│   │   ├── api_client.py
│   │   └── cli.py
│   └── tests/
│       ├── conftest.py
│       ├── test_api.py
│       └── test_models.py
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── styles.css
│       ├── config.js
│       └── components/
│           ├── TaskForm.jsx
│           └── TaskList.jsx
│
├── .gitignore
└── README.md


```

---

## ⚙️ Deployment

- Backend deployed on **Render (Web Service)**  
- Frontend deployed on **Render (Static Site)**  
- Fully integrated fullstack application with live endpoints  

## 👤 Author
**Matanya Kedem**

[LinkedIn](https://www.linkedin.com/in/USERNAME) • [GitHub](https://github.com/USERNAME)

