import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const labelVariants = cva("flex font-main text-black", {
    variants: {
        variant: {
            default: "text-xl font-main",
            small: "text-xs",
            extra: " font-bold text-3xl",
            title: "text-black font-bold text-2xl",
            subtitle: "text-lightgray text-md",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, ...props }, ref) => (
    <label ref={ref} className={classNames(labelVariants({ variant }), className)} {...props} />
));
export default Label;


// import { VariantProps, cva } from "class-variance-authority";
// import { classNames } from "utils/classNames.ts";
//
// import React from "react";
//
// const labelVariants = cva("flex font-main text-black", {
//     variants: {
//         variant: {
//             default: "font-medium font-main",
//         },
//         size: {
//             default: "",
//             // default: "text-md",
//             // small: "text-md mb-0 flex items-center gap-2",
//         },
//     },
//     defaultVariants: {
//         variant: "default",
//         size: "default",
//     },
// });
//
// export interface LabelProps
//     extends React.LabelHTMLAttributes<HTMLLabelElement>,
//         VariantProps<typeof labelVariants> {}
//
// const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, size, ...props }, ref) => (
//     <label ref={ref} className={classNames(labelVariants({ variant, size }), className)} {...props} />
// ));
// export default Label;
