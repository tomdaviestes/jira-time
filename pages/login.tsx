import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const LoginForm = dynamic(() => import('@components/LoginForm'), { ssr: false })

const Login: NextPage = () => {
  return (
    <div>
      <Head><title>Jira Time - Log In</title></Head>
      <div className="w-full h-full flex flex-col justify-center p-8">
        <h1 className="text-center font-bold text-5xl mb-8">Jira Time</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
