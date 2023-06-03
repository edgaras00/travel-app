import React, { useState } from "react";

const AppContext = React.createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isFormModalOpen,
        openFormModal,
        closeFormModal,
        token,
        setToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
