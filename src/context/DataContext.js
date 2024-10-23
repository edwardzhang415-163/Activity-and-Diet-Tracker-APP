import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [dietEntries, setDietEntries] = useState([]);

  useEffect(() => {
    // Subscribe to activities collection
    const activitiesQuery = query(collection(db, 'activities'), orderBy('date', 'desc'));
    const unsubscribeActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const activitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivities(activitiesData);
    });

    // Subscribe to diet entries collection
    const dietQuery = query(collection(db, 'diet'), orderBy('date', 'desc'));
    const unsubscribeDiet = onSnapshot(dietQuery, (snapshot) => {
      const dietData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDietEntries(dietData);
    });

    return () => {
      unsubscribeActivities();
      unsubscribeDiet();
    };
  }, []);

  const addActivity = async (activity) => {
    const isSpecial = (activity.type === 'Running' || activity.type === 'Weights') && 
                     parseInt(activity.duration) > 60;
    try {
      await addDoc(collection(db, 'activities'), {
        ...activity,
        isSpecial,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const addDietEntry = async (entry) => {
    const isSpecial = parseInt(entry.calories) > 800;
    try {
      await addDoc(collection(db, 'diet'), {
        ...entry,
        isSpecial,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding diet entry:', error);
    }
  };

  const updateActivity = async (id, activity) => {
    try {
      const docRef = doc(db, 'activities', id);
      await updateDoc(docRef, activity);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const updateDietEntry = async (id, entry) => {
    try {
      const docRef = doc(db, 'diet', id);
      await updateDoc(docRef, entry);
    } catch (error) {
      console.error('Error updating diet entry:', error);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const docRef = doc(db, 'activities', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const deleteDietEntry = async (id) => {
    try {
      const docRef = doc(db, 'diet', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting diet entry:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      activities,
      dietEntries,
      addActivity,
      addDietEntry,
      updateActivity,
      updateDietEntry,
      deleteActivity,
      deleteDietEntry
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);