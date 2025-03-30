import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Toast } from "../common/Alert";

export const README = () => {
  const [readmeContent, setReadmeContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/github?path=README.md`
        );

        if (!response.ok) throw new Error(await response.json());

        setReadmeContent((await response.json()).content);
      } catch (error) {
        console.error("無法獲取 README.md:", error);
        Toast.fire({
          icon: "error",
          text: "載入 README.md 失敗，請稍後再試。",
        });
      }
    }

    fetchData();
  }, []);

  return readmeContent ? (
    <div
      style={{
        textAlign: "justify",
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {readmeContent!}
      </ReactMarkdown>
    </div>
  ) : (
    <>加載中</>
  );
};
