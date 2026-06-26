from pydantic import BaseModel


class LeaderboardEntry(BaseModel):
    user_id: int
    username: str
    total_points: int
    rank: int