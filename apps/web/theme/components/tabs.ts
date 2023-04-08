import type { StyleFunctionProps } from '@chakra-ui/theme-tools';

const baseStyle = {
  tab: {
    fontWeight: 'medium',
    color: 'muted',
    _focus: {
      boxShadow: 'none',
    },
    _focusVisible: {
      boxShadow: 'base',
    },
  },
};

const withLine = (props: StyleFunctionProps) => {
  const { orientation, size } = props;
  const isVertical = orientation === 'vertical';
  const borderProp = orientation === 'vertical' ? 'borderStart' : 'borderBottom';
  const marginProp = isVertical ? 'marginStart' : 'marginBottom';

  const horizontalStyles = {
    pt: '0',
    pb: '4.5',
    px: '1',
    justifyContent: 'start',
    ':not(:last-child)': {
      me: '4',
    },
  };

  const verticalStyles = {
    justifyContent: 'start',
    px: size === 'lg' ? '3.5' : '3',
    ':not(:last-child)': {
      mb: '2',
    },
  };

  return {
    tablist: {
      [borderProp]: '1px solid',
      borderColor: 'inherit',
    },
    tab: {
      color: 'muted',
      [borderProp]: '2px solid transparent',
      [marginProp]: '-1px',
      _selected: {
        color: 'accent',
        [borderProp]: '2px solid',
      },
      _active: {
        bg: 'transparent',
      },
      ...(isVertical ? verticalStyles : horizontalStyles),
    },
  };
};

const enclosed = {
  tab: {
    _selected: {
      color: 'filled',
    },
  },
};

const variants = {
  'with-line': withLine,
  enclosed,
  'mute-rounded': (props: StyleFunctionProps) => {
    tab: props.theme.components.Tabs.variants['soft-rounded']({
      bg: 'red',
    });
  },
};

const sizes = {
  md: {
    tab: {
      fontSize: 'sm',
      lineHeight: '1.25rem',
      py: '2',
    },
  },
  lg: {
    tab: {
      fontSize: 'md',
      py: '2.5',
    },
  },
};

export default { baseStyle, variants, sizes };
