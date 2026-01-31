import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./cert.json"),
});

const fetchCurrencies = async (tableName) => {
  const db = admin.firestore();
  const colRef = db.collection(`table_${tableName}`);

  const tableA = await fetch(`https://api.nbp.pl/api/exchangerates/tables/${tableName}/`, {
    method: "GET",
    headers: { Accept: "application/json" },
  }).then((res) => res.json());

  const date = tableA[0].effectiveDate;
  const rates = tableA[0].rates;

  const querySnapshot = await colRef.where("date", "==", date).limit(1).get();

  if (!querySnapshot.empty) {
    console.log(`Currencies from table ${tableName} are up to date (${date})`);
    return;
  }

  rates.forEach((rate) => {
    const toSave = { ...rate, date };
    colRef.add(toSave);
  });

  console.log(`Currencies from table ${tableName} updated (${date})`);
};

fetchCurrencies("A");
