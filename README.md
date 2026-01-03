# 🎤 AI Interview Copilot (Live)

AI Interview Copilot is a full-stack Generative AI application designed to help users practice interviews in real time using live speech input. The system listens to spoken interview questions, converts speech into text, and generates clear, structured, interview-ready answers using modern Large Language Models.

This project simulates a real interviewer–candidate interaction and focuses on improving answer clarity, confidence, and technical explanation skills.

---

## 🚀 Features

- 🎙️ **Live Speech-Based Interview**
  - Ask interview questions using your microphone in real time.

- 🤖 **AI-Powered Interview Answers**
  - Generates professional, structured, interview-ready answers.

- 🔁 **Real-Time Communication**
  - Uses WebSockets for low-latency, live interaction.

- 🧠 **LLM Integration**
  - Powered by Hugging Face models (Google FLAN-T5).

- 🎯 **Interview-Oriented Prompting**
  - Answers follow interview rules: definition, explanation, example, and no repetition.

- 🎨 **Professional UI**
  - Clean, modern, dark-themed interface with clear interviewer vs AI separation.

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Web Speech API (SpeechRecognition)
- WebSocket (Client)

### Backend
- FastAPI
- WebSockets
- Python

### AI / ML
- Hugging Face Transformers
- Google FLAN-T5 (CPU-friendly)

---

## ⚙️ How It Works (Workflow)

1. User clicks **Start Interview**
2. Browser captures live speech via microphone
3. Speech is converted to text using SpeechRecognition API
4. Question is sent to backend via WebSocket
5. LLM processes the question with interview-focused prompts
6. AI generates a structured interview answer
7. Answer is returned and displayed in the UI

---

## 📁 Project Structure

