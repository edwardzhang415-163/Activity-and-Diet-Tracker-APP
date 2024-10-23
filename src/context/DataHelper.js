import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../Firebase/FirebaseSetup';
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
   
    const activitiesQuery = query(collection(db, 'activities'), orderBy('date', 'desc'));
    const unsubscribeActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const activitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivities(activitiesData);
    }, (error) => {
      console.error('Error fetching activities:', error);
    });

   
    const dietQuery = query(collection(db, 'diet'), orderBy('date', 'desc'));
    const unsubscribeDiet = onSnapshot(dietQuery, (snapshot) => {
      const dietData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDietEntries(dietData);
    }, (error) => {
      console.error('Error fetching diet entries:', error);
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
      alert('Failed to add activity. Please try again.');
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
      alert('Failed to add diet entry. Please try again.');
    }
  };

  const updateActivity = async (id, activity) => {
    try {
      const docRef = doc(db, 'activities', id);
      await updateDoc(docRef, activity);
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Failed to update activity. Please try again.');
    }
  };

  const updateDietEntry = async (id, entry) => {
    try {
      const docRef = doc(db, 'diet', id);
      await updateDoc(docRef, entry);
    } catch (error) {
      console.error('Error updating diet entry:', error);
      alert('Failed to update diet entry. Please try again.');
    }
  };

  const deleteActivity = async (id) => {
    try {
      const docRef = doc(db, 'activities', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity. Please try again.');
    }
  };

  const deleteDietEntry = async (id) => {
    try {
      const docRef = doc(db, 'diet', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting diet entry:', error);
      alert('Failed to delete diet entry. Please try again.');
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