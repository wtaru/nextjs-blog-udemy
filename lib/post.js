import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
    // 全てのファイル名を配列で返す
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        // ファイル名(id)を取り出す
        const id = fileName.replace(/\.md$/, "");

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        const matterResult = matter(fileContents);

        // idとデータを返す
        return {
            id,
            ...matterResult.data, // title, date, thumbnail が格納されている
        }
    })

    return allPostsData;
}

// getStaticPathでreturnで使用するpathを取得
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        }
    })
}

// idに基づいてブログ投稿データを返す
export async function getPastData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContent);
    const blogContent = 
        await remark()
        .use(html)
        .process(matterResult.content)
    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data
    }
}