import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllPosts} from '../store/slices/post';
import {Box, FlatList, Avatar, HStack, VStack, Text, Stack} from 'native-base';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {images} from '../data/mock-images';

export default ({navigation}) => {
  const [start, setStart] = useState(0);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchAllPosts({_start: start, _limit: 5}));
  }, [start, dispatch]);

  const openDetailView = item => {
    navigation.navigate('Post detail', item);
  };

  const Item = item => {
    const profile =
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
    return (
      <TouchableOpacity onPress={() => openDetailView({...item, profile})}>
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: 'gray.600',
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2"
          id={item.id}>
          <HStack space={3}>
            <Avatar
              size="48px"
              source={{
                uri: profile,
              }}
            />
            <Stack style={{flex: 1}}>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                bold
                isTruncated>
                {item.title}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                isTruncated
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.body}
              </Text>
            </Stack>
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <StyledFooter>
        <StyledButton activeOpacity={0.9} onPress={() => setStart(start + 5)}>
          <StyledText>Load More</StyledText>
          {posts.loading === 'pending' ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </StyledButton>
      </StyledFooter>
    );
  };

  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}>
      <StyledTitle>Posts</StyledTitle>
      <FlatList
        data={posts.entities}
        renderItem={({item}) => Item(item)}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter}
        style={{marginBottom: 50}}
      />
    </Box>
  );
};

const StyledTitle = styled.Text`
  font-size: 20px
  padding: 10px;
  text-align: center;
  color: palevioletred;
`;

const StyledFooter = styled.Text`
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
`;

const StyledText = styled.Text`
  color: white;
  font-size: 15px;
  text-align: center;
`;

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #800000;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
