import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple classNames together using `clsx` and `tailwind-merge`.
 *
 * This function is a wrapper around `clsx` and `tailwind-merge` that allows
 * for more succinct and safer class name merging. It takes any number of
 * arguments, each of which can be a string (a single class name), a string
 * array (multiple class names), or an object (where the keys are the class
 * names and the values are booleans indicating whether the class should be
 * included).
 *
 * The function returns a string that is the result of merging all the class
 * names together.
 *
 * @param {...ClassValue[]} inputs - The class names to merge.
 * @return {string} The merged class names.
 */
export default function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
