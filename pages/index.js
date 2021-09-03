import {Box, Flex, Heading, Text, Button} from '@chakra-ui/core';
import NextLink from 'next/link';

import {withSignInRedirect} from '../components/Auth';
import Logo from '../components/Logo';
import ContactUs from '../components/ContactUs';

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

const Header = ({onSignIn}) => (
    <Box as="header" width="full" height="4rem">
        <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
            <Flex size="100%" p={[0, 6]} pl={[0, 4]} align="center" justify="space-between">
                <Box as="a" d="block" href="/" aria-label="daydrink, Back to homepage">
                    <Logo w="100px" />
                </Box>
                <Flex align="center">
                    <Button onClick={onSignIn} variant="ghost">
                        {'Sign In'}
                    </Button>
                    <NextLink href="/deals" passHref>
                        <Button as="a">{'Request a Demo'}</Button>
                    </NextLink>
                </Flex>
            </Flex>
        </Box>
    </Box>
);

const HomePage = ({onSignIn}) => {
    return (
      <>
        <Box h="100vh">
            <Header onSignIn={onSignIn} />
            <Box as="section" pt={40} pb={24}>
                <Container>
                    <Box maxW="xl" mx="auto" textAlign="center">
                        <Heading as="h1" size="xl" fontWeight="black">
                          Inventory management made easy
                        </Heading>

                        <Text opacity="0.7" fontSize="lg" mt="6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Text>

                        <Box mt="6">
                            <NextLink href="/contactus" passHref>
                                <Button size="lg" as="a" variantColor="teal">
                                    Get Started
                                </Button>
                            </NextLink>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
        <ContactUs />
        </>
    );
};

export default withSignInRedirect(HomePage);
