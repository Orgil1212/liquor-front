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
<<<<<<< HEAD
  
=======
  
  // 📌 `utils/auth.js`
export function getUserRole() {
  if (typeof window !== "undefined") { // SSR-с сэргийлэх
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // JWT payload унших
      return decoded.role || null;
    } catch (error) {
      console.error("Invalid JWT:", error);
      return null;
    }
  }
  return null;
}
>>>>>>> e167b9c (update)
