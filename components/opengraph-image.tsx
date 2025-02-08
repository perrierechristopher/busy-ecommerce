import { ImageResponse } from 'next/og';
import LogoIcon from './icons/logo';
import localFont from 'next/font/local';

const inter = localFont({
  src: '../fonts/Inter-Bold.ttf', 
  display: 'swap',
  weight: '700',
});


export type Props = {
  title?: string;
};

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = { ...{ title: process.env.SITE_NAME }, ...props };

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white" style={{ fontFamily: inter.style.fontFamily }}>
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

