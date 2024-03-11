import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ExpensesContext } from '../store/expenses-context'
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";

export default function ManageExpense({ route, navigation }) {
  const { deleteExpense, addExpense, updateExpense } = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId
  const { setOptions, goBack } = navigation;

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

  const confirmHandler = () => {
    if (isEditing) {
      updateExpense(editedExpenseId, { date: new Date(), description: 'so cool', amount: 22.22 })
    } else {
      addExpense({ date: new Date(), description: 'so cool', amount: 22.22 })
    }
    goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={cancelHandler}
        >
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={confirmHandler}
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
})