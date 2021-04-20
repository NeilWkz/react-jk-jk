import * as React from 'react';
import App from '../App'
import { render} from '@testing-library/react';


test('The document must have an heading', () => {

  const { getByRole} = render(
    <App />,
  );

  expect(getByRole('heading')).toBeTruthy();

});
