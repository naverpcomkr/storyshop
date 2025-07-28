// src/app/layout.tsx
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>스토리가 있는 쇼핑 연구소</title>
      </Head>
      {children}
    </div>
  );
}