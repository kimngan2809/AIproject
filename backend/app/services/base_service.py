from abc import abstractmethod
from app.repositories.base_repository import BaseRepository
class BaseService:
    def __init__(self, model, session):
        self.model = model
        self.repository = BaseRepository(model, session)
    @abstractmethod
    def create(self, data): 
        pass 