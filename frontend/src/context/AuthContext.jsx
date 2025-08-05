import React, { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/user/${storedUser.email}`,
            {
              headers: {
                Authorization: `Bearer ${storedUser.token}`,
              },
            }
          );

          if (response.ok) {
            const updatedUser = await response.json();
            localStorage.setItem("user", JSON.stringify(updatedUser)); // Update local storage
            dispatch({ type: "LOGIN", payload: updatedUser }); // Update context
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
