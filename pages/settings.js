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
} from "@chakra-ui/core"

import React, {useState, useRef} from 'react';
import {useAuth} from '../utils/auth';
import {useSearch} from '../utils/search';
import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import DealCard from '../components/DealCard';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import EmptySearch from '../components/EmptySearch';
import ColumnHeader from '../components/Table/ColumnHeader';

const SettingsPage = () => {
    const {userId} = useAuth();

    const MenuItem = ({ title, desc, ...rest }) => {
      return (
        <Box p={5} shadow="md" borderWidth="1px" {...rest}>
        <button>
          <Heading textAlign="left" fontSize="xl">{title}</Heading>
          <Text mt={4}>{desc}</Text>
          </button>
        </Box>
      )
    }

    return (
      <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
        <Stack spacing={8}>
          <MenuItem
            title="Account"
            desc="Manage your account and permissions"
          />
          <MenuItem
            title="General"
            desc="View and update your store details"
          />
        </Stack>
      </App>
    );
};

export default withApollo(SettingsPage, {
    ssr: false
});
