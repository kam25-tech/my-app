"use client";

import Image from "next/image";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

type Url = {
  id: number;
  title: string;
  url: string;
  created_at: string;
};

export default function Home() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("recommend_url").select("*");
    if (error) {
      console.error(error);
      alert("データ取得に失敗しました");
    } else {
      setUrls(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Hello world and kam.
          </h1>
        </div>

        <button
          onClick={fetchTodos}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "読み込み中..." : "データ取得"}
        </button>

        <div className="mt-8 w-full max-w-3xl">
          {urls.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 text-center bg-white shadow rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">title</th>
                  <th className="border border-gray-300 px-4 py-2">
                    created_date
                  </th>
                </tr>
              </thead>
              <tbody>
                {urls.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{t.id}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition-colors"
                      >
                        {t.title}
                      </a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(t.created_at).toLocaleString("ja-JP")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 mt-4">まだデータがありません💤</p>
          )}
        </div>
      </main>
    </div>
  );
}
