import React from 'react';

import { LuMountain, LuUsers } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';

import { Nav, NavGroup, NavItem } from '@/components/Nav';

export const BoulderNav = () => {
  const { pathname } = useLocation();
  const isActive = (to: string) => pathname?.startsWith(to);
  return (
    <Nav>
      <NavGroup title="Boulder">
        <NavItem
          as={Link}
          to="/boulders"
          isActive={isActive('/boulders')}
          icon={LuMountain}
        >
          Boulder
        </NavItem>
        <NavItem
          as={Link}
          to="/boulders/ranking"
          isActive={isActive('/boulders/ranking')}
          icon={LuUsers}
        >
          Ranking
        </NavItem>
      </NavGroup>
    </Nav>
  );
};
