import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const LoginForm = dynamic(() => import('@components/LoginForm'), { ssr: false })

const Login: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-base-100">
      <Head><title>Jira Time - Log In</title></Head>
      <LoginForm />
    </div>
  )
}

export default Login
