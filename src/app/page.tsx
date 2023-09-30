"use client"

import WidgetComponent from "@/components/layout/widget";
import { useScreenSize } from "@/context/screen/provider";
import { useDarkModeContext } from "@/context/theme/provider";
import useStateMachine from "@/hooks/useStateMachine";
import useStateManager from "@/hooks/useStateManager";
import emailListController from "@/modules/email-listing/controller";
import { isValidEmail } from "@/utils/validation";
import { useEffect } from "react";

interface IHomePage {
    email: string;
    setEmail: Function;
    onFocus: Function;
    onSubmit: Function;
    disableInput: boolean;
    disableSubmit: boolean;
    loading: boolean;
    validEmail: boolean;
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

const HomePageDesktopView = (props: IHomePage) => {

    const {
        email, 
        setEmail,
        validEmail,
        onFocus,
        onSubmit,
        disableInput,
        disableSubmit,
        loading
    } = props;

    const containerStyle = {
      display: 'flex',
      //flexDirection: 'column',
      alignItems: 'center', // Center items horizontally
      justifyContent: 'center', // Center items vertically
      height: '100vh' // 100% of the viewport height
    };
  
    const formStyle = {
      textAlign: 'center', // Center the form's content horizontally
    };
  
    const formGroupStyle = {
      margin: '10px 0',
    };
  
    const labelStyle = {
      fontWeight: 'bold',
    };
  
    const inputStyle = {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      borderColor: validEmail ? 'grey' : 'red'
    };
  
    const buttonStyle = {
      backgroundColor: '#007BFF',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    };
 
    return (
      <div style={containerStyle}>
        {/* Container For background */}
        <WidgetComponent.Widget>
          <div style={formStyle}>
              <div style={formGroupStyle} className="form-group">
                <div style={labelStyle}>
                  Enter In Your Email To Recieve More Info
                </div>
                <input
                  style={inputStyle}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  required
                  onFocus={onFocus}
                  disabled={disableInput}
                />
              </div>
              <div style={formGroupStyle} className="form-group">
                <button
                  style={buttonStyle}
                  onClick={onSubmit}
                  disabled={disableSubmit}
                >
                  {loading ? 'Loading' : 'Submit'}
                </button>
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
        is_email_valid: false
    });

    const handleFormFocus = () => {
        homePageState.transition('ENTER_INFO');
    }

    const handleFormProcessing = async () => {
        try{
            const { message } = await emailListController.addToEmailList(form.get().email);
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
                is_email_valid: isValidEmail(input).is_valid
            }
        }, value);
    }

    const handleSubmitEmail = () => {
        if(form.get().is_email_valid) {
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

    const homeProps = {
        email: form.get().email,
        setEmail: handleEmailInput,
        validEmail: form.get().is_email_valid,
        onFocus: handleFormFocus,
        onSubmit: handleSubmitEmail,
        disableInput: homePageState.state === 'processing_form' || homePageState.state === 'form_complete',
        disableSubmit: homePageState.state === 'processing_form' || homePageState.state === 'form_complete' || !form.get().is_email_valid,
        loading: homePageState.state === 'processing_form'
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
  