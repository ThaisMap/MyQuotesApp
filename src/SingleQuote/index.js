import React, { useState, useEffect } from 'react';
import { View,  StyleSheet, ImageBackground } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { Headline, Caption, FAB,  Paragraph, Dialog, Portal, Button, TextInput } from 'react-native-paper';
import fundo from "../Assets/quote-wallpaper.png"

export default function SingleQuote(){ 
    const quotesRef = firestore().collection('Quotes');

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);  
    const hideDialog = () => setVisible(false);  

    const [key, setKey] = useState(''); 
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    function getRandomQuote(){
        const randomKey = quotesRef.doc().id;
         
        let randomQuote = quotesRef
        .where(firestore.FieldPath.documentId(), '>', randomKey)
        .orderBy(firestore.FieldPath.documentId())
        .limit(1)
        .get()
        .then(snapshot => {
            if(snapshot.size >0)
            { 
                snapshot.forEach(doc => { 
                        setKey(doc.id);
                    setQuote(doc._data.Sentence);
                    setAuthor(doc._data.Author);
                });
            }
            else{
                let rQuote = quotesRef
                .orderBy(firestore.FieldPath.documentId())
                .where(firestore.FieldPath.documentId(), '<', randomKey)
                .limit(4)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => { 
                        setKey(doc.id);
                        setQuote(doc._data.Sentence);
                        setAuthor(doc._data.Author);
                    });
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });         
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });  

    }

    useEffect(getRandomQuote, []);


    function editQuote(){
        const citacao = {Sentence: quote, Author: author};
        quotesRef.doc(key).set(citacao);
        hideDialog();
    }

    return( 
    <ImageBackground source={fundo} imageStyle={{opacity:0.2}} style={style.centralizado}>
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
            <TextInput label={'Quote'} mode="outlined" multiline value ={quote} onChangeText={setQuote} />
            <TextInput label={'Author'} mode="outlined" value={author} onChangeText={setAuthor} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={editQuote}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ImageBackground>
        );
}

const style = StyleSheet.create({
    centralizado:{
        flex: 1,
        justifyContent: 'center', 
        padding: 10      
    }, 
    sentence:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 30
    },
    sentenceText:{
        margin: 20,
        textAlign: 'center'
    },
    author: {
        marginTop: 30,
        marginRight: 30,
        textAlign: 'right'
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