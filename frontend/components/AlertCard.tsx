import type { Alert } from "@/lib/api";

type AlertCardProps = {
    alert: Alert;
};

const colorClasses: Record<string, string> = {
    red: "border-red-500 bg-red-50 text-red-950",
    orange: "border-orange-500 bg-orange-50 text-orange-950",
    yellow: "border-yellow-500 bg-yellow-50 text-yellow-950",
    green: "border-green-500 bg-green-50 text-green-950",
    purple: "border-purple-500 bg-purple-50 text-purple-950",
    pink: "border-pink-500 bg-pink-50 text-pink-950",
    blue: "border-blue-500 bg-blue-50 text-blue-950",
    gray: "border-gray-500 bg-gray-50 text-gray-950",
};

export function AlertCard({ alert}: AlertCardProps){
    const cardClass = colorClasses[alert.color] ?? colorClasses.gray;
    
    return (
        <article className={`rounded-xl border-l-8 p-5 shadow-sm ${cardClass}`}>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold uppercase tracking-wide">
                    {alert.severity ?? "Unknown severity"} ·{" "}
                    {alert.urgency ?? "Unknown urgency"}
                </p>
                <h2 className="text-xl font-bold">{alert.event}</h2>

                {alert.area_desc && (
                    <p className="text-sm">
                        <span className="font-semibold">Area:</span> {alert.area_desc}
                    </p>
                )}
            </div>
            
            {alert.headline && <p className="mt-4 font-medium">{alert.headline}</p>}

            <div className="mt-4 rounded-lg bg-white/70 p-4">
                <h3 className="font-semibold">Plain English</h3>
                <p className="mt-1 text-sm leading-6">{alert.plain_english}</p>
            </div>

            {alert.instruction && (
                <details className="mt-4">
                    <summary className="cursor-pointer font-semibold">
                        Official Instructions
                    </summary>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6">
                        {alert.instruction}
                    </p>
                </details>
            )}
            </article>
    );
}