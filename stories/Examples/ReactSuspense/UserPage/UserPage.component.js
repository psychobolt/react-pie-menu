import './styles.css';
import React, { Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { fetchContributors } from './api/index.js';
import Details from './Details/index.js';
import Spinner, { SIZES } from './Spinner/index.js';
import * as styles from './UserPage.style.js';

const UserDetailsResource = createResource(fetchContributors);

const Container = styled.div` ${styles.container} `;

const Repositories = React.lazy(() => import('./Repositories/index.js'));

const Contributors = () => {
  const users = UserDetailsResource.read();
  if (process.env.NODE_ENV === 'development') {
    console.log('Storybook DEVELOPMENT mode enabled'); // eslint-disable-line no-console
  }
  return users.map(user => (
    <Container key={user.name}>
      <Details image={user.image} name={user.name} />
      <Suspense fallback={<Spinner size={SIZES.Medium} />}>
        <Repositories id={user.name} />
      </Suspense>
    </Container>
  ));
};

export default () => (
  <Suspense fallback={<Spinner size={SIZES.Large} />}>
    <Contributors />
  </Suspense>
);
