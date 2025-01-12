import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>Welcome, Guest!</h1>
          <button onClick={loginWithRedirect}>Login</button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
