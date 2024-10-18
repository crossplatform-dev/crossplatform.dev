import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

import RecommendationWizard from '../components/RecommendationWizard';

function RecommendationHeader({ title, description }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{description}</p>
      </div>
    </header>
  );
}

export default function Recommendation() {
  const { siteConfig } = useDocusaurusContext();
  const title = `Get recommendations for your next cross-platform project`;
  const description = `Site still in beta!`;
  return (
    <Layout title={title} description={description}>
      <RecommendationHeader
        title="Crossplatform recommendation engine"
        description="Need help deciding what crossplatform technologies you should
            investigate for your next development?"
      />
      <main>
        <RecommendationWizard />
      </main>
    </Layout>
  );
}
