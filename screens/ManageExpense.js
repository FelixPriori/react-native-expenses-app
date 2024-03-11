import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ExpensesContext } from '../store/expenses-context'
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";

export default function ManageExpense({ route, navigation }) {
  const { deleteExpense, addExpense, updateExpense, expenses } = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId
  const { setOptions, goBack } = navigation;

  const selectedExpense = expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [setOptions, isEditing])

  const deleteHandler = () => {
    deleteExpense(editedExpenseId);
    goBack();
  }

  const cancelHandler = () => {
    goBack();
  }

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      updateExpense(editedExpenseId, { ...expenseData })
    } else {
      addExpense({ ...expenseData })
    }
    goBack();
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