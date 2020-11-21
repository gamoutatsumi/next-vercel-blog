import React from 'react'
import Head from 'next/head'

const Isso: React.FC = () => {
  return (
    <>
      <Head>
        <script async data-isso="https://isso.gamou-tatsumi.com/"
          data-isso-reply-to-self="true"
          data-isso-vote="false"
          data-isso-require-author="false"
          data-isso-require-email="false"
          data-isso-css="true"
          src="https://isso.gamou-tatsumi.com/js/embed.min.js"></script>
      </Head>
      <div className="comment mt-3">
        <section id="isso-thread"></section>
        <noscript>
          <div>
            Please enable Javascript to view comments.
          </div>
        </noscript>
      </div>
    </>
  )
}

export default Isso
