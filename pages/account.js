/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Text, Flex, Spinner} from '@chakra-ui/core';
import App from '../components/App';
import AccountSettings from '../components/Forms/AccountSettings';
import {withApollo} from '../graphql/apollo';

const AccountPage = () => {
    return (
        <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
          <AccountSettings />
        </App>
    );
};

export default withApollo(AccountPage, {
    ssr: false
});
