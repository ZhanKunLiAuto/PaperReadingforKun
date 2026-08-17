import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paper Reading for Kun",
  description: "论文阅读心得、机制图解、代码记录与个人评论的长期知识库。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
