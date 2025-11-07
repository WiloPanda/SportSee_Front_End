import { fetchAPI, USE_MOCK_DATA } from './api';
import { USER_MAIN_DATA } from '@/mocks/data';

function standardizeUserData(data) {
  return {
    ...data,
    // Normalise todayScore et score en un seul champ
    todayScore: data.todayScore ?? data.score ?? 0
  };
}

export async function getUserData(userId) {
  if (USE_MOCK_DATA) {
    // Mode mock : simulation d'un appel asynchrone
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = USER_MAIN_DATA.find((u) => u.id === userId);
        resolve(user ? standardizeUserData(user) : null);
      }, 100);
    });
  }
}