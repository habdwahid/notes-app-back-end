# Notes App Back End
> This project is a submission for the **"Belajar Membuat Aplikasi Back-End untuk Pemula"** and **"Belajar Fundamental Back-End Dengan JavaScript"** course at **Dicoding Indonesia**.

A lightweight RESTful API designed to manage personal notes. This project serves as a robust back-end service that allows users to create, store, view, update, and delete note entries.

## 🚀 Core Features
- Create: Add new notes with a title, tags, and body.
- Read: Retrieve a list of all notes or fetch specific details by ID.
- Update: Modify existing note content seamlessly.
- Delete: Permanently remove notes from the database.

## 🛠️ Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Data Storage: PostgreSQL
- Tooling: Nodemon for development, ESLint for code quality.

## 🏁 Getting Started
### Prerequisites
Make sure you have Node.js (LTS version recommended) installed on your local machine.

### Installation
1. Clone this repository:
```bash
git clone https://github.com/habdwahid/notes-app-back-end.git
```

2. Navigate to the project directory:
```bash
cd notes-app-back-end
```

3. Install dependencies:
```bash
npm install
```

### Running the Application
- **Development Mode:**
```bash
npm run dev
```

- **Production Mode:**
```bash
npm run start
```

## 📌 API Endpoints

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| ``POST`` | ``/notes`` | Create a new note |
| ``GET`` | ``/notes`` | Retrieve all notes |
| ``GET`` | ``/notes/{id}`` | Get details of a specific note |
| ``PUT`` | ``/notes/{id}`` | Update an existing note |
| ``DELETE`` | ``/notes/{id}`` | Delete a note by ID |

**Note**: Ensure you include a JSON ```body``` when making ```POST``` and ```PUT``` requests to ensure the data is processed correctly.
