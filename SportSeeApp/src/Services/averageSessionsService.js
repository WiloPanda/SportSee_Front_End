import { USER_AVERAGE_SESSIONS } from "@/mocks/data";

export async function getUserAverageSessions(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const rec = USER_AVERAGE_SESSIONS.find(u => u.userId === userId);
            resolve(rec ? rec.sessions : []);
        }, 0);
    });
}
