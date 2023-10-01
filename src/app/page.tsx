"use client"

import InputWithButton from "@/components/input/input-with-button";
import WidgetComponent from "@/components/layout/widget";
import { useScreenSize } from "@/context/screen/provider";
import { useDarkModeContext } from "@/context/theme/provider";
import useStateMachine from "@/hooks/useStateMachine";
import useStateManager from "@/hooks/useStateManager";
import emailListController from "@/modules/email-listing/controller";
import { isValidEmail } from "@/utils/validation";
import { ReactNode, useEffect } from "react";
import { Rings } from 'react-loader-spinner';
import { AiFillCheckCircle } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';

interface IHomePage {
    email: string;
    setEmail: Function;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    onSubmit: React.MouseEventHandler<HTMLButtonElement>;
    disableInput: boolean;
    disableSubmit: boolean;
    loading: boolean;
    validEmail: boolean;
    ButtonComponent: ReactNode;
    Icon: ReactNode;
}

const homePageStateConfig  = {
    initial: 'idle',
    states: {
        idle: { 
            on: { 
                ENTER_INFO: 'filling_out_form' 
            } 
        },
        filling_out_form: {
            on: {
                SUBMIT: 'processing_form'
            }
        },
        processing_form: {
            on: {
                ERROR_OCCURED: 'filling_out_form',
                INFORMATION_SUBMITTED: 'form_complete'
            }
        },
        form_complete: {
            on: {
                RESET: 'idle'
            }
        }
    }
};

/**
 * @see https://dribbble.com/shots/16499341-Landing-Page-Hero-Section
 * @param props 
 * @returns 
 */

const HomePageDesktopView = (props: IHomePage) => {

    const {
        email, 
        setEmail,
        validEmail,
        onFocus,
        onSubmit,
        disableInput,
        disableSubmit,
        ButtonComponent,
        Icon
    } = props;

    const containerStyle = {
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      paddingTop: '200px',
      backgroundColor: 'grey'
    };
 
    return (
      <div style={containerStyle}>
        {/* Container For background */}
        <WidgetComponent.Widget>
          <div>
              <div>
                <InputWithButton
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  disableInput={disableInput}
                  disableButton={disableSubmit}
                  onClick={onSubmit}
                  onFocus={onFocus}
                  inputStyle={{
                    width: '100%',
                    fontSize: '19px'
                  }}
                  isValid={validEmail}
                  buttonStyle={{
                    width: '200px',
                    height: '60px',
                    fontSize: '20px',
                    transition: '0.5s',
                    borderRadius: '20px',
                    backgroundColor: !validEmail ? 'grey' : '#16a085'
                  }}
                  containerStyle={{
                    height: '60px',
                    width: '600px',
                    borderRadius: '20px'
                  }}
                  ButtonComponent={
                    ButtonComponent
                  }
                  Icon={Icon}
                 />
              </div>
          </div>
        </WidgetComponent.Widget>
      </div>
    );
};

const HomePageTabletView = HomePageDesktopView;

const HomePageMobileView = HomePageDesktopView;

export default function Home() {

    const { screenSize } = useScreenSize();
    const darkMode = useDarkModeContext();
    const homePageState = useStateMachine(homePageStateConfig);
    const form = useStateManager({
        email: "",
        isEmailValid: false
    });

    const handleFormFocus = () => {
        homePageState.transition('ENTER_INFO');
    }

    const handleFormProcessing = async () => {
        try{
            await emailListController.addToEmailList(form.get().email);
            homePageState.transition('INFORMATION_SUBMITTED');
        } catch({ message }) {
            homePageState.transition('ERROR_OCCURED');
        }
    }

    const handleEmailInput = (value: string) => {
        form.action((state: any, input: any) => {
            return {
                ...state,
                email: input,
                isEmailValid: isValidEmail(input).is_valid
            }
        }, value);
    }

    const handleSubmitEmail = () => {
        if(form.get().isEmailValid) {
            homePageState.transition('SUBMIT');
        }
    }

    useEffect(() => {
        (async () => {
            switch (homePageState.state) {
                case "idle":
                    break;
                
                case "filling_out_form":
                    break;

                case "processing_form":
                    handleFormProcessing();
                    break;

                case "form_complete":
                    break;
            }
        })();
    }, [homePageState.state]);

    const buttonDisplay = {
        processing_form: <Rings
            height="70"
            width="70"
            color="#ffff"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
        />,
        form_complete: <AiFillCheckCircle
            size={40}
            color="white"
        />,
        filling_out_form: <>Submit</>,
        idle: <>Submit</>
    }

    const homeProps = {
        email: form.get().email,
        setEmail: handleEmailInput,
        validEmail: form.get().isEmailValid,
        onFocus: handleFormFocus,
        onSubmit: handleSubmitEmail,
        disableInput: homePageState.state === 'processing_form' || homePageState.state === 'form_complete',
        disableSubmit: homePageState.state === 'processing_form' || homePageState.state === 'form_complete' || !form.get().isEmailValid,
        loading: homePageState.state === 'processing_form',
        ButtonComponent: buttonDisplay[homePageState.state],
        Icon: <div style={{
                marginLeft: '10px',
                marginRight: '10px'
              }}>
                <HiOutlineMail 
                    size={40}
                    color='grey'
                />
            </div>
    }

    const HomeComponents = {
        Banner: {
            desktop: <HomePageDesktopView 
                        {...homeProps}
                    />,
            tablet: <HomePageTabletView
                        {...homeProps}
                    />,
            mobile: <HomePageMobileView
                        {...homeProps}
                    />
        }
    };

    return (
        <div className={`${darkMode.value ? 'dark-mode' : 'light-mode'}`}>
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
  