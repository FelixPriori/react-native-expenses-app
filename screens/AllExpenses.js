import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export default function AllExpenses() {
  const { expenses } = useContext(ExpensesContext);
  return (
    <>
      <ExpensesOutput
        expenses={expenses}
        periodName="Total"
        fallbackText="No registered expenses found."
      />
    </>
  )
}