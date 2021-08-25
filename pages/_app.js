import {Global, css} from '@emotion/core';
import {ColorModeProvider, CSSReset, ThemeProvider} from '@chakra-ui/core';
// import {DefaultSeo} from 'next-seo';
import React from 'react';
import seo from '../seo.config';
import {ProvideAuth} from '../utils/auth';
import {ProvideSearch} from '../utils/search';
import 'tailwindcss/tailwind.css';

export default ({Component, pageProps}) => (
    <ProvideAuth>
        <ThemeProvider>
            <ColorModeProvider value="dark">
                <CSSReset />
                <Global
                    styles={css`
                        #__next {
                            height: 100%;
                        }
                    `}
                />
                <ProvideSearch>
                    <Component {...pageProps} />
                </ProvideSearch>
            </ColorModeProvider>
        </ThemeProvider>
    </ProvideAuth>
);
