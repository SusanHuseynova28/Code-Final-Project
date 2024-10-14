import React from 'react';
import Header from '../header';

import { LayoutProps } from '@/.next/types/app/layout';

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer />
    </>
  );
}