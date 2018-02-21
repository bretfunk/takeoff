import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu
      inverted
      style={{ marginTop: '10px' }}
    >
      <Link route="/">
        <a className="item">
          Takeoff
        </a>
      </Link>

      <Menu.Menu position="right">
      <Link route="/about">
        <a className="item">
          About
        </a>
      </Link>
      <Link route="/">
        <a className="item">
          All Campaigns
        </a>
      </Link>
      <Link route="/campaigns/new">
        <a className="item">
          +
        </a>
      </Link>
    </Menu.Menu>
    </Menu>
    )
    }
