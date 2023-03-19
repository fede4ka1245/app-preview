import {ParsedUrlData} from "@/helpers/horoscopeUrl";
import {Grid, Typography} from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import DarkThemeBackground from "@/components/darkThemeBackground/DarkThemeBackground";
import Input from "@/components/input/Input";
import {InputType} from "@/components/input/InputType";

interface Props {
  horoscope?: ParsedUrlData,
  image?: string
}

function getJsonLd(horoscope: any) {
  if (!horoscope) {
    return {
      __html: `{}`
    };
  }

  return {
    __html: `{
      "@context": "https://schema.org/",
      "name": "AlphaSpace",
      "image": "https://en.wikipedia.org/wiki/Cat#/media/File:Cat_August_2010-4.jpg",
      "description": "${[
      `Рассчитать гороскоп в приложении AlphaSpace`,
      `Имя: ${horoscope?.userInfo.name}`,
      `Время: ${horoscope?.userInfo.date}`,
      `Дата: ${horoscope?.userInfo.time}`
    ].join(" ")}",
    }
  `,
  };
}


function HoroscopeForm({ horoscope, image }: Props) {

  return <Grid display={'flex'} direction={'column'} alignItems={'center'}>
    <Head>
      <title>AlphaSpace</title>
      <meta
        name={'description'}
        content={[
          `Рассчитать гороскоп в приложении AlphaSpace`,
          `Имя: ${horoscope?.userInfo.name}`,
          `Время: ${horoscope?.userInfo.date}`,
          `Дата: ${horoscope?.userInfo.time}`
        ].join(" ")}
        key="desc"
      />
      <meta property="og:title" content="AlphaSpace"/>
      <meta property="og:description" content={[
        `Рассчитать гороскоп в приложении AlphaSpace`,
        `Имя: ${horoscope?.userInfo.name}`,
        `Время: ${horoscope?.userInfo.date}`,
        `Дата: ${horoscope?.userInfo.time}`
      ].join("\n")}
      />
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://app-preview-eight.vercel.app/"/>
      <meta property="og:image" content={image || '/galaxy.png'} />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta property="og:title" content={"AlphaSpace"} />
      <meta
        property="og:description"
        content={[
          `Рассчитать гороскоп в приложении AlphaSpace`,
          `Имя: ${horoscope?.userInfo.name}`,
          `Время: ${horoscope?.userInfo.date}`,
          `Дата: ${horoscope?.userInfo.time}`
        ].join("\n")}
      />
      <meta
        name="twitter:description"
        content={[
          `Рассчитать гороскоп в приложении AlphaSpace`,
          `Имя: ${horoscope?.userInfo.name}`,
          `Время: ${horoscope?.userInfo.date}`,
          `Дата: ${horoscope?.userInfo.time}`
        ].join("\n")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={getJsonLd(horoscope)}
        key="product-jsonldd"
      />
    </Head>
    <header className={styles.header}>
      <h1 className={styles.logo}>
        AlphaSpace
      </h1>
    </header>
    <Grid maxWidth={'450px'} mt={'30px'} ml={2} mr={2} overflow={'hidden'} position={'relative'} borderRadius={'20px'}>
      <DarkThemeBackground backgroundVariant={'galaxy'}>
        <Grid width={'100%'} p={2}>
          <Grid pt={1} pb={2}>
            <p className={styles.formHeader}>
              Гороскоп в приложении AlphaSpace
            </p>
          </Grid>
          <Grid item xs={12} md={12} pb={2}>
            <Input
              placeholder='ФИО'
              value={horoscope?.userInfo.name}
              disabled={true}
            />
          </Grid>
          <Grid item container direction={'row'} spacing={2} pb={2}>
            <Grid item xs={6} md={6}>
              <Input
                placeholder='ДД.ММ.ГГГГ'
                inputType={InputType.date}
                value={horoscope?.userInfo.date}
                disabled={true}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <Input
                placeholder='00:00:00'
                inputType={InputType.time}
                value={horoscope?.userInfo.time}
                disabled={true}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Input
              placeholder={'Место рождения'}
              disabled={true}
              value={horoscope?.address.location.value}
            />
          </Grid>
          <Grid item container direction={'row'} color={'#ABB0B2'} display={'flex'} pt={2}>
            <Grid item flex={1}>
              <Typography color={'#ABB0B2'} fontFamily={'Gilroy'} fontSize={'15px'} textAlign={'left'}>
                Широта: {horoscope?.address.coordinates.latitude || '--'}
              </Typography>
            </Grid>
            <Grid item flex={1}>
              <Typography color={'#ABB0B2'} fontFamily={'Gilroy'} fontSize={'15px'} textAlign={'center'}>
                Долгота: {horoscope?.address.coordinates.longitude || '--'}
              </Typography>
            </Grid>
            <Grid item flex={1}>
              <Typography color={'#ABB0B2'} fontFamily={'Gilroy'} fontSize={'15px'} textAlign={'right'}>
                Час. пояс: {`${horoscope?.address.timeZone.greenwich}${horoscope?.address.timeZone.hours}:${horoscope?.address.timeZone.minutes}` || '--'}
              </Typography>
            </Grid>
          </Grid>
          <Grid pt={4} pb={1}>
            <div className={styles.button}>
              <div className={styles.buttonImage}>
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.00473 2.39413C5.69793 2.39413 3.00473 5.08733 3.00473 8.39413V21.5941C3.00473 24.9009 5.69793 27.5941 9.00473 27.5941H22.2047C25.5115 27.5941 28.2047 24.9009 28.2047 21.5941V8.39413C28.2047 5.08733 25.5115 2.39413 22.2047 2.39413H9.00473ZM9.00473 3.59413H22.2047C24.8631 3.59413 27.0047 5.73574 27.0047 8.39413V21.5941C27.0047 24.2525 24.8631 26.3941 22.2047 26.3941H9.00473C6.34633 26.3941 4.20473 24.2525 4.20473 21.5941V8.39413C4.20473 5.73574 6.34633 3.59413 9.00473 3.59413ZM14.1481 7.13554C13.9174 7.12079 13.6793 7.17171 13.4649 7.29726C12.8931 7.63266 12.7018 8.36843 13.0372 8.94023L14.1235 10.7941L10.6043 16.8H7.80473C7.14233 16.8 6.60473 17.3376 6.60473 18C6.60473 18.6624 7.14233 19.2 7.80473 19.2H17.052C17.1462 18.7422 17.0887 18.2457 16.8247 17.7867L16.8223 17.7844C16.5901 17.38 16.268 17.0496 15.893 16.8H13.3864L17.9918 8.93906C18.3266 8.36726 18.1347 7.63206 17.5629 7.29726C16.9905 6.96246 16.2559 7.15437 15.9211 7.72617L15.5145 8.41992L15.1079 7.72617C14.8982 7.36879 14.5325 7.16013 14.1481 7.13554ZM17.5911 11.9648L17.0954 12.7887C16.5482 13.6983 16.5305 14.8241 17.0309 15.7535L20.809 22.2012C21.0322 22.5828 21.4328 22.7941 21.845 22.7941C22.0508 22.7941 22.26 22.7417 22.4508 22.6301C23.0226 22.2953 23.214 21.5601 22.8786 20.9883L21.8309 19.2H23.4047C24.0671 19.2 24.6047 18.6624 24.6047 18C24.6047 17.3376 24.0671 16.8 23.4047 16.8H20.4247L17.5911 11.9648ZM9.37973 20.4023C9.04553 20.3927 8.72076 20.4446 8.41176 20.5418L8.14457 20.9965C7.80917 21.5677 8.00168 22.3035 8.57348 22.6383C8.76428 22.7505 8.97237 22.8035 9.17817 22.8035C9.59037 22.8035 9.99148 22.5904 10.2153 22.2094L10.861 21.1078C10.51 20.698 9.99705 20.4203 9.38325 20.4023H9.37973Z" fill="white"/>
                </svg>
              </div>
              <p className={styles.buttonText}>
                Скачать в App Store
              </p>
            </div>
          </Grid>
          <Grid pb={2}>
            <div className={styles.button}>
              <div className={styles.buttonImage}>
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.7533 13.3163C26.3603 13.1039 22.9899 11.1483 21.7253 10.4122L21.7216 10.4097L6.40299 1.56578C6.14202 1.40647 5.84938 1.30611 5.54557 1.27171C5.24175 1.23732 4.93409 1.26972 4.6441 1.36666C4.61138 1.37841 4.58063 1.39023 4.54882 1.40479C4.47495 1.42887 4.40275 1.45777 4.33268 1.49132C4.03979 1.66639 3.7995 1.91716 3.63709 2.21727C3.47469 2.51737 3.39618 2.85569 3.40983 3.19664V26.9283C3.40053 27.246 3.47576 27.5604 3.62783 27.8394C3.77989 28.1185 4.00333 28.3521 4.2753 28.5165C4.33803 28.5471 4.40266 28.5737 4.46879 28.5961C4.50495 28.6128 4.53943 28.6274 4.57674 28.6405C4.75575 28.7054 4.94429 28.7402 5.13468 28.7435C5.50029 28.7396 5.85848 28.6398 6.1735 28.4542C6.65934 28.1722 21.7216 19.4759 21.7216 19.4759L26.7472 16.5743C27.058 16.4187 27.3202 16.1811 27.5057 15.8872C27.6911 15.5933 27.7927 15.2543 27.7995 14.9068C27.7842 14.5721 27.679 14.2478 27.4949 13.9679C27.3107 13.688 27.0546 13.4629 26.7533 13.3163ZM5.90983 24.7988V5.12733L15.835 14.9512L5.90983 24.7988ZM12.1823 22.0967L17.6117 16.7097L19.0486 18.132C17.4678 19.0448 14.797 20.587 12.1823 22.0967ZM17.6096 13.1904L12.1122 7.74917L19.0543 11.757L17.6096 13.1904ZM21.2931 16.8363L19.3863 14.949L21.296 13.0543C22.1963 13.5771 23.5995 14.3909 24.5659 14.9471L21.2931 16.8363Z" fill="white"/>
                </svg>
              </div>
              <p className={styles.buttonText}>
                Скачать в Play Market
              </p>
            </div>
          </Grid>
        </Grid>
      </DarkThemeBackground>
    </Grid>
  </Grid>
}

export default HoroscopeForm;