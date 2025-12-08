import React from 'react';
import {useDocusaurusContext} from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

export default function LocaleServiceNavbarItem(props) {
  const {i18n} = useDocusaurusContext();
  const locale = i18n?.currentLocale || 'en';
  const href = `https://caret.team/${locale}`;

  return (
    <a
      className={clsx('navbar__item', 'navbar__link', props.className)}
      href={href}
      target="_self"
      rel="noreferrer">
      {props.label}
    </a>
  );
}
