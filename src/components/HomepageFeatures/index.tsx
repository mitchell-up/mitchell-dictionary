import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import dicionaryIcon from '@site/static/img/dictionary.png';
import translationIcon from '@site/static/img/translation.png';
import blogIcon from '@site/static/img/blog.png';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  src?: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '용어사전',
    src: dicionaryIcon,
    description: (
      <>
        프로그래밍, 소프트웨어 개발에서 사용되는 전문 용어들의 의미를 이해하고 정리합니다.
      </>
    ),
  },
  {
    title: '문서번역',
    src: translationIcon,
    description: (
      <>
        번역본이 없는 공식문서들, 개발과 관련된 해외 아티클들을 한글로 번역합니다.
      </>
    ),
  },
  {
    title: '기술 블로그',
    src: blogIcon,
    description: (
      <>
        기술과 관련된 분석, 생각 등을 정리하고, 트러블슈팅이나 실무 사용사례들을 공유합니다.
      </>
    ),
  },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];

function Feature({title, Svg, src, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? <Svg className={styles.featureSvg} role="img" /> : <img className={styles.featureSvg} src={src} alt={title}/> }
        
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container text--center">
        <div className="row" style={{ justifyContent: 'center' }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
