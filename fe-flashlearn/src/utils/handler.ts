/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
import { YesNoValue } from './types';
import { isEmpty } from '.';
import { parse } from 'qs';
import { getCapitalize } from './format';

export const getRandomId = (): string => uuidv4();

export const generateArray = (length: number, initial = '') => Array(length).fill(initial);

export const isString = (value: any): value is string => typeof value === 'string';

export const isYesValue = (value: any) => value === YesNoValue.YES;
export const isNoValue = (value: any) => value === YesNoValue.NO;

export const isOdd = (num: number) => num % 2 !== 0;

export const getErrorMessage = (
  fieldName: string,
  { touched, errors }: { touched: any; errors: any },
) => {
  if (!fieldName || !touched || !errors) return '';

  const error = get(errors, fieldName);

  return get(touched, fieldName) && error ? getCapitalize(error) : '';
};

export const tableBodyRender = <T>(
  value: T | string,
  defaultValue: T | string = '--',
): T | string => {
  return value ?? defaultValue;
};

export const isURLImage = (url: string) => {
  if (isEmpty(url)) return false;

  const hasExtensionImage = [
    '.png',
    '.jpeg',
    '.jpg',
    '.webp',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
  ].some((ext) => url?.includes(ext));

  if (hasExtensionImage) {
    return true;
  }

  const state = parse(url?.split('?')[1], { ignoreQueryPrefix: false });
  const contentType = state?.['Content-Type'];
  const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(contentType as string);

  return isImage;
};

export const formatValueOrNull = (value: string | null) => {
  return !isEmpty(value) ? value : '--';
};

export const handleKeyDownNumberInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const { key } = event;
  const regex = /^[0-9\b]+$/;
  switch (key) {
    case 'ArrowLeft':
      break;
    case 'ArrowRight':
      break;
    case 'Delete':
      break;
    case 'Backspace':
      break;
    default:
      if (!regex.test(key)) {
        event.preventDefault();
      }
      break;
  }
};

export const scrollToElement = (elementNameOrId: string, preventFocusOnScroll: boolean = false) => {
  if (elementNameOrId) {
    const elementById = document.querySelector(`[id='${elementNameOrId}']`);
    const elementByName = document.querySelector(`[name='${elementNameOrId}']`);
    const element = elementById || elementByName;
    if (element) {
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      if (!preventFocusOnScroll) {
        const firstInput = element.querySelector('input') as HTMLElement;
        if (firstInput) firstInput?.focus({ preventScroll: true });
      }
    }
  }
};

export const handleScrollToElement = (
  elementNameOrId: string,
  preventFocusOnScroll: boolean = false,
) =>
  setTimeout(() => {
    scrollToElement(elementNameOrId, preventFocusOnScroll);
  }, 100);

export const getFieldNameByPrefix = (prefix: string, name: string) => {
  if (!prefix) return name;

  return `${prefix}.${name}`;
};
