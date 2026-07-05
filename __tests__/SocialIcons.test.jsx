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

  it('can hide phone and email when includeContact is false', () => {
    render(<SocialIcons links={DEFAULT_SOCIAL_LINKS} includeContact={false} />);

    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /call us at/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /email us at/i })).not.toBeInTheDocument();
  });

  it('renders phone and email before social icons when contactFirst is true', () => {
    render(<SocialIcons links={DEFAULT_SOCIAL_LINKS} contactFirst />);

    const links = screen.getAllByRole('link');
    const labels = links.map((link) => link.getAttribute('aria-label'));

    expect(labels[0]).toMatch(/call us at/i);
    expect(labels[1]).toMatch(/email us at/i);
    expect(labels[2]).toMatch(/instagram/i);
  });
});