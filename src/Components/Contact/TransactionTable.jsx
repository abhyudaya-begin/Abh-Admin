// src/components/AdminPanel/TransactionTable.jsx
import React from 'react';
import { calculateAmount } from './transactionsUtils';

const TransactionTable = ({ transactions, onMarkPaid, onDeleteTrxn }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-md border border-gray-700">
      {transactions.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Txn ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ABH ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Events</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Decline</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {transactions.map((txn) => (
              <tr key={txn.trxnId} className="hover:bg-gray-700">
                <td className="px-4 py-3 text-sm font-medium text-gray-200">{txn.trxnId}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{txn.ABH_ID}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-200">
                  ₹{calculateAmount(txn).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-200">{txn.fullName}</td>
                <td className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">{txn.email}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{txn.phoneNumber}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    txn.status === "Paid" 
                      ? "bg-green-900 text-green-200" 
                      : "bg-yellow-900 text-yellow-200"
                  }`}>
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  <div className="max-w-xs overflow-x-auto whitespace-nowrap pb-1">
                    {txn.events && txn.events.map((e, i) => (
                      <span key={i} className="mr-1 px-2 py-1 bg-gray-700 text-xs rounded-full">
                        {e.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      txn.status === "Pending"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-600 text-gray-200 cursor-not-allowed opacity-50"
                    } transition-colors`}
                    onClick={() => txn.status === "Pending" && onMarkPaid(txn.trxnId, txn.ABH_ID)}
                    disabled={txn.status === "Paid"}
                  >
                    {txn.status === "Pending" ? "Mark Paid" : "✓ Paid"}
                  </button>
                </td>

                <td className="px-4 py-3 text-sm">
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      txn.status === "Pending"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gray-600 text-gray-200 cursor-not-allowed opacity-50"
                    } transition-colors`}
                    onClick={() => txn.status === "Pending" && onDeleteTrxn(txn.trxnId, txn.ABH_ID)}
                    disabled={txn.status === "-"}
                  >
                    {txn.status === "Pending" ? "Decline" : "-"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No transactions found.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;