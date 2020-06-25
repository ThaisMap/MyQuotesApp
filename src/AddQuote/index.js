import React, { useState } from 'react';
import { View, Text,   TextInput, Button } from 'react-native';
import firestore from "@react-native-firebase/firestore";

export default function AddQuote(){
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const ref = firestore().collection('Quotes');
    return(
        <>
            <TextInput label={'New quote'} value ={quote} onChangeText={setQuote} />
            <TextInput label={'Author'} value={author} onChangeText={setAuthor} />
            <Button onPress={() => PushTheQuote()} title={'Add a Quote'}> </Button> 
            <Text>{quote}</Text>
        </>
    );

    async function PushTheQuote(){
        await ref.add({
            Sentence: quote,
            Author: author
        });
        setQuote('');
        setAuthor('');
    }
}