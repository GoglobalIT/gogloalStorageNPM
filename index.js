class GoglobalStoreage {
    constructor() {
        this.url = `http://localhost:3200/client`;
    }
    async createClient(_id, keyAccess) {
        let route = `/login`
        let url = this.url + route;
        const body = { _id, keyAccess };

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    localStorage.setItem('storageIid', _id);
                    localStorage.setItem('KeyAccess', keyAccess);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    async upload(storage, folder, file, oldfile) {
        let _id = localStorage.getItem('storageIid');
        let keyAccess = localStorage.getItem('KeyAccess',);
        let route = `/upload-new-file`
        let url = this.url + route;
        if (!file && _id.length > 0 && keyAccess.length > 0) return;
        const formData = new FormData();

        formData.append("file", file);
        formData.append("storage", storage)
        formData.append("folder", folder)
        formData.append("oldfile", oldfile)
        formData.append("_id", _id)
        formData.append("keyAccess", keyAccess)

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })


        return response.json();
    }
    async delete(storage, folder, file) {
        let _id = localStorage.getItem('storageIid');
        let keyAccess = localStorage.getItem('KeyAccess');
        let route = `/delete-file`;
        let url = this.url + route;
        const body = { _id, keyAccess, storage, folder, file };

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    async logout() {
        localStorage.removeItem('storageIid');
        localStorage.removeItem('KeyAccess');
    }
}
module.exports.GoglobalStoreage = GoglobalStoreage;

// create client (userid, keyaccsee)
// endpoind login
// save to local storage

// upload-file
// get uid key from local storage

// delete-file
// get uid key from local storage
// logout clear local storage