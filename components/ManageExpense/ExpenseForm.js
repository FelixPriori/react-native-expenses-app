import { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import Input from "./Input"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import { GlobalStyles } from "../../constants/styles"

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    }
  })

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  function onInputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true,
      }
    }))
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => ({
        amount: {
          value: currentInputs.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: currentInputs.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: currentInputs.description.value,
          isValid: descriptionIsValid,
        }
      }))
      return
    }

    onSubmit(expenseData)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            onChangeText: onInputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
            keyboardType: 'decimal-pad',
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            onChangeText: onInputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: onInputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
          multiline: true,
          // autoCorrect: false,
          // autoCapitalize: 'none',
        }}
      />
      {formIsInvalid && <Text style={styles.errorMessage}>Invalid input values - Please check your entered data!</Text>}
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={submitHandler}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary100,
    textAlign: 'center',
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
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
  errorMessage: {
    color: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.error50,
    textAlign: 'center',
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 16,
    borderRadius: 6,
  }
})