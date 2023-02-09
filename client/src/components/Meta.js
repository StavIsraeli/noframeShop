import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Noframe Shop',
  description: 'We sell high quality graphic design products',
  keywords: 'graphic design, high quality, products, home decor, graphic pictures, room decor, special room decor, buy decorative products',
}

export default Meta