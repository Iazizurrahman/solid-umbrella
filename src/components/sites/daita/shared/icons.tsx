// UI icon set for the DAITA site.
//
// The four brand wordmarks that came with the original extraction were another company's
// registered marks; they have been removed. DAITA's logo is served as a file from
// /images/daita/ instead — see shared/brand.ts.
//
// Every icon renders at 100% of its box and inherits colour via `currentColor` where the
// source used it. Size them with classes on the wrapper.
import type { SVGProps } from "react";

/** viewBox 0 0 16 16 — 25 uses on the source page. */
export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M2.3999 8.00005C2.3999 7.66868 2.66853 7.40005 2.9999 7.40005L11.5102 7.40005L8.18404 4.23255C7.94517 4.00287 7.93773 3.62305 8.1674 3.38418C8.39708 3.14532 8.7769 3.13787 9.01577 3.36755L13.4158 7.56755C13.5334 7.68067 13.5999 7.83684 13.5999 8.00005C13.5999 8.16326 13.5334 8.31943 13.4158 8.43255L9.01577 12.6325C8.7769 12.8622 8.39708 12.8548 8.1674 12.6159C7.93773 12.3771 7.94517 11.9972 8.18404 11.7675L11.5102 8.60005L2.9999 8.60005C2.66853 8.60005 2.3999 8.33142 2.3999 8.00005Z" fill="currentColor"/> </svg>
  );
}

/** viewBox 0 0 12 12 — 11 uses on the source page. */
export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.75 0.75C6.75 0.335786 6.41421 0 6 0C5.58579 0 5.25 0.335786 5.25 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335786 6.75 0.75 6.75L5.25 6.75V11.25C5.25 11.6642 5.58579 12 6 12C6.41421 12 6.75 11.6642 6.75 11.25V6.75L11.25 6.75C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.75V0.75Z" fill="currentColor"/> </svg>
  );
}

/** viewBox 0 0 13 12 — 11 uses on the source page. */
export function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="100%" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 6H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/> </svg>
  );
}

/** viewBox 0 0 20 20 — 4 uses on the source page. */
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M5.21967 8.21967C5.51256 7.92678 5.98744 7.92678 6.28033 8.21967L10 11.9393L13.7197 8.21967C14.0126 7.92678 14.4874 7.92678 14.7803 8.21967C15.0732 8.51256 15.0732 8.98744 14.7803 9.28033L10.5303 13.5303C10.3897 13.671 10.1989 13.75 10 13.75C9.80109 13.75 9.61032 13.671 9.46967 13.5303L5.21967 9.28033C4.92678 8.98744 4.92678 8.51256 5.21967 8.21967Z" fill="currentColor"/> </svg>
  );
}

/** viewBox 0 0 24 24 — 2 uses on the source page. */
export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </svg>
  );
}

/** viewBox 0 0 1440 1 — 1 use on the source page. */
export function DashedRuleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="100%" viewBox="0 0 1440 1" fill="none" xmlns="http://www.w3.org/2000/svg"> <line x1="1440" y1="0.5" y2="0.5" stroke="white" strokeOpacity="0.1" strokeDasharray="4 4"/> </svg>
  );
}

/** viewBox 0 0 16 16 — 1 use on the source page. */
export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M14 8.2C14 7.86863 13.7122 7.6 13.3571 7.6L4.23893 7.6L7.80271 4.4325C8.05864 4.20282 8.06662 3.823 7.82053 3.58414C7.57445 3.34527 7.1675 3.33783 6.91157 3.5675L2.19729 7.7675C2.07124 7.88062 2 8.03679 2 8.2C2 8.36321 2.07124 8.51938 2.19729 8.6325L6.91157 12.8325C7.1675 13.0622 7.57445 13.0547 7.82054 12.8159C8.06662 12.577 8.05864 12.1972 7.80271 11.9675L4.23893 8.8L13.3571 8.8C13.7122 8.8 14 8.53137 14 8.2Z" fill="currentColor"/> </svg>
  );
}

