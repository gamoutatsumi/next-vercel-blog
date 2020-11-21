import React, { useEffect } from 'react'

const Isso: React.FC = () => {
  useEffect(() => {
    if (window.Isso === undefined) return
    if (document.getElementById('isso-root') === null) {
      window.Isso.init()
    }
    window.Isso.fetchComments()
  })
  return (
    <div className="comment mt-3">
      <script data-isso="//isso.gamou-tatsumi.com/"
        data-isso-reply-to-self="true"
        data-isso-vote="true"
        data-isso-vote-levels="0,5,10,25,100"
        data-isso-require-author="false"
        data-isso-require-email="false"
        data-isso-css="true"
        src="//isso.gamou-tatsumi.com/js/embed.min.js"></script>
      <section id="isso-thread"></section>
      <noscript>
        <div>
          Please enable Javascript to view comments.
        </div>
      </noscript>
    </div>
  )
}

export default Isso
