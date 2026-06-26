import json
from fastapi import HTTPException
from google import genai

from app.core.ai_config import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)

def generate_roadmap(
    domain: str,
    current_knowledge: str,
    hours_per_day: int,
    duration_weeks: int,
    goal: str
):

    prompt = f"""
You are an expert learning mentor.

Create a detailed roadmap.

Domain:
{domain}

Current Knowledge:
{current_knowledge}

Hours Per Day:
{hours_per_day}

Duration:
{duration_weeks} weeks

Goal:
{goal}

Rules:

1. Make roadmap realistic.
2. Beginner friendly if needed.
3. Include practical projects.
4. Include checkpoints.
5. Return EXACT JSON only.

Format:

{{
    "weeks":[
        {{
            "week":1,
            "title":"",
            "description":"",
            "checkpoint":""
        }}
    ]
}}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = (
            text
            .replace(
                "```json",
                ""
            )
            .replace(
                "```",
                ""
            )
            .strip()
        )

    try:

        return json.loads(text)

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="AI returned invalid roadmap format"
        )