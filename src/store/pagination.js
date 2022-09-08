import { createContext, useState, useContext, useEffect } from "react";

const PaginationContext = createContext({});

export const PaginationProvider = ({ children }) => {
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    let pageNumber;

    setPagination((prevPagination) => ({
      ...prevPagination,
      pageNumber,
    }));
  }, []);

  return (
    <PaginationContext.Provider value={{ pagination, setPagination }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  return useContext(PaginationContext);
};
