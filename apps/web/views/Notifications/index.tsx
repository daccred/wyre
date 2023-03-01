import ViewLayout from "../../components/core/ViewLayout";
import { Fragment, useState  } from 'react';
import {
  Avatar,
  Box,
  chakra,
  Flex,
  Stack,
  VStack,
  Divider,
  Checkbox,
  Link,
  Button
} from '@chakra-ui/react';

interface Notification {
  img: string;
  title: string;
  desc: string;
  link: string;
  created_at: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    img: "https://bit.ly/ryan-florence",
    title: 'Started 2022 by updating portfolio website',
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: 'https://mahmad.me/blog/started-2022-by-updating-portfolio-website-1jde-temp-slug-4553258',
    created_at: '21 Jan 2022',
    isRead: true
  },
  {
    img: "https://bit.ly/dan-abramov",
    title: 'Create professional portfolio website with Nextjs and ChakraUI',
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: '/',
    created_at: '20 Jun 2021',
   isRead: false
  },
  {
    img: "https://bit.ly/kent-c-dodds",
    title: `Find out what's new in my portfolio website`,
    desc: "Your next payroll is USD 7,000 and due on Oct 5, 2022",
    link: '/',
    created_at: '31 Sept 2022',
    isRead: false
  },
  {
    img: "",
    title: "Reimbursement Request",
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: '/',
    isRead: true,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
  {
    img: "https://bit.ly/ryan-florence",
    title: "Payroll",
    desc: "Your next payroll is USD 7,000 and due on Oct 5, 2022",
    link: '/',
    isRead: true,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
  {
    img: "https://bit.ly/ryan-florence",
    title: "Reimbursement Request",
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: '/',
    isRead: true,
    created_at: 'Sept 30, 2022 12:30 PM',
  },{
    img: "",
    title: "Reimbursement Request",
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: '/',
    isRead: false,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
  {
    img: "https://bit.ly/ryan-florence",
    title: "Payroll",
    desc: "Your next payroll is USD 7,000 and due on Oct 5, 2022",
    link: '/',
    isRead: true,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
  {
    img: "https://bit.ly/ryan-florence",
    title: "Reimbursement Request",
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: '/',
    isRead: false,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
  {
    img: "",
    title: "Reimbursement Request",
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: '/',
    isRead: true,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
  {
    img: "https://bit.ly/ryan-florence",
    title: "Payroll",
    desc: "Your next payroll is USD 7,000 and due on Oct 5, 2022",
    link: '/',
    isRead: false,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
  {
    img: "https://bit.ly/ryan-florence",
    title: "Reimbursement Request",
    desc: "Omotola Atinuke requires a reimbursement of USD 5,000 for her conference trip to Chicago",
    link: '/',
    isRead: true,
    created_at: 'Sept 30, 2022 12:30 PM',
  },
];

const PAGE_SIZE = 5;

const NotificationsList  = () => {
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE);
  const [isAllRead, setIsAllRead] = useState<boolean>(false);

  const handleLoadMore = (): void => {
    setDisplayCount(displayCount + 5);
  };

  const handleMarkAllRead = (): void => {
    setIsAllRead(true);
  };
  
  const notificationsToDisplay: Notification[] = notifications
    .slice(0, displayCount)
    .map(notification => ({
      ...notification,
      isRead: isAllRead || notification.isRead
    }));
  

  return (
    <ViewLayout title="Notifications" >
      <Stack
        borderRadius={"15px"}
        border={"1px solid"}
        borderColor="bordergrey"
        bg={"white"}
        w="100%"
      >
      
      <Flex  justify="space-between" px={4} pt={4} pb={2}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          Notifications
        </chakra.h3>
          <Checkbox colorScheme="purple" 
            size="md"   
            onChange={handleMarkAllRead}
            isChecked={isAllRead}>
            Mark all as read
          </Checkbox>
      </Flex>
      <VStack rounded="md" overflow="hidden" px={4} spacing={0}>
        <Divider m={0} />

        {notificationsToDisplay.map((notification, index) => (
          <Fragment key={index}>
            <Flex
              w="100%"
              justify="space-between"
              alignItems="center"
              p={3}
              bg={notification.isRead ? "transparent" : "gray.100"}
              _hover={{ bg: notification.isRead ? "transparent" : "gray.200" }}
            >
              <Flex
              justify="space-between"
              alignItems="center"
              >
               <Stack spacing={0} direction="row" alignItems="center" w="100%">
                <Flex>
                  <Avatar size="md" name={''} src={notification.img} />
                </Flex>
                <Flex direction="column" p={2}>
                  <NotificationLink label={notification.title} />
                  <chakra.p
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    {notification.desc}
                  </chakra.p>
                </Flex>
              </Stack>
              </Flex>
              
              <Box fontSize={'sm'}>
                <chakra.p
                  fontWeight="medium"
                  fontSize="sm"
                >
                  {notification.created_at}
                </chakra.p>
              </Box>
            </Flex>
          <Divider m={0} />

          </Fragment>
        ))}
         {notifications.length > displayCount && (
            <Box py={2}>
              <Button bg="white" onClick={handleLoadMore}>
                Read more
              </Button>
            </Box>
          )}
      </VStack>
      
      </Stack>
    </ViewLayout>
  );
};


const NotificationLink = ({ label }: { label: string }) => {
  return (
    <chakra.p
      as={Link}
      fontSize="sm"
      rounded="md"
      fontWeight="bold"

    >
      {label}
    </chakra.p>
  );
};


export default NotificationsList;
