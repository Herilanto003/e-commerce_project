import React, { useContext, useState } from "react";

const RefreshCartNumberContext = React.createContext<{
  refresh: boolean;
  toggleRefresh: () => void;
}>({ refresh: false, toggleRefresh: () => {} });

const RefreshCartNumberProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <RefreshCartNumberContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </RefreshCartNumberContext.Provider>
  );
};

const useRefreshCartNumber = () => {
  return useContext(RefreshCartNumberContext);
};

export { RefreshCartNumberProvider, useRefreshCartNumber };
