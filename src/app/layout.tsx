import "./global.css"
import Provider from "../context/theme/provider";
import { ScreenSizeProvider } from "@/context/screen/provider";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <html lang="en">
        <Provider>
          <ScreenSizeProvider>
            <body>
                {children}
            </body>
          </ScreenSizeProvider>
        </Provider>
      </html>
    )
  }