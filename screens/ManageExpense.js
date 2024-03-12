import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { ExpensesContext } from '../store/expenses-context'
import { GlobalStyles } from "../constants/styles";
import {
  storeExpense,
  updateExpense as httpUpdateExpense,
  deleteExpense as httpDeleteExpense
} from "../util/http";

export default function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { deleteExpense, addExpense, updateExpense, expenses } = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId
  const { setOptions, goBack } = navigation;

  const selectedExpense = expenses.find(expense => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [setOptions, isEditing])

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      await httpDeleteExpense(editedExpenseId);
      deleteExpense(editedExpenseId);
      goBack();
    } catch (error) {
      setError('Could not delete expense.');
    }
    setIsLoading(false);
  }

  const cancelHandler = () => {
    goBack();
  }

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    if (isEditing) {
      try {
        await httpUpdateExpense(editedExpenseId, { ...expenseData });
        updateExpense(editedExpenseId, { ...expenseData });
        goBack();
      } catch (error) {
        setError('Could not update expense.');
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        addExpense({ id, ...expenseData });
        goBack();
      } catch (error) {
        setError('Could not add expense.');
      }
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteHandler} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
})