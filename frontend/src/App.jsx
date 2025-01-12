import { useState, useEffect } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Button from "./components/Button";
import Header from "./components/Header";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/", {
          credentials: "include", // Include cookies for session authentication
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set the user data
        } else {
          setUser(null); // No authenticated user
        }
      } catch (error) {
        console.error("Error fetching user", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Handle Login (redirect to Auth0 login endpoint)
  const handleLogin = () => {
    window.location.href = "/login/auth0"; // Redirect to Django Auth0 login
  };

  // Handle Logout (redirect to logout endpoint)
  const handleLogout = () => {
    window.location.href = "/logout"; // Redirect to Django logout
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        {/* <Header /> */}
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;

/* 
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">CODECLASH</h1>
    </>
  );
} */
