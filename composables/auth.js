export const useAuth = () => {
    const user = useState('user', () => null);
    const isAuthenticated = computed(() => !!user.value);
  
    const login = (userData) => {
      user.value = userData;
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
    };
  
    const logout = () => {
      user.value = null;
      if (process.client) {
        localStorage.removeItem('user');
      }
    };
  
    const loadUser = () => {
      if (process.client) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          user.value = JSON.parse(storedUser);
        }
      }
    };
  
    return { user, isAuthenticated, login, logout, loadUser };
  };
  