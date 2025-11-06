// src/Services/performanceService.js
import { USER_PERFORMANCE } from "@/mocks/data";

const DISPLAY_ORDER = ["intensity", "speed", "strength", "endurance", "energy", "cardio"];
const LABELS_FR = {
    cardio: "Cardio",
    energy: "Energie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
};

export async function getUserPerformance(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const rec = USER_PERFORMANCE.find((u) => u.userId === userId);
            if (!rec) return resolve([]);

            const kindById = rec.kind;
            const rows = rec.data.map((d) => {
                const key = kindById[d.kind];
                return { key, label: LABELS_FR[key], value: d.value };
            });

            const ordered = DISPLAY_ORDER
                .map((k) => rows.find((r) => r.key === k))
                .filter(Boolean);

            resolve(ordered);
        }, 0);
    });
}
