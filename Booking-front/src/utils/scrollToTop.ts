export const instantScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "instant",
    });
};

export const smoothScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
