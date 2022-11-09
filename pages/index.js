import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from './compoments/Layout'
import utilStyle from '../styles/utils.module.css'
import {getPostsData} from '../lib/post'

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    }
  }
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // compomentに渡すためのprops
//     }
//   }
// }


export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyle.headingMd}>私は駆け出しのエンジニアです/JavascriptやPythonを主に扱っています</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝私の学習済コンテンツ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} 
                className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} >
                {/* <a className={utilStyle.boldText}> */}
                  {title}
                {/* </a> */}
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>

    </Layout>
  )
}
