import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { WrapperInner } from "@/layouts";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | any;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <Flex bg="orange.50" align="center" justify="center" h="100vh">
          <WrapperInner variant="retro">
            <Button
              as={"a"}
              href="/"
              p={4}
              my={4}
              size="2xl"
              variant="brand"
              bg="black"
            >
              <Heading size="md" variant="gradient">
                Todo Error Boundary
              </Heading>
            </Button>
            <p>
              Yeah, we&apos;re still figuring out how to handle crazy errors
              like the one you just encountered, we don&apos;t know what it is
              but give us some time and we would figure out it soon, meanwhile
              you could try to refresh the page to and see if things magically
              work
            </p>
          </WrapperInner>
        </Flex>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
