const idbPromised = idb.open('dbFootballTeam', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('team')) {
        upgradedDb.createObjectStore("team", {keyPath: "idTeam"});
    }
});

const dbGetAllTeam = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("team", `readonly`);
            return transaction.objectStore("team").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};

const dbInsertTeam = dataTeam => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("team", `readwrite`);
            transaction.objectStore("team").put(dataTeam);
			console.log('data berhasil di save');
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbDeleteTeam = idTeam => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("team", `readwrite`);
            transaction.objectStore("team").delete(idTeam);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};