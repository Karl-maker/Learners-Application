import "../global.css"
import Provider from "@/context/theme/provider";
import { ScreenSizeProvider } from "@/context/screen/provider";
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
 
export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
}

/**
 * @desc lang support doc below
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router-client-components
 */

export default async function LocaleLayout({children, params: {locale}}) {
  let text;
  try {
    text = (await import(`../../language/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

    return (
      <html lang={locale}>
        <Provider>
          <ScreenSizeProvider>
            <body>
              <NextIntlClientProvider locale={locale} messages={text}>
                {children}
              </NextIntlClientProvider>
            </body>
          </ScreenSizeProvider>
        </Provider>
      </html>
    )
  }