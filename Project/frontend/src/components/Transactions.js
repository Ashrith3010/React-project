import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './styles/Transactions.css';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      amount
      type
      category
      date
    }
  }
`;

function Transactions() {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>
      <ul className="transaction-list">
        {data.transactions.map((transaction) => (
          <li key={transaction.id} className={`transaction-item ${transaction.type}`}>
            <span className="transaction-category">{transaction.category}</span>
            <span className="transaction-amount">${transaction.amount}</span>
            <span className="transaction-date">{transaction.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
