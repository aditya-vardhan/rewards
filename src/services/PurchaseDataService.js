import URLDictionary from "./URLDictionary"

const PurchaseDataService = (env = 'default') => {
    return fetch(URLDictionary[env].getPurchaseDataURL())
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error(res.statusText)
            }
        })
        .catch(error => {
            throw error
        })
}

export default PurchaseDataService;