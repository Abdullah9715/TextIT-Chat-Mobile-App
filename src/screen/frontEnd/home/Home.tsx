import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, FlatList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import firestore from '@react-native-firebase/firestore';
import {HomeStyles} from './HomeStyling';
import UserInfo from '../../../components/userInfo/UserInfo';
import {HEADERICON} from '../../../constants/assets/AllImages';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';
interface UserData {
  photoURL: string;
  id: string;
  imageUrl: string;
  username: string;
  status: string;
  timeAgo: string;
  description: string;
}
export default function Home() {
  const user = auth().currentUser || undefined;
  const [usersData, setUsersData] = useState<UserData[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('users').get();
        const usersData = usersSnapshot.docs.map(doc => doc.data() as UserData);
        setUsersData(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <LinearGradient
      style={HeaderStyles.mainContainer}
      colors={['#000', '#43116A']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={HeaderStyles.container}>
        <View style={HeaderStyles.topbar}>
          <TouchableOpacity
            style={HeaderStyles.iconContainer}
            onPress={() => {
              // Handle search icon press
            }}>
            <HEADERICON.search />
          </TouchableOpacity>
          <Text style={HeaderStyles.screenName}>Home</Text>
          {user?.photoURL ? (
            <Image
              source={{uri: user?.photoURL || undefined}}
              style={HeaderStyles.profilePhoto}
            />
          ) : (
            <View style={HeaderStyles.alternatePhoto}></View>
          )}
        </View>
      </View>

      <View style={HeaderStyles.main}>
        <SafeAreaView style={HomeStyles.textContainer1}>
          <SwipeListView
            data={usersData}
            renderItem={({item}) => (
              <UserInfo
                profileImage={item.photoURL}
                displayName={item.username}
                status={item.status}
                lastActive={item.timeAgo}
              />
            )}
            renderHiddenItem={() => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  justifyContent: 'flex-end',
                  marginHorizontal: 10,
                  padding: 7,
                }}>
                <Text style={{color: 'black'}}>Delete</Text>
                <Text style={{color: 'black'}}>Notify</Text>
              </View>
            )}
            rightOpenValue={-105}
          />
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}
