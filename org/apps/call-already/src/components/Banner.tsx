import { Paper, Text, Group, CloseButton } from '@mantine/core';

interface BannerProps extends React.HTMLAttributes<HTMLElement> {
  message: string;
  onClose: () => void;
}

export type ErrorObject = {
  [key: string]: any;
};

export const Banner: React.FC<BannerProps> = ({message, onClose}) => {

  const scrollToTop = () => {
    window.scrollTo(0,0);
  }

  return (
    <Paper withBorder p="md" radius="md" shadow="md">
      <Group>
        <CloseButton mr={-6} onClick={() => {
          onClose();
          scrollToTop();
        }} />
        <Text fz="sm" fw={500}>
          {message}
        </Text>
      </Group>
    </Paper>
  );
}
