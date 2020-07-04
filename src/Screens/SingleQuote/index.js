import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {
    Headline,
    Caption,
    FAB,
    Dialog,
    Portal,
    Button,
    TextInput,
} from 'react-native-paper';
import fundo from '../../Assets/quote-wallpaper.png';
import {EditQuote, GetRandomQuote} from '../../Api/QuotesApi';

export default function SingleQuote() {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [key, setKey] = useState('');
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    onQuoteReceived = randomQuote => {
        setKey(randomQuote.key);
        setQuote(randomQuote.Sentence);
        setAuthor(randomQuote.Author);
    };

    useEffect(() => {
        getRandomQuote();
    }, []);

    function getRandomQuote() {
        GetRandomQuote(onQuoteReceived);
    }

    function Save() {
        const citacao = {Sentence: quote, Author: author};
        EditQuote(citacao, key);
        hideDialog();
    }

    return (
        <ImageBackground
            source={fundo}
            imageStyle={{opacity: 0.2}}
            style={style.centralizado}>
            <View style={style.sentence}>
                <Headline style={style.sentenceText}> {quote} </Headline>
            </View>
            <Caption style={style.author}> {author} </Caption>
            <FAB
                style={style.fab}
                small
                icon="refresh"
                onPress={getRandomQuote}
            />
            <FAB
                style={style.fabEdit}
                small
                icon="pencil"
                onPress={showDialog}
            />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Edit quote</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label={'Quote'}
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
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={Save}>Save</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ImageBackground>
    );
}

const style = StyleSheet.create({
    centralizado: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    sentence: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    sentenceText: {
        margin: 20,
        textAlign: 'center',
    },
    author: {
        marginTop: 30,
        marginRight: 30,
        textAlign: 'right',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fabEdit: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 56,
    },
});
