// Utility functions for tracking route completion

const COMPLETION_KEY = 'kasajizo_completed_routes';

export const getCompletedRoutes = () => {
  try {
    const stored = localStorage.getItem(COMPLETION_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading completion data:', error);
    return [];
  }
};

export const markRouteComplete = (routeId) => {
  try {
    const completed = getCompletedRoutes();
    if (!completed.includes(routeId)) {
      completed.push(routeId);
      localStorage.setItem(COMPLETION_KEY, JSON.stringify(completed));
    }
  } catch (error) {
    console.error('Error saving completion data:', error);
  }
};

export const isRouteCompleted = (routeId) => {
  return getCompletedRoutes().includes(routeId);
};

export const clearCompletionData = () => {
  try {
    localStorage.removeItem(COMPLETION_KEY);
  } catch (error) {
    console.error('Error clearing completion data:', error);
  }
};

// Route definitions with their character info
export const ROUTES = {
  common: {
    id: 'common',
    name: 'おじいさん',
    character: '👴',
    path: '/common',
    color: '#8B4513'
  },
  route1_1: {
    id: 'route1_1', 
    name: 'アンバー',
    character: '🐱',
    path: '/route1/sub1',
    color: '#FF8C00'
  },
  route1_2: {
    id: 'route1_2',
    name: 'ねこの村',
    character: '🏘️',
    path: '/route1/sub2', 
    color: '#D0BFFF'
  },
  route2_1: {
    id: 'route2_1',
    name: '電話',
    character: '📞',
    path: '/route2/sub1',
    color: '#B8B8FF'
  },
  route2_2: {
    id: 'route2_2',
    name: '魔法',
    character: '🪄',
    path: '/route2/sub2',
    color: '#D291BC'
  }
}; 