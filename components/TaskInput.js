import { StyleSheet, View, TextInput, } from 'react-native';

function TaskInput(props) {
    return (
    <View style={styles.inputContainer}>
        <TextInput 
        style={styles.inputLine}
        placeholder='Type New Task'
        onChangeText={props.onChangeText}
        value={props.enteredText} 
        />  
    </View> 
  
    )
};

export default TaskInput;

const styles = StyleSheet.create({
    inputLine: {
        height: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 25,
      },
    
});