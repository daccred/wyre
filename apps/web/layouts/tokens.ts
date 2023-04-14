import type { BoxProps } from '@chakra-ui/react';

export const MAX_WIDTH = { base: '1200px', '2xl': '2420px' };
export const MAX_WIDTH_BOXED = { base: '1040px', lg: '1280px' };
export const MAX_WIDTH_INNER = { base: '1280px', lg: '1600px' };
export const MAX_WIDTH_FORM = { base: '600px', lg: '840px' };

export enum WrapperEnum {
  FLUID = 'fluid',
  INNER = 'inner',
  CONTAIN = 'contain',
  MOBILE = 'mobile',
}

/* Used to define the various box styles we'd use for Inner Wrappers */
export type InnerWrapperStyleVariant =
  | 'default'
  | 'boxed'
  | 'retro'
  | 'compact'
  | 'form'
  | 'form-retro'
  | 'form-boxed';

export interface WrapperInnerProps extends BoxProps {
  variant?: InnerWrapperStyleVariant;
  children: React.ReactNode;
}

export function withTokenForInnerWrapperVariant(variant: InnerWrapperStyleVariant = 'default') {
  const yAxisWhiteSpace = { base: '4', lg: '12' };
  const xAxisWhiteSpace = { base: '4', lg: '12' };

  const tokens = {
    default: {
      maxWidth: MAX_WIDTH_INNER,
      shadow: ['none', 'none'],
      borderColor: ['transparent', 'transparent'],
      px: { base: '0', lg: '0' },
      py: { base: '1', lg: '2' },
    },
    boxed: {
      maxWidth: MAX_WIDTH_BOXED,
      shadow: ['md', 'md-dark'],
      borderColor: ['#44444422', 'green.300'],
      px: xAxisWhiteSpace,
      py: yAxisWhiteSpace,
    },
    compact: {
      maxWidth: MAX_WIDTH_BOXED,
      shadow: ['none', 'none'],
      borderColor: ['transparent', 'transparent'],
      px: xAxisWhiteSpace,
      py: yAxisWhiteSpace,
    },
    retro: {
      maxWidth: MAX_WIDTH_BOXED,
      shadow: ['5px 5px 0px 0px rgba(0,0,0,1)', '6px 6px 0px 0px rgba(10,50,0,1)'],
      borderColor: ['brand.900', 'green.300'],
      px: xAxisWhiteSpace,
      py: yAxisWhiteSpace,
    },
    form: {
      maxWidth: MAX_WIDTH_FORM,
      shadow: ['none', 'none'],
      borderColor: ['transparent', 'transparent'],
      px: xAxisWhiteSpace,
      py: yAxisWhiteSpace,
    },
    'form-retro': {
      maxWidth: MAX_WIDTH_FORM,
      shadow: ['5px 5px 0px 0px rgba(0,0,0,1)', '6px 6px 0px 0px rgba(10,50,0,1)'],
      borderColor: ['brand.900', 'green.300'],
      px: { base: '6', lg: '12' },
      py: yAxisWhiteSpace,
    },
    'form-boxed': {
      maxWidth: MAX_WIDTH_FORM,
      shadow: ['md', 'md-dark'],
      borderColor: ['#44444422', 'green.300'],
      px: { base: '6', lg: '12' },
      py: yAxisWhiteSpace,
    },
  };

  return tokens[variant];
}
