import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7)
    return (expense.date >= date7DaysAgo) && (expense.date <= today)
  })

  return (
    <>
      <ExpensesOutput
        expenses={recentExpenses}
        periodName="Last 7 days"
        fallbackText="No expenses registered in the last 7 days."
      />
    </>
  )
}