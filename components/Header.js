import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu
      inverted
      style={{ marginTop: '10px' }}
    >
      <Link route="/">
        <a className="item" style={{fontSize:'15px'}}>
          Takeoff
        </a>
      </Link>
      <Icon
        name="rocket"
        size="large"
        color = "red"
        inverted
        bordered
        fitted
      />
      <Link route="/about">
        <a className="item">
          About
        </a>
      </Link>
      <Menu.Menu position="right">
      <Link route="/campaigns/new">
        <Icon
          link
          inverted
          name="plus"
          size="large"
          bordered
        />
      </Link>
      <Link route="/campaigns/active">
        <Icon
          link
          inverted
          name="search"
          size="large"
          bordered
        />
      </Link>
      <Link route="/campaigns/hot">
        <Icon
          link
          inverted
          name="fire"
          size="large"
          bordered
        />
      </Link>
      <Link route="/campaigns/editors">
        <Icon
          link
          inverted
          name="thumbs up"
          size="large"
          bordered
        />
      </Link>
      <Link route="/campaigns/brand-new">
        <Icon
          link
          inverted
          name="hourglass full"
          size="large"
          bordered
        />
      </Link>
      <Link route="/campaigns/soon">
        <Icon
          link
          inverted
          name="hourglass half"
          size="large"
          bordered
        />
      </Link>
      <Link route="/campaigns/expired">
        <Icon
          link
          inverted
          name="hourglass empty"
          size="large"
          bordered
        />
      </Link>
    </Menu.Menu>
    </Menu>
    )
    }
