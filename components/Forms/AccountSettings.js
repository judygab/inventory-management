/** @jsx jsx */
import {jsx} from '@emotion/core';
import {
  Text,
  Flex,
  Spinner,
  Heading,
  Box,
  Button,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/core"

import React, {useState, useRef} from 'react';
import {useAuth} from '../../utils/auth';
import {useSearch} from '../../utils/search';
import {withApollo} from '../../graphql/apollo';

const AccountSettings = () => {
    const {userId} = useAuth();

    return (
      <form>
        <Stack spacing={4}>
          <Stack spacing={8} direction="row">
            <FormControl id="first-name" p={2} flex="1">
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" value="John"/>
            </FormControl>
            <FormControl id="last-name" p={2} flex="1">
              <FormLabel>Last name</FormLabel>
              <Input placeholder="First name" value="Doe"/>
            </FormControl>
          </Stack>
          <FormControl w="50%" id="phone" p={2} flex="1">
            {/*<InputGroup>*/}
              <FormLabel>Phone Number</FormLabel>
              {/*<InputLeftAddon children="+1" />*/}
              <Input type="phone" borderLeftRadius="0" placeholder="phone number" />
            {/*</InputGroup>*/}
          </FormControl>
          <FormControl w="50%" id="email" p={2} flex="1">
            <FormLabel>Email</FormLabel>
            <Input placeholder="test@test.gmail.com" value="test@test@gmail.com"/>
          </FormControl>
        </Stack>
      </form>
    );
};

export default AccountSettings;
