import React, { useState } from 'react';
import { View,  StyleSheet,  } from 'react-native';
import { TextInput,  Button } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";

export default function AddQuote(){
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const ref = firestore().collection('Quotes');
    return(
        <View>
            <TextInput label={'New quote'} mode="outlined" multiline value ={quote} onChangeText={setQuote} />
            <TextInput label={'Author'} mode="outlined" value={author} onChangeText={setAuthor} />
            <Button style={styles.button} mode="contained" onPress={() => PushTheQuote()}>Add a Quote</Button>             
        </View>
    );

    async function PushTheQuote(){
        if( quote.length > 1)
        {
            await ref.add({
                Sentence: quote,
                Author: author
            });
        
            setQuote('');
            setAuthor('');
        }
    }
}

const styles = StyleSheet.create({
    button:{
        margin:30
    }
});