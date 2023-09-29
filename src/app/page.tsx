"use client"

import SplitScreen from "@/components/layout/split-screen";
import WidgetComponent from "@/components/layout/widget";
import { useScreenSize } from "@/context/screen/provider";
import { useDarkModeContext } from "@/context/theme/provider";
import useStateMachine from "@/hooks/useStateMachine";
import useStateManager from "@/hooks/useStateManager";
import { addToEmailList } from "@/modules/email-listing/controller";
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
}

const HomePageDesktopView = (props: IHomePage) => {

    const {
        email, 
        setEmail,
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
        <WidgetComponent.Widget innerBackgroundColor="#dfe4ea">
          <div style={formStyle}>
              <div style={formGroupStyle} className="form-group">
                <label style={labelStyle} htmlFor="email">
                  Email:
                </label>
                <input
                  style={inputStyle}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={setEmail}
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

export default function Home() {

    const homePageStateConfig = {
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
    
    const { screenSize } = useScreenSize();
    const darkMode = useDarkModeContext();

    const homePageState = useStateMachine(homePageStateConfig);
    const form = useStateManager({
        email: "",
        is_email_valid: false
    });

    const onFormFocus = () => {
        homePageState.transition('ENTER_INFO');
    }

    const handleEmailInput = (e) => {

        form.action((state: any, input: any) => {
            return {
                ...state,
                email: input,
                is_email_valid: isValidEmail(input).is_valid
            }
        }, e.target.value);
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
                    console.log('idle')
                break;
                
                case "filling_out_form":
                    console.log('filling_out_form')
                break;

                case "processing_form":
                    const { message, error } = await addToEmailList(form.get().email);
                    if(!error) {
                        homePageState.transition('INFORMATION_SUBMITTED');
                        return;
                    }
                    homePageState.transition('ERROR_OCCURED');
                break;

                case "form_complete":
                    console.log('form_complete')
                break;
            }
        })();
    }, [homePageState.state]);

    const HomeComponents = {
        Banner: {
            desktop: <HomePageDesktopView 
                        email={form.get().email} 
                        setEmail={handleEmailInput}
                        onFocus={onFormFocus}
                        onSubmit={handleSubmitEmail}
                        disableInput={homePageState.state === 'processing_form' || homePageState.state === 'form_complete'}
                        disableSubmit={homePageState.state === 'processing_form' || homePageState.state === 'form_complete' || !form.get().is_email_valid}
                        loading={homePageState.state === 'processing_form'}
                    />,
            tablet: <HomePageTabletView/>,
            mobile: <HomePageMobileView/>
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
  