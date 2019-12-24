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
			//var save = document.getElementById("saveFave");
			//save.style.display = "none";
			//document.querySelector('#ShowButton').value = 'Hide';
			document.querySelector('#faveButton').innerText = "Delete Favorite";
			console.log("data save!");
			window.Materialize.toast('Data Saved!', 2000);
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
			document.querySelector('#faveButton').innerText = "Save Favorite";
			console.log("data delete!");
			window.Materialize.toast('Data Deleted!', 2000);
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

const checkID = idTeam => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("team", `readwrite`);
			console.log("id team nya: "+ idTeam);
			//var objectStore = transaction.objectStore(idTeam);
			var cek;
			var getRequest = transaction.objectStore("team").get(idTeam);
				getRequest.onsuccess = () => {
				  let result = getRequest.result
				  if (result) {
					console.log("found:", result)
				  } else {
					console.log("not found")
				  }
				}
			//var countRequest = objectStore("team").count(idTeam);
			//console.log("count nya: "+ countRequest);
			//document.querySelector('#faveButton').innerText = "Save Favorite";
			//console.log("data delete!");
			//window.Materialize.toast('Data Deleted!', 2000);
			console.log("cek :" +cek);
            return getRequest;
        }).then(transaction => {
           
        })
    })
};
