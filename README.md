# SportSee - Dashboard Utilisateur

Application React de suivi d'activité sportive pour SportSee, permettant aux utilisateurs de visualiser leurs performances, sessions d'entraînement et statistiques nutritionnelles.

## 📋 Prérequis

- Node.js (version 12.18 ou supérieure)
- npm ou yarn
- Le backend SportSee doit être lancé sur le port 3000

## 🚀 Installation

1. Clonez le repository
```bash
git clone [votre-repo]
cd sportsee-frontend
```

2. Installez les dépendances
```bash
npm install
# ou
yarn install
```

3. Lancez l'application en mode développement
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:5173` (ou le port configuré par Vite)

## 🔧 Configuration

### Mode Mock vs API réelle

Dans le fichier `src/Services/api.js`, vous pouvez basculer entre les données mockées et l'API réelle :

```javascript
const USE_MOCK_DATA = false; // true = utilise les mocks, false = utilise l'API
```

**Mode développement (mocks)** :
- Utile pour développer sans dépendre du backend
- Données situées dans `src/mocks/data.js`
- Pas besoin de lancer le backend

**Mode production (API)** :
- Nécessite le backend lancé sur `http://localhost:3000`
- Utilisateurs disponibles : ID 12 (Karl) et ID 18 (Cecilia)

## 🎨 Technologies utilisées

- **React 18** - Framework frontend
- **React Router** - Navigation
- **Recharts** - Bibliothèque de graphiques
- **SCSS** - Préprocesseur CSS
- **Vite** - Build tool

## 📊 Graphiques et visualisations

Le dashboard contient 4 types de graphiques :

1. **Activité quotidienne** (BarChart) - Poids et calories brûlées
2. **Durée moyenne des sessions** (LineChart) - Sessions par jour de la semaine
3. **Performance** (RadarChart) - 6 catégories (cardio, énergie, endurance, etc.)
4. **Score objectif** (RadialBarChart) - Pourcentage d'objectif atteint

## 🔌 API Endpoints

L'application consomme 4 endpoints :

- `GET /user/:id` - Informations principales de l'utilisateur
- `GET /user/:id/activity` - Activité quotidienne
- `GET /user/:id/average-sessions` - Sessions moyennes par jour
- `GET /user/:id/performance` - Données de performance

### Standardisation des données

Les services incluent une standardisation des données pour gérer les différences de schéma entre utilisateurs :

```javascript
// Exemple : gestion de todayScore vs score
const rawScore = user.todayScore ?? user.score ?? 0;
```

## 📱 Responsive

Le site est optimisé pour les écrans desktop :
- **Minimum** : 1024 x 780 pixels
- **Optimal** : 1440 x 1024 pixels
- **Tablette** : Adapté jusqu'à 780px
- Mobile : Non supporté dans cette version

## 🧪 Données de test

Deux utilisateurs sont disponibles pour les tests :

- **Karl** (ID: 12) - 31 ans
- **Cecilia** (ID: 18) - 34 ans

Accès direct via :
- `http://localhost:5173/user/12`
- `http://localhost:5173/user/18`

## 📝 Documentation du code

Le code est documenté avec JSDoc. Exemples :

```javascript
/**
 * Récupère les données principales d'un utilisateur
 * @async
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Object>} Les données de l'utilisateur
 */
export async function getUserData(userId) { ... }
```

## 🐛 Gestion des erreurs

- Les services retournent `null` ou `[]` en cas d'erreur
- Les erreurs sont loggées dans la console
- Messages d'erreur explicites pour le debugging