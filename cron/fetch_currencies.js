import admin from "firebase-admin";
import { CollectionReference, Firestore, QuerySnapshot } from "firebase-admin/firestore";

admin.initializeApp({
  credential: admin.credential.cert("./cert.json"),
});

const synchCurrencies = async (tableName) => {
  const db = admin.firestore();
  const colRef = db.collection(`table_${tableName}`);

  const tableA = await fetch(`https://api.nbp.pl/api/exchangerates/tables/${tableName}/`, {
    method: "GET",
    headers: { Accept: "application/json" },
  }).then((res) => res.json());

  const date = tableA[0].effectiveDate;
  const rates = tableA[0].rates;

  // ADD NEW ENTRIES IF NOT ALREADY IN DB
  const querySnapshot = await colRef.where("date", "==", date).limit(1).get();
  if (!querySnapshot.empty) {
    console.log(`Currencies from table ${tableName} are up to date (${date})`);
  } else {
    console.log(`Attempting to add currencies to table ${tableName}...`);
    const addCount = await addDocs(db, colRef, rates, date);
    console.log(`Added ${addCount} documents to table ${tableName} on ${date}`);
  }

  // DELETE ENTRIES THAT ARE OVER 1 MONTH OLD
  const oneMonthAgo = new Date(date);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const deleteSnapshot = await colRef.where("date", "<=", oneMonthAgo.toISOString()).get();
  if (!deleteSnapshot.empty) {
    console.log(`Attempting to delete entries over one month old from table ${tableName}...`);
    const deleteCount = await deleteDocs(db, deleteSnapshot);
    console.log(`Deleted ${deleteCount} documents from table ${tableName} on ${date}`);
  }
};

/**
 * @param {Firestore} db
 * @param {CollectionReference} colRef
 * @param {Object[]} rates
 * @param {string} date
 * @returns {number} amount of added docs
 */
const addDocs = async (db, colRef, rates, date) => {
  const batch = db.batch();
  let count = 0;
  rates.forEach((rate) => {
    const toSave = { ...rate, date };
    const ref = colRef.doc();
    batch.set(ref, toSave);
    count++;
  });
  await batch.commit();
  return count;
};

/**
 * @param {Firestore} db
 * @param {QuerySnapshot} snapshot
 * @returns {number} amount of deleted docs
 */
const deleteDocs = async (db, snapshot) => {
  const batch = db.batch();
  let count = 0;
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
    count++;
  });
  await batch.commit();
  return count;
};

synchCurrencies("A");
