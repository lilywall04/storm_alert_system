import httpx

from app.models.alert import AlertResponse
from app.services.alert_explainer import explain_alert, get_alert_color


NWS_BASE_URL = "https://api.weather.gov"

HEADERS = {
"User-Agent": "StormSignal/1.0, contact: lilywallace@example.com",    "Accept": "application/geo+json",
}


async def get_active_alerts_by_point(lat: float, lon: float) -> list[AlertResponse]:
    url = f"{NWS_BASE_URL}/alerts/active"

    params = {
        "point": f"{lat},{lon}"
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(url, params=params, headers=HEADERS)
        response.raise_for_status()
        data = response.json()

    alerts = []

    for feature in data.get("features", []):
        properties = feature.get("properties", {})

        event = properties.get("event")
        instruction = properties.get("instruction")
        severity = properties.get("severity")

        alerts.append(
            AlertResponse(
                id=properties.get("id", ""),
                event=event or "Unknown Alert",
                headline=properties.get("headline"),
                description=properties.get("description"),
                instruction=instruction,
                severity=severity,
                urgency=properties.get("urgency"),
                certainty=properties.get("certainty"),
                area_desc=properties.get("areaDesc"),
                effective=properties.get("effective"),
                expires=properties.get("expires"),
                status=properties.get("status"),
                message_type=properties.get("messageType"),
                plain_english=explain_alert(event, instruction),
                color=get_alert_color(event, severity),
            )
        )

    return alerts