import '@/styles/globals.css'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCalendar, faFolder } from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProps } from 'next/app'
import React, { ReactElement } from 'react'

config.autoAddCss = false

library.add(faFolder, faCalendar, faGithub)

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => (
  <Component {...pageProps} />
)

export default MyApp
