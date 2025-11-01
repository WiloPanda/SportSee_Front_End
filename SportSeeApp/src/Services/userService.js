import { USER_MAIN_DATA } from "@/mocks/data";

export async function getUserData(userId) {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = USER_MAIN_DATA.find((u) => u.id === userId);
      resolve(user);
    });
  });
}
