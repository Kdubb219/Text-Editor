import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
const DB_NAME = 'jate';
  const STORE_NAME = 'jate';
  
  export const putDb = async (content) => {
    try {
      const db = await openDB(DB_NAME, 1);
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
  
      await store.add(content);
      await tx.complete;
  
      console.log('Content added to the database:', content);
    } catch (error) {
      console.error('Error adding content to the database:', error);
    }
  };
  export const getDb = async () => {
    try {
      const db = await openDB(DB_NAME, 1);
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
  
      const content = await store.getAll();
  
      console.log('Content retrieved from the database:', content);
      return content;
    } catch (error) {
      console.error('Error retrieving content from the database:', error);
      return [];
    }
  };
  
  (async () => {
    await initdb();
  })();