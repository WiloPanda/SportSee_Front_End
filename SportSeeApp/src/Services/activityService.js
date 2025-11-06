import { USER_ACTIVITY } from "@/mocks/data";

export async function getUserActivity(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const rec = USER_ACTIVITY.find((u) => u.userId === userId);
            resolve(rec ? rec.sessions : []);
        });
    });
}