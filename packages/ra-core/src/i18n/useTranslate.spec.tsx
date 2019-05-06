import React from 'react';
import expect from 'expect';
import { render, cleanup } from 'react-testing-library';

import useTranslate from './useTranslate';
import { TranslationContext } from './TranslationContext';
import { TestContext } from '../util';

describe('useTranslate', () => {
    afterEach(cleanup);

    const Component = () => {
        const translate = useTranslate();
        return <div>{translate('hello')}</div>;
    };

    it('should not fail when used outside of a translation provider', () => {
        const { queryAllByText } = render(<Component />);
        expect(queryAllByText('hello')).toHaveLength(1);
    });

    it('should use the translate function set in the translation context', () => {
        const { queryAllByText } = render(
            <TranslationContext.Provider
                value={{ locale: 'de', translate: () => 'hallo' }}
            >
                <Component />
            </TranslationContext.Provider>
        );
        expect(queryAllByText('hello')).toHaveLength(0);
        expect(queryAllByText('hallo')).toHaveLength(1);
    });

    it('should use the messages set in the store', () => {
        const { queryAllByText } = render(
            <TestContext store={{ i18n: { messages: { hello: 'bonjour' } } }}>
                <Component />
            </TestContext>
        );
        expect(queryAllByText('hello')).toHaveLength(0);
        expect(queryAllByText('bonjour')).toHaveLength(1);
    });
});
