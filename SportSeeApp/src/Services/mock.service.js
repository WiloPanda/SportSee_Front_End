import { USER_MAIN_DATA } from "@/mocks/data";
import { USER_ACTIVITY } from "@/mocks/data";
import { USER_PERFORMANCE } from "@/mocks/data";
import { USER_AVERAGE_SESSIONS } from "@/mocks/data";

let GetUser = async (currentUserId) => {
    try {
        const response = USER_MAIN_DATA.find((u) => u.id === Number(currentUserId));
        if (response) {
            return response;
        } else {
            throw new Error('true');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let GetActivity = async (currentUserId) => {
    try {
        const response = USER_ACTIVITY.find((u) => (u.userId) === Number(currentUserId));
        if (response) {
            return response;
        } else {
            throw new Error('true');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let GetPerformance = async (currentUserId) => {
    try {
        const response = USER_PERFORMANCE.find((u) => (u.userId) === Number(currentUserId));
        if (response) {
            return response;
        } else {
            throw new Error('true');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let GetSessions = async (currentUserId) => {
    try {
        const response = USER_AVERAGE_SESSIONS.find((u) => (u.userId) === Number(currentUserId));
        if (response) {
            return response;
        } else {
            throw new Error('true');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const DataService = {
    GetUser,
    GetActivity,
    GetPerformance,
    GetSessions
}

export default DataService