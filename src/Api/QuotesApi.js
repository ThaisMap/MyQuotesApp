import React from 'react';
import firestore from "@react-native-firebase/firestore";

const quotesRef = firestore().collection('Quotes');

export function InsertQuote(quote){
    quotesRef.add(quote)
    .catch((error) =>  console.log(error));
}

export function EditQuote(quote, key){ 
    quotesRef.doc(key).set(quote); 
}

export async function GetQuotesList(quotesRetrieved){
    quotesRef.onSnapshot((snap) => {
        const quotes = [ ];
        
        snap.forEach(doc => { 
            quotes.push({
                ...doc._data, 
                key: doc.id,
            });
        });    
        quotesRetrieved(quotes);
    }); 
}

export function GetRandomQuote(quoteRetrieved){
    const randomKey = quotesRef.doc().id;    
    let returnQuote = {};
    
    quotesRef
    .where(firestore.FieldPath.documentId(), '>', randomKey)
    .orderBy(firestore.FieldPath.documentId())
    .limit(1)
    .get()
    .then(snapshot => {
        if(snapshot.size >0)
        { 
            snapshot.forEach(doc => { 
                returnQuote = {
                    key: doc.id,
                    Sentence: doc._data.Sentence,
                    Author: doc._data.Author
                };
            });
        }
        else{
            quotesRef
            .orderBy(firestore.FieldPath.documentId())
            .where(firestore.FieldPath.documentId(), '<', randomKey)
            .limit(4)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => { 
                    returnQuote = {
                        key: doc.id,
                        Sentence: doc._data.Sentence,
                        Author: doc._data.Author
                    };
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });         
        }
        console.log(`returnQuote= ${returnQuote}`);
        quoteRetrieved(returnQuote);
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });  
}