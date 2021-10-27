/** @jsx jsx */
import {useColorMode, Box} from '@chakra-ui/core';
import {jsx} from '@emotion/core';

const Logo = (props) => {
    const {colorMode} = useColorMode();

    return (
      <div className="logo max-w-3/4">
        <img src='/images/logo.png' />
      </div>
    );
};

export default Logo;
