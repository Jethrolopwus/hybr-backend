"use client";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header/>
      <Head>
        <title>Innovation Index Toolkit</title>
        <meta name="description" content="Assess your organization's innovation capabilities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Innovation Index Toolkit</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Assess your organization's innovation capabilities and discover opportunities for growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Why Assess Innovation?</h2>
            <p className="mb-4">
              Understanding your organization's innovation strengths and weaknesses is the first step toward 
              building a more innovative culture and competitive advantage.
            </p>
            <p>
              Our assessment provides actionable insights to help you focus your innovation efforts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your overall innovation index score</li>
              <li>Performance across five key innovation dimensions</li>
              <li>Strengths to leverage in your innovation approach</li>
              <li>Opportunity areas for improvement</li>
              <li>Tailored recommendations for your organization</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/assesment" className="inline-block  bg-[#0675a8] hover:bg-[#2c4652] text-white font-bold py-3 px-8 rounded-md text-lg">
            Start Your Assessment
          </Link>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
