import {
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import User from '../../components/contactUserInfo/ContactUserInfo';
import {styles} from './contactStyle';

import {HEADERICON} from '../../constants/assets/allImages';
import {HeaderStyles} from '../../styles/headerStyling';
import {StackNavigationProp} from '@react-navigation/stack';
import {ContactStackParamsList, UserData} from '../../constants/types/types';
import useContact from './useContact';
import Loader from '../../components/loader/Loader';

interface navigationProps {
  navigation: StackNavigationProp<ContactStackParamsList, 'CONTACTPAGE'> & {
    navigate(screen: string, params: {userDetails: UserData}): void;
  };
}
export default function Contact({navigation}: navigationProps) {
  const {users, loading} = useContact();
  return (
    <>
      <ImageBackground
        style={HeaderStyles.mainContainer}
        source={require('../../assets/images/a0b7afd36c9b9128fdc5ae0e32bdfd6c.png')}>
        <View style={HeaderStyles.container}>
          <View style={HeaderStyles.topbar}>
            <TouchableOpacity
              style={HeaderStyles.iconContainer}
              onPress={() => {
                navigation.navigate('SEARCH');
              }}>
              <HEADERICON.search style={HeaderStyles.imageSearch} />
            </TouchableOpacity>
            <Text style={HeaderStyles.screenName}>Contact</Text>

            <View style={HeaderStyles.image}>
              <HEADERICON.AddUser />
            </View>
          </View>
        </View>

        <ScrollView style={HeaderStyles.main}>
          <View style={styles.nouch}></View>
          <Text style={styles.TextHeading}>My Contact</Text>
          {loading ? (
            <Loader />
          ) : (
            <View>
              {Object.entries(users).map(([letter, users]) => (
                <View key={letter} style={styles.LettersView}>
                  <Text style={styles.LetterText}>{letter}</Text>
                  {users.map((user, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        navigation.navigate('CHATSCREEN', {
                          userDetails: user as UserData,
                        });
                      }}>
                      <User
                        key={index}
                        photoURL={user.photoURL}
                        username={user.username}
                        status={user.status}
                      />
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
}
