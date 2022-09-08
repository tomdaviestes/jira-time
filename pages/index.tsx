import type { GetServerSidePropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic'
import Head from 'next/head';
import { getTotalTimeSpentForRange } from '@utils/clockwork';
import formatDuration from '@utils/format-duration';

const LogTimeForm = dynamic(() => import('@components/LogTimeForm'), { ssr: false });

const Index: NextPage<{
  timeLoggedLastMonth: string,
  timeLoggedCurrentMonth: string,
}> = ({ timeLoggedLastMonth, timeLoggedCurrentMonth }) => {
  return (
    <div className="w-screen h-screen bg-base-100">
      <Head><title>Jira Time</title></Head>

      <div className="w-full h-full flex flex-col justify-center p-8">
        <div className="flex flex-row flex-wrap justify-center mb-4 gap-4">
          <div className="p-4 rounded-md bg-base-200 text-center flex-grow">
            <p className="text-base-content opacity-70">Last month you logged</p>
            <p className="text-base-content font-bold text-4xl">{timeLoggedLastMonth}</p>
          </div>

          <div className="p-4 rounded-md bg-base-200 text-center flex-grow">
            <p className="text-base-content opacity-70">This month you have logged</p>
            <p className="text-base-content font-bold text-4xl">{timeLoggedCurrentMonth}</p>
          </div>
        </div>

        <div className="p-4 mb-8 rounded-md bg-base-200">
          <LogTimeForm />
        </div>

        <div className="flex flex-row justify-center">
          <a href="/logout" className="link link-primary">Log Out</a>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const accountId = req.cookies.accountId ?? "";
  const clockworkApiKey = req.cookies.clockworkApiKey ?? "";
  const now = new Date();

  const [
    timeLoggedLastMonthSeconds,
    timeLoggedCurrentMonthSeconds,
  ] = await Promise.all([
    getTotalTimeSpentForRange(clockworkApiKey, accountId, { year: now.getFullYear(), month: now.getMonth() - 1 }),
    getTotalTimeSpentForRange(clockworkApiKey, accountId, { year: now.getFullYear(), month: now.getMonth() }),
  ]);

  return {
    props: {
      timeLoggedLastMonth: formatDuration(timeLoggedLastMonthSeconds),
      timeLoggedCurrentMonth: formatDuration(timeLoggedCurrentMonthSeconds),
    },
  };
}

export default Index;
