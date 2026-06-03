export type Alert = {
  id: string;
  event: string;
  headline?: string | null;
  description?: string | null;
  instruction?: string | null;
  severity?: string | null;
  urgency?: string | null;
  certainty?: string | null;
  area_desc?: string | null;
  effective?: string | null;
  expires?: string | null;
  status?: string | null;
  message_type?: string | null;
  plain_english: string;
  color: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function getAlertsByPoint(
  lat: number,
  lon: number
): Promise<Alert[]> {
  const response = await fetch(`${API_BASE_URL}/api/alerts?lat=${lat}&lon=${lon}`);

  if (!response.ok) {
    throw new Error("Failed to fetch alerts.");
  }

  return response.json();
}