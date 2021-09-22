import {useColorMode, Stack, Text, Box, Flex} from '@chakra-ui/core';
import React from 'react';

import {ComponentLink} from './NavLink';
import AddItemModal from './AddItemModal';
import Deal from '../icons/Deal';
import Filters from './Filters';
import Home from '../icons/Home';
import Map from '../icons/Map';
import WineGlass from '../icons/WineGlass';
import { CogIcon } from '@heroicons/react/solid';

const SideNavLink = ({href, children, icon}) => (
    <ComponentLink href={href}>
        <Flex align="center" p={1}>
            <Box as={icon} mr={3} w="24px" />
            <Text fontWeight="bold">{children}</Text>
        </Flex>
    </ComponentLink>
);

const PageLinks = () => (
    <Stack spacing={0} mb={8}>
        <SideNavLink href="/" icon={Home}>
            {'Home'}
        </SideNavLink>
        <SideNavLink href="/items" icon={WineGlass}>
            {'Items'}
        </SideNavLink>
        <SideNavLink href="/deals" icon={Deal}>
            {'Deals'}
        </SideNavLink>
        <SideNavLink href="/settings" icon={CogIcon}>
            {'Settings'}
        </SideNavLink>
    </Stack>
);

const SideNav = (props) => {
    const {colorMode} = useColorMode();

    return (
        <Box
            backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
            position="fixed"
            left="0"
            width="100%"
            height="100%"
            top="0"
            right="0"
            {...props}
        >
            <Box top="4rem" position="relative" overflowY="auto" borderRightWidth="1px">
                <Box>
                    <Flex justify="space-between" direction="column" height="calc(100vh - 4rem)" fontSize="sm" p="6">
                        <PageLinks />
                        <AddItemModal />
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default SideNav;
