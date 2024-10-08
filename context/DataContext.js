import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [dietEntries, setDietEntries] = useState([]);

  const addActivity = (activity) => {
    const isSpecial = 
      (activity.type === 'Running' || activity.type === 'Weights') && 
      activity.duration > 60;
    
    setActivities(prev => [...prev, {
      ...activity,
      id: Date.now().toString(),
      isSpecial
    }]);
  };

  const addDietEntry = (entry) => {
    const isSpecial = entry.calories > 800;
    
    setDietEntries(prev => [...prev, {
      ...entry,
      id: Date.now().toString(),
      isSpecial
    }]);
  };

  return (
    <DataContext.Provider 
      value={{
        activities,
        dietEntries,
        addActivity,
        addDietEntry
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);