import React from "react";
import { Transaction } from "../types";
import { COLORS } from "../theme/colors";

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => (
  <div className="space-y-3">
    {transactions.length === 0 ? (
      <p style={{ color: COLORS.secondaryText }} className="italic text-center">
        No transactions yet
      </p>
    ) : (
      transactions.map((t, i) => (
        <div
          key={i}
          className="p-4 rounded-xl shadow-md flex justify-between items-center transition hover:scale-[1.01]"
          style={{
            backgroundColor: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.primaryText,
          }}
        >
          {/* Left side: type + category */}
          <div>
            <p
              className="font-semibold"
              style={{
                color:
                  t.type === "Income" ? COLORS.secondaryAccent : COLORS.primaryAccent,
              }}
            >
              {t.type}
            </p>
            <p style={{ color: COLORS.secondaryText, fontSize: "0.9rem" }}>
              {t.categoryName}
            </p>
          </div>

          {/* Center: description if exists */}
          {t.description && (
            <p className="flex-1 text-center italic" style={{ color: COLORS.secondaryText }}>
              {t.description}
            </p>
          )}

          {/* Right side: amount + date */}
          <div className="text-right">
            <p className="font-bold">
              {t.type === "Income" ? "+" : "-"}₹{t.amount}
            </p>
            <p style={{ color: COLORS.secondaryText, fontSize: "0.85rem" }}>
              {t.date}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
);

export default TransactionList;
