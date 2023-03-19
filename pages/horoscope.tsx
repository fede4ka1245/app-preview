import React from 'react';
import {ParsedUrlData, parseHoroscopeUrl} from "@/helpers/horoscopeUrl";
import getOgImage from "@/helpers/getOgImage";
import HoroscopeForm from "@/components/horoscopeForm/HoroscopeForm";

interface Props {
  horoscope?: ParsedUrlData,
  image?: string
}

export const getServerSideProps = async (context: any) => {
  const horoscope = parseHoroscopeUrl(context.resolvedUrl);
  const fullUrl = (context.req.headers["x-forwarded-proto"] || context.req.connection.encrypted ? "https" : "http") + '://' + context.req.headers.host + context.req.url;

  if (context?.query?.isPhoto) {
    return {
      props: {
        horoscope: horoscope ?? null,
      }
    };
  }

  const image = await getOgImage(fullUrl + '&isPhoto=true');

  return {
    props: {
      horoscope: horoscope ?? null,
      image: image ?? null
    }
  };
};

const Horoscope = ({ horoscope, image }: Props) => {
  return (
    <div>
      <HoroscopeForm horoscope={horoscope} image={image} />
    </div>
  );
};

export default Horoscope;