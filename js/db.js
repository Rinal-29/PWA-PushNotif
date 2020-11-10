let dbPromised = idb.open("football-app", 1, function (upgradeDb) {
    let matchObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    matchObjectStore.createIndex("title_team", "title_team", {
        unique: false
    });
});

function saveForLater(teams) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            console.log("teams", teams);
            store.add(teams);
            return tx.complete;
        })
        .then(function () {
            console.log("berhasil disimpan");
        })
}

function deleteTeam(teams) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.delete(teams.id);
            return tx.complete;
        }).then(function () {
            console.log("item dihapus");
        })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
                console.log("mengambil semua data dari db");
            });
    });
}