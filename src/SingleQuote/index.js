import React, { useState, useEffect } from 'react';
import { View,  StyleSheet, ImageBackground } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { Headline, Caption, FAB } from 'react-native-paper';
import fundo from "../Assets/quote-wallpaper.png"

export default function Sample(){
    const [quote, setQuote] = useState('Random quote');
    const [Author, setAuthor] = useState('Random Author');

    function getRandomQuote(){
        const quotes = firestore().collection('Quotes');
        const key = quotes.doc().id;
         
        let randomQuote = quotes
        .where(firestore.FieldPath.documentId(), '>', key)
        .orderBy(firestore.FieldPath.documentId())
        .limit(1)
        .get()
        .then(snapshot => {
            if(snapshot.size >0)
            {
                snapshot.forEach(doc => {
                    setQuote(doc._data.Sentence);
                    setAuthor(doc._data.Author);
                });
            }
            else{
                let rQuote = quotes
                .where(firestore.FieldPath.documentId(), '<', key)
                .orderBy(firestore.FieldPath.documentId())
                .limit(4)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
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

    useEffect(  getRandomQuote, []);

    return( 
    <ImageBackground imageRef={fundo} style={style.centralizado}>
        <View style={style.sentence}> 
            <Headline style={style.sentenceText}> {quote} </Headline> 
        </View>
        <Caption style={style.author}> {Author} </Caption>
        <FAB 
        style={style.fab}
        small
        icon="refresh"
        onPress={getRandomQuote}
        />
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
});