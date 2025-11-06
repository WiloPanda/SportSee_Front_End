/**
 * Configuration de l'API
 * @constant {string} API_BASE_URL - URL de base de l'API
 */
const API_BASE_URL = 'http://localhost:3000';

/**
 * Mode de développement : utilise les données mockées si true, sinon appelle l'API réelle
 * @constant {boolean}
 */
const USE_MOCK_DATA = false; // Passez à true pour utiliser les mocks

/**
 * Fonction générique pour effectuer des requêtes HTTP
 * @async
 * @param {string} endpoint - Point de terminaison de l'API
 * @returns {Promise<Object>} Les données récupérées depuis l'API
 * @throws {Error} Si la requête échoue
 */
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data; // L'API retourne { data: {...} }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données: ${endpoint}`, error);
        throw error;
    }
}

export { fetchAPI, USE_MOCK_DATA };