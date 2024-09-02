const VerticalPad = (props: { heightPx: number }) => {
    return (
        <div style={{
            height: `${props.heightPx}px`,
        }} />
    );
};

export default VerticalPad;