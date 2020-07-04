import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {InsertQuote} from '../../Api/QuotesApi';

export default function AddQuote() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    async function PushTheQuote() {
        if (quote.length > 1) {
            const citacao = {Sentence: quote, Author: author};
            InsertQuote(citacao);

            setQuote('');
            setAuthor('');
        }
    }

    return (
        <View style={styles.button}>
            <TextInput
                label={'New quote'}
                mode="outlined"
                multiline
                value={quote}
                onChangeText={setQuote}
            />
            <TextInput
                label={'Author'}
                mode="outlined"
                value={author}
                onChangeText={setAuthor}
            />
            <Button
                style={styles.button}
                mode="contained"
                onPress={() => PushTheQuote()}>
                Add a Quote
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 15,
    },
});
