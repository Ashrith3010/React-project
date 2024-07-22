import React from 'react';

function IncomeList({ incomes }) {
  return (
    <div>
      <h3>Income List</h3>
      <ul>
        {incomes.map(income => (
          <li key={income.id}>{income.description}: ${income.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeList;
