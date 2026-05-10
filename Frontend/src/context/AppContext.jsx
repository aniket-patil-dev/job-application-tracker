import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return
    }
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("/auth/me", { headers }).then((r) => r.json()),
      fetch("/applications/", { headers }).then((r) => r.json()),
    ])
      .then(([userData, applicationData]) => {
        setUser(userData);
        setApplications(applicationData);
      })
      .catch(() => {
        localStorage.removeItem('access_token')
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, applications, setApplications, isLoading, token }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
    return useContext(AppContext)
}