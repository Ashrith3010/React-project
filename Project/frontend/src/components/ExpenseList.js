import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div>
      <h3>Expense List</h3>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>{expense.description}: ${expense.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;