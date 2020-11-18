import React from 'react'

const Isso: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') return (<></>)
  return (
    <>
      <script data-isso="//isso.gamou-tatsumi.com/"
        data-isso-reply-to-self="true"
        data-isso-vote="true"
        data-isso-vote-levels="0,5,10,25,100"
        data-isso-require-author="false"
        data-isso-require-email="false"
        src="//isso.gamou-tatsumi.com/js/embed.min.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: 'window.Isso.init()'
      }} />
      <section id="isso-thread"></section>
      <noscript>
        <div>
          Please enable Javascript to view comments.
        </div>
      </noscript>
    </>
  )
}

export default Isso
