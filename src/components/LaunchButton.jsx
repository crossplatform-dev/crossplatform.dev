//@ts-check

/**
 * Original file licensed under MIT in
 * https://github.com/electron/electronjs.org-new/blob/85c00545413ca5101955c0cf51f64150ae06e6e4/src/components/LaunchButton.jsx
 */

import React from 'react';

function LaunchButton({ url }) {
  return (
    <a
      target="_blank"
      className="button button--block button--lg button--primary"
      href={url}
    >
      Open in Fiddle
    </a>
  );
}

export default LaunchButton;