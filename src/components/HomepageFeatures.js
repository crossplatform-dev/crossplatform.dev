import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Learn the options',
    link: '/docs/types',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Learn the main charactersitics of each technology so you can pick the
        one that better fits your needs.
      </>
    ),
  },
  {
    title: 'Check code snippets',
    link: '/docs/snippets',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        See how different scenarios are implemented accross diferent
        technologies.
      </>
    ),
  },
  {
    title: 'Compare them',
    link: '/docs/comparison',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        See how they compare to each other for different metrics.
      </>
    ),
  },
];

function Feature({ Svg, title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
        <a href={link}>
        {/* <div className="text--center">
          <Svg className={styles.featureSvg} alt={title} />
        </div> */}
        </a>
        <div className="text--center padding-horiz--md">
          <h3><a href={link}>{title}</a></h3>
          <p>{description}</p>
        </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
