import { useTab, useMultiStyleConfig, Button, Flex, Icon } from '@chakra-ui/react';
import type { Ref } from 'react';
import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';

interface CustomTabProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CustomTab = React.forwardRef(({ children, ...props }: CustomTabProps, ref: Ref<HTMLElement>) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  const styles = useMultiStyleConfig('Tabs', tabProps);

  return (
    <Button __css={styles.tab} {...tabProps}>
      <Flex
        alignItems="center"
        fontWeight={isSelected ? 'bold' : 'normal'}
        color={isSelected ? '#8D1CFF' : ' #D2D2D2'}>
        {children}
        {isSelected ? (
          <Icon as={GoPrimitiveDot} w={5} h={5} ml={2} />
        ) : (
          <Icon as={GoPrimitiveDot} w={5} h={5} />
        )}
      </Flex>
    </Button>
  );
});

CustomTab.displayName = 'CustomTab';

export default CustomTab;
