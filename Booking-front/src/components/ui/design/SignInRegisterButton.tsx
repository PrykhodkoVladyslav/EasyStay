const SignInRegisterButton = (props: { disabled: boolean, text: string }) => {
    return (
        <div className="flex justify-center">
            <button
                disabled={props.disabled}
                type="submit"
                className="signIn-register-button"
            >
                {props.text}
            </button>
        </div>
    );
};

export default SignInRegisterButton;