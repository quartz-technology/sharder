import localFont from 'next/font/local'

export const fontBerkeleyMono = localFont({
  src: [
    {
      path: '../public/BerkeleyMono-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/BerkeleyMono-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/BerkeleyMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/BerkeleyMono-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});
