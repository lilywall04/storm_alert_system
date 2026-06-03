def get_alert_color(event: str | None, severity: str | None) -> str:
    event = event or ""
    severity = severity or ""

    if "Tornado Warning" in event:
        return "red"

    if "Severe Thunderstorm Warning" in event:
        return "orange"

    if "Flash Flood Warning" in event:
        return "green"

    if "Winter Storm Warning" in event:
        return "purple"

    if "Heat Advisory" in event or "Excessive Heat" in event:
        return "pink"

    if severity == "Extreme":
        return "red"

    if severity == "Severe":
        return "orange"

    if severity == "Moderate":
        return "yellow"

    if severity == "Minor":
        return "blue"

    return "gray"


def explain_alert(event: str | None, instruction: str | None) -> str:
    event = event or ""

    if "Tornado Warning" in event:
        return (
            "A tornado warning means a tornado has been observed or indicated by radar. "
            "Take shelter immediately in a basement or an interior room away from windows."
        )

    if "Tornado Watch" in event:
        return (
            "A tornado watch means conditions are favorable for tornadoes. "
            "Stay weather-aware and be ready to take shelter if a warning is issued."
        )

    if "Severe Thunderstorm Warning" in event:
        return (
            "A severe thunderstorm warning means a dangerous storm is happening or expected soon. "
            "Move indoors, stay away from windows, and watch for damaging wind or hail."
        )

    if "Severe Thunderstorm Watch" in event:
        return (
            "A severe thunderstorm watch means conditions are favorable for severe storms. "
            "Keep checking radar and be ready to move indoors if a warning is issued."
        )

    if "Flash Flood Warning" in event:
        return (
            "A flash flood warning means flooding is happening or expected soon. "
            "Do not drive through flooded roads and move to higher ground if needed."
        )

    if "Flood Watch" in event:
        return (
            "A flood watch means flooding is possible. "
            "Monitor conditions and be prepared to change travel plans."
        )

    if "Winter Storm Warning" in event:
        return (
            "A winter storm warning means dangerous winter weather is happening or expected soon. "
            "Avoid unnecessary travel and prepare for snow, ice, or hazardous road conditions."
        )

    if "Heat Advisory" in event or "Excessive Heat" in event:
        return (
            "A heat alert means dangerous heat is possible or happening. "
            "Drink water, avoid long periods outside, and check on people who may be vulnerable."
        )

    if instruction:
        return (
            "This is an official weather alert. Read the instructions carefully and follow local guidance."
        )

    return (
        "This is an official weather alert. Stay aware of changing conditions and follow guidance from the National Weather Service."
    )