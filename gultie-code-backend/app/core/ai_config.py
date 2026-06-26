from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    GEMINI_API_KEY: str
    SECRET_KEY: str
    DB_PASSWORD: str

    class Config:
        env_file = ".env"
        extra = "forbid"


settings = Settings()