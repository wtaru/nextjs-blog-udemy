import Head from "next/head";
import Link from "next/link";

export default function FirstPost() {
    return (
        <div>
            <Head>
                <title>最初の投稿</title>
            </Head>
            <h1>最初の投稿</h1>
            <Link href="/">ページに戻る</Link>
            {/* aタグ： ページ遷移時にリロードする*/}
            {/* Linkタグ：　リロードしない為、高速化 */}
        </div>
    );
}