from fastapi import FastAPI, WebSocket
from transformers import pipeline
import json

app = FastAPI()

# ✅ Better model (still CPU safe)
llm = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",
    device=-1
)

@app.websocket("/ws/live-interview")
async def live_interview(ws: WebSocket):
    await ws.accept()
    print("✅ WebSocket connected")

    try:
        while True:
            question = await ws.receive_text()
            print("🎤 Question:", question)

            # ✅ STRONG INTERVIEW PROMPT
            prompt = f"""
You are a senior software engineer taking interviews.

Rules:
- Give a COMPLETE and clear definition
- Answer in professional interview style
- 4 to 6 lines only
- No repetition
- Include one real-world example
- Do NOT repeat the question
- Do NOT give one-line answers

Question:
{question}

Answer:
"""

            result = llm(
                prompt,
                max_new_tokens=250,
                temperature=0.2,
                repetition_penalty=1.4,
                no_repeat_ngram_size=3
            )

            answer = result[0]["generated_text"].strip()

            print("🤖 Answer:", answer)

            await ws.send_text(json.dumps({
                "type": "answer",
                "answer": answer
            }))

    except Exception as e:
        print("❌ WebSocket error:", e)
        await ws.close()
