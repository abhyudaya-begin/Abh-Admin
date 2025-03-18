// src/utils/transactionUtils.js

// Calculate total amount for a transaction based on event prices
export const calculateAmount = (transaction) => {
    if (!transaction.events || !Array.isArray(transaction.events)) {
      return 0;
    }
    
    return transaction.events.reduce((total, event) => {
      return total + (event.price || 0);
    }, 0);
  };