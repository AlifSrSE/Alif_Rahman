import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db, incrementVisitors } from './firebase';

// Subscribes to a Firestore collection. Starts with `fallback` (the static
// content) and only swaps to DB data if the collection actually has documents,
// so the site never breaks when Firestore is empty or unreachable.
function useCollectionData(name, fallback) {
  const [docs, setDocs] = useState(fallback);
  useEffect(() => {
    let unsub;
    try {
      unsub = onSnapshot(
        collection(db, name),
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            items.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
            setDocs(items);
          }
        },
        () => {
          // Permission denied / project not configured: keep the static fallback.
        }
      );
    } catch {
      // keep the static fallback on any error
    }
    return () => unsub && unsub();
  }, [name]);
  return docs;
}

export function useProjects(fallback) {
  return useCollectionData('projects', fallback);
}

export function useCerts(fallback) {
  return useCollectionData('certs', fallback);
}

export function useVisitorCount() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let active = true;
    incrementVisitors().catch(() => {});
    const unsub = onSnapshot(
      doc(db, 'stats', 'visitors'),
      (snap) => {
        if (active && snap.exists()) setCount(snap.data().count || 0);
      },
      () => {
        // Permission denied / project not configured: counter stays hidden.
      }
    );
    return () => {
      active = false;
      unsub();
    };
  }, []);
  return count;
}