/** viewBox 0 0 16 16 — 1 use on the source page. */
export function ArrowRightAltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M2.3999 8.00078C2.3999 7.66941 2.66853 7.40078 2.9999 7.40078L11.5102 7.40078L8.18404 4.23328C7.94517 4.0036 7.93773 3.62378 8.1674 3.38492C8.39708 3.14605 8.7769 3.1386 9.01577 3.36828L13.4158 7.56828C13.5334 7.6814 13.5999 7.83757 13.5999 8.00078C13.5999 8.16399 13.5334 8.32016 13.4158 8.43328L9.01577 12.6333C8.7769 12.863 8.39708 12.8555 8.1674 12.6166C7.93773 12.3778 7.94517 11.998 8.18404 11.7683L11.5102 8.60078L2.9999 8.60078C2.66853 8.60078 2.3999 8.33215 2.3999 8.00078Z" fill="currentColor"/> </svg>
  );
}

/** viewBox 0 0 20 20 — 1 use on the source page. */
export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_2334_16369_linkedinicon)"> <path fillRule="evenodd" clipRule="evenodd" d="M1 2.58725C1 1.71064 1.71015 1 2.58725 1H18.4128C19.2894 1 20 1.71015 20 2.58725V18.4128C20 19.2894 19.2899 20 18.4128 20H2.58725C1.71064 20 1 19.2899 1 18.4128V2.58725ZM8.52083 8.24375H11.0938V9.53654C11.4646 8.79317 12.415 8.125 13.8428 8.125C16.5796 8.125 17.2292 9.60462 17.2292 12.3196V17.3479H14.4583V12.9379C14.4583 11.3918 14.0874 10.5198 13.1442 10.5198C11.8359 10.5198 11.2917 11.4599 11.2917 12.9379V17.3479H8.52083V8.24375ZM3.77083 17.2292H6.54167V8.125H3.77083V17.2292ZM6.9375 5.15625C6.9375 6.1399 6.1399 6.9375 5.15625 6.9375C4.1726 6.9375 3.375 6.1399 3.375 5.15625C3.375 4.1726 4.1726 3.375 5.15625 3.375C6.1399 3.375 6.9375 4.1726 6.9375 5.15625Z" fill="currentColor"/> </g> <defs> <clipPath id="clip0_2334_16369_linkedinicon"> <rect width="20" height="20" fill="currentColor"/> </clipPath> </defs> </svg>
  );
}

/** viewBox 0 0 20 20 — 1 use on the source page. */
export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_2334_16370_xicon)"> <path d="M15.7512 0.625H18.818L12.1179 8.30256L20 18.75H13.8284L8.99458 12.4137L3.46359 18.75H0.394938L7.5613 10.538L0 0.625H6.32828L10.6976 6.41664L15.7512 0.625ZM14.6748 16.9096H16.3742L5.4049 2.36872H3.58133L14.6748 16.9096Z" fill="currentColor"/> </g> <defs> <clipPath id="clip0_2334_16370_xicon"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>
  );
}

/** viewBox 0 0 29 20 — 1 use on the source page. */
export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} height="100%" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.2861 -0.000976562C14.3564 -0.000967225 23.2299 0.00165032 25.4482 0.59668C26.678 0.925971 27.6443 1.89228 27.9736 3.12207C28.5687 5.34936 28.5713 10 28.5713 10C28.5713 10.0538 28.5676 14.6627 27.9736 16.877C27.6443 18.1068 26.6781 19.0731 25.4482 19.4023C23.2299 19.9974 14.3564 20 14.2861 20C14.2861 20 5.35035 19.9998 3.12305 19.4023C1.89328 19.0731 0.926981 18.1067 0.597656 16.877C0.00375503 14.6627 2.03231e-05 10.0538 0 10C0 10 0.000260592 5.34936 0.597656 3.12207C0.926996 1.89231 1.8933 0.926016 3.12305 0.59668C5.35035 -0.000716031 14.2861 -0.000976562 14.2861 -0.000976562ZM11.4258 14.2852L18.8486 10L11.4258 5.71484V14.2852Z" fill="currentColor"/> </svg>
  );
}

