import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import useHover from '@wyrecc/components/hooks/use-hover';

export const Card = ({
  heading,
  text,
  icon,
  onClick,
  headingFontSize,
  textFontSize,
  padding,
  bg,
  border,
  hoverBg,
  hoverColor,
}: {
  heading: string;
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
  headingFontSize?: string;
  textFontSize?: string;
  padding?: number;
  bg?: string;
  border?: string;
  hoverColor?: string;
  hoverBg?: string;
}) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  return (
    <Flex
      bg={bg || 'white'}
      justify="space-between"
      align="center"
      p={padding || 3}
      rounded="xl"
      border={border || '1px solid #D2D2D2'}
      width="full"
      _hover={{ bg: hoverBg, color: hoverColor }}
      cursor="pointer"
      onClick={onClick}
      ref={ref}>
      <VStack align="left" spacing={0.5}>
        <Heading as="h4" size="xs" fontSize={headingFontSize || 'xl'}>
          {heading}
        </Heading>
        <Text color={isHovered ? hoverColor : 'lightgrey'} fontSize={textFontSize || 'md'}>
          {text}
        </Text>
      </VStack>
      <Box>{icon}</Box>
    </Flex>
  );
};
