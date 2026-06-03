from pydantic import BaseModel
from typing import Optional

class AlertResponse(BaseModel):
    id: str
    event: str
    headline: Optional[str] = None
    description: Optional[str] = None
    instruction: Optional[str] = None
    severity: Optional[str] = None
    urgency: Optional[str] = None
    certainty: Optional[str] = None
    area_desc: Optional[str] = None
    effective: Optional[str] = None
    expires: Optional[str] = None
    status: Optional[str] = None
    message_type: Optional[str] = None
    plain_english: str
    color: str