// src/app/page.tsx
'use client'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

type Post = {
  id: string
  title: string
  content: string
  created_at: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
      if (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.')
      } else {
        setPosts(data)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      {/* 상단 헤더 */}
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          {/* 로고 */}
          <div className="flex items-center space-x-2">
            <img src="/storyShop.png" alt="블로그 로고" className="h-18 w-18" />
            <span className="font-bold text-xl text-blue-600">스토리가 있는 쇼핑 연구소</span>
          </div>
          {/* 메뉴 */}
          <nav>
            <ul className="flex space-x-4 text-sm font-medium">
              <li><a href="/" className="hover:text-blue-500">홈</a></li>
              <li><a href="/about" className="hover:text-blue-500">소개</a></li>
              <li><a href="/contact" className="hover:text-blue-500">문의</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-2xl mx-auto pt-32 pb-10 px-4">
        <h1 className="text-3xl font-bold mb-6">📚 최저가 쿠팡 구매 하기</h1>
        {/* 쿠팡 관련 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href="https://link.coupang.com/a/cFAzyG"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 text-center"
          >
            쿠팡 최저가 구입 하기!
          </a>
          <a
            href="https://link.coupang.com/a/cFAAlX"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 text-center"
          >
            쿠팡 골드박스
          </a>
          <a
            href="https://link.coupang.com/a/cFAALi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow hover:scale-105 hover:from-green-500 hover:to-green-700 transition-all duration-200 text-center"
          >
            쿠팡 로켓프레시
          </a>
        </div>
        <ul className="space-y-4">
          {posts?.map((post: Post) => (
            <li key={post.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                작성일: {new Date(post.created_at).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-700 line-clamp-2">
                {post.content.slice(0, 100)}...
              </p>
            </li>
          ))}
        </ul>
      </main>

      <footer className="w-full bg-gray-50 border-t mt-8 py-4 text-center text-xs text-gray-500">
        <div>
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </div>
        <div className="mt-2 font-semibold text-gray-700">
          스토리가 있는 쇼핑 연구소
        </div>
      </footer>
    </>
  )
}
