let GetUser = async (currentUserId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${currentUserId}`);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('true');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let GetActivity = async (currentUserId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${currentUserId}/activity`);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('true');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let GetPerformance = async (currentUserId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${currentUserId}/performance`);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('true');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let GetSessions = async (currentUserId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${currentUserId}/average-sessions`);

        if (response.ok) {
            const data = await response.json();
            return data;
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