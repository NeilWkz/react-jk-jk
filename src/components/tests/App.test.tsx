import * as React from 'react';
import App from '../App'
import { render} from '@testing-library/react';


test('The document must have an h1', () => {

  const {getByText} = render(
    <App />,
  );

  expect(getByText('Hello world')).toBeTruthy();

});
