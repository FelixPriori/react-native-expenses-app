import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({ item }) {
  return (
    <ExpenseItem {...item} />
  )
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(({ id }) => id)}
      renderItem={renderExpenseItem}
    />
  )
}

const styles = StyleSheet.create({

})
