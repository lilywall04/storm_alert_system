from fastapi import APIRouter, HTTPException, Query
import httpx

from app.models.alert import AlertResponse
from app.services.nws_service import get_active_alerts_by_point


router = APIRouter(prefix="/api/alerts", tags=["alerts"])


@router.get("", response_model=list[AlertResponse])
async def get_alerts(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
):
    try:
        return await get_active_alerts_by_point(lat, lon)
    except httpx.HTTPStatusError as error:
        raise HTTPException(
            status_code=error.response.status_code,
            detail=f"NWS API returned an error: {error.response.text}",
        )
    except httpx.RequestError as error:
        raise HTTPException(
            status_code=503,
            detail=f"Could not connect to the NWS API: {str(error)}",
        )