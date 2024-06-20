import logger from "../logger";
import URLDictionary from "./URLDictionary"

const PurchaseDataService = (env = 'default') => {
    return fetch(URLDictionary[env].getPurchaseDataURL())
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                logger.error(res.statusText);
                throw new Error(res.statusText)
            }
        })
        .catch(error => {
            logger.error(error);
            throw error
        })
}

export default PurchaseDataService;