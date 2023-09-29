"use client"

import SplitScreen from "@/components/layout/split-screen";
import WidgetComponent from "@/components/layout/widget";
import { useScreenSize } from "@/context/screen/provider";
import { useDarkModeContext } from "@/context/theme/provider";

export default function Home() {

    const { screenSize } = useScreenSize();
    const darkMode = useDarkModeContext();
    
    const HomePageDesktopView = () => {
        return (
          <SplitScreen firstWeight={2}>
            <SplitScreen horizontal={true} firstWeight={2}>
                <WidgetComponent.Widget>

                </WidgetComponent.Widget>
                <SplitScreen>
                <WidgetComponent.Widget >

                </WidgetComponent.Widget>
                <WidgetComponent.Widget>

                </WidgetComponent.Widget>
                </SplitScreen>
            </SplitScreen>
            <WidgetComponent.Widget>
    
            </WidgetComponent.Widget>
          </SplitScreen>
        );
    };

    const HomePageTabletView = () => {
        return (
          <SplitScreen firstWeight={1.5}>
            <SplitScreen horizontal={true}>
                <WidgetComponent.Widget>

                </WidgetComponent.Widget>
                <SplitScreen>
                <WidgetComponent.Widget>

                </WidgetComponent.Widget>
                <WidgetComponent.Widget>

                </WidgetComponent.Widget>
                </SplitScreen>
            </SplitScreen>
            <WidgetComponent.Widget>
    
            </WidgetComponent.Widget>
          </SplitScreen>
        );
    };

    const HomePageMobileView = () => {
        return <>
            <WidgetComponent.Widget>
            
            </WidgetComponent.Widget>
            <SplitScreen>
                <WidgetComponent.Widget>

                </WidgetComponent.Widget>
                <WidgetComponent.Widget>

                </WidgetComponent.Widget>
            </SplitScreen>
        </>
    };

    const HomeComponents = {
        Banner: {
            desktop: <HomePageDesktopView/>,
            tablet: <HomePageTabletView/>,
            mobile: <HomePageMobileView/>
        }
    };

    return (
        <div className={`${darkMode.value ? 'dark-mode' : 'light-mode'} widget-container`}>
            {/* outtest border */}
            {/**
             * @colorpalet found in link below
             * @see https://flatuicolors.com/palette/cn
             */}
            <>
            {HomeComponents.Banner[screenSize]}
            </>
        </div>
    );
}
  