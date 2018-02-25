import React from 'react';
import { Segment, Container, Button } from 'semantic-ui-react';
import { Link } from '../routes';

export default (props) => {
  return (
    <div>
      <Link route="/campaigns/new">
        <a>
          <Button
            content="Create a Campaign"
            color="black"
          />
        </a>
      </Link>
      <Link route="/campaigns/active">
        <a>
          <Button
            content="All Active Campaigns"
            color="black"
            style={{marginTop: '10px'}}
          />
        </a>
      </Link>
      <Link route="/campaigns/hot">
        <a>
          <Button
            content="Hot Campaigns"
            color="black"
            style={{marginTop: '10px'}}
          />
        </a>
      </Link>
      <Link route="/campaigns/editors">
        <a>
          <Button
            content="Editor's Picks"
            color="black"
            style={{marginTop: '10px'}}
          />
        </a>
      </Link>
      <Link route="/campaigns/brand-new">
        <a>
          <Button
            content="New Campaigns"
            color="black"
            style={{marginTop: '10px'}}
          />
        </a>
      </Link>
      <Link route="/campaigns/soon">
        <a>
          <Button
            content="Expiring Campaigns"
            color="black"
            style={{marginTop: '10px'}}
          />
        </a>
      </Link>
      <Link route="/campaigns/expired">
        <a>
          <Button
            content="Expired Campaigns"
            color="black"
            style={{marginTop: '10px'}}
          />
        </a>
      </Link>
    </div>
  )
}

