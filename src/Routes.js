import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import QuotesList from './Screens/QuotesList';
import AddQuote from './Screens/AddQuote';
import SingleQuote from './Screens/SingleQuote';

const BottomNavigationTab = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'add', title: 'Add', icon: 'bookmark-plus'},
        {key: 'list', title: 'List', icon: 'bookmark-multiple'},
        {key: 'random', title: 'Random', icon: 'format-quote-close'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        add: AddQuote,
        list: QuotesList,
        random: SingleQuote,
    });

    return (
        <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default BottomNavigationTab;
