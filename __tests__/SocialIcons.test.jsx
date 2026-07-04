/**
 * SocialIcons.test.jsx — Social icon links render with accessible labels.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialIcons from '../src/ui/components/SocialIcons';
import { DEFAULT_SOCIAL_LINKS } from '../src/constants/social.constants';

describe('SocialIcons', () => {
  it('renders social platform links with aria labels', () => {
    render(<SocialIcons links={DEFAULT_SOCIAL_LINKS} />);

    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute(
      'href',
      DEFAULT_SOCIAL_LINKS.instagram
    );
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /call us at/i })).toHaveAttribute(
      'href',
      'tel:9513500270'
    );
  });
});