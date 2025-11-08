import Image from "next/image";
import { supabase } from '../lib/supabaseClient'

export default async function Home() {
  const { data: todos, error } = await supabase.from('todos').select('*')

  if (error) {
    console.error('Error fetching todos:', error)
    return <div>⚠️ データ取得エラー</div>
  }
  
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

        <ul className="flex flex-wrap gap-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
            >
              <span className="font-medium">{todo.id},</span>
              <span className="font-medium">{todo.title},</span>
              <span>{todo.is_done ? 'true' : 'false'}</span>
            </li>
          ))}
        </ul>

      </main>
    </div>
  );
}
