import React from 'react';
import {Box, Avatar, VStack, Text, Stack, View} from 'native-base';
import styled from 'styled-components/native';

export default ({route, navigation}) => {
  const {title, body, profile} = route.params;

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Box
        shadow="2"
        rounded="lg"
        m="2"
        p="2"
        w={{base: '95%', md: '80', lg: 'md'}}
        _light={{bg: 'coolGray.50'}}
        _dark={{bg: 'gray.700'}}>
        <Stack space={3}>
          <View style={{alignItems: 'center'}}>
            <Avatar
              size="48px"
              source={{
                uri: profile,
              }}
            />
          </View>
          <VStack>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              textAlign="center"
              bold>
              {title}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              {body}
            </Text>
          </VStack>
        </Stack>
      </Box>
      <StyledButton onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </StyledButton>
    </View>
  );
};

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 30%;
`;
