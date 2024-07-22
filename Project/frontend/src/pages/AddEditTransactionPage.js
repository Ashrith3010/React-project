import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';

function AddEditTransactionPage() {
  const { id } = useParams();

  const handleSubmit = (transactionData) => {
    // Implement add/edit logic here
    console.log(transactionData);
  };

  return (
    <div>
      <h2>{id ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <TransactionForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddEditTransactionPage;
