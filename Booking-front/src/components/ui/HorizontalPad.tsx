const HorizontalPad = (props: { widthPx: number }) => {
    return (
        <div style={{
            width: `${props.widthPx}px`,
        }} />
    );
};

export default HorizontalPad;