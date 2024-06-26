const URLDictionary = {
  mock: {
    getPurchaseDataURL: () => `./purchaseData.json`
  },
  default: {
    getPurchaseDataURL: () => `/api/purchaseData`
  }
};

export default URLDictionary;
