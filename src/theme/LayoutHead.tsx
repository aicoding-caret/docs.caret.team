import React from 'react';
import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OriginalLayoutHead from '@theme-original/LayoutHead';
import type LayoutHeadType from '@theme/LayoutHead';

const localeImageMap: Record<string, string> = {
  ko: '/og/ogtag-ko.webp',
  ja: '/og/ogtag-ja.webp',
  zh: '/og/ogtag-zh.webp',
};

const fallbackImage = '/og/ogtag-en.webp';

function pickImage(pathname: string): string {
  const trimmed = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const localePrefix = trimmed.split('/')[0];
  return localeImageMap[localePrefix] ?? fallbackImage;
}

const LayoutHead: LayoutHeadType = (props) => {
  const {siteConfig} = useDocusaurusContext();
  const {pathname} = useLocation();

  const imagePath = pickImage(pathname);
  const siteUrl = siteConfig.url?.replace(/\/$/, '');
  const imageUrl =
    imagePath.startsWith('http') || !siteUrl
      ? imagePath
      : `${siteUrl}${imagePath}`;

  return (
    <>
      <OriginalLayoutHead {...props} />
      <Head>
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
    </>
  );
};

export default LayoutHead;
