import type { NextPage } from 'next';
import dynamic from 'next/dynamic'
import Head from 'next/head';

const LogTimeForm = dynamic(() => import('@components/LogTimeForm'), { ssr: false });
const WorklogTotals = dynamic(() => import('@components/WorklogTotals'), { ssr: false });

const Index: NextPage = () => {
  return (
    <div className="">
      <Head><title>Jira Time</title></Head>

      <div className="w-full h-full flex flex-col justify-center p-8">
        <WorklogTotals />

        <LogTimeForm />
        {/* <div className="p-4 mb-8 rounded-md bg-base-200">
        </div> */}

        <div className="flex flex-row justify-center">
          <a href="/logout" className="link link-primary">Log Out</a>
        </div>
      </div>
    </div>
  )
}

export default Index;
