import type { NextPage } from 'next';
import Head from 'next/head';
import AssessmentForm from '@/components/AssesmentForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Assessment: NextPage = () => {
  return (
    <div>
       <Header/>
      <Head>
        <title>Innovation Assessment | Innovation Index Toolkit</title>
        <meta name="description" content="Complete your innovation assessment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Innovation Assessment</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete the form below to assess your organization's innovation capabilities.
          </p>
        </div>
        <AssessmentForm />
      </main>
      <Footer/>
    </div>
  );
};

export default Assessment;