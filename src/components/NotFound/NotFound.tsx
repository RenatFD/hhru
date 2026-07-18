import { Link } from 'react-router-dom'
import { Center, Stack, Group, Title, Text, Button, Box } from '@mantine/core'
import sadcat from '../../assets/sadcat.gif'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <Center mt={72}>
      <Stack
        gap={16}
        className={styles.stack}
      >
        <Group justify="space-between" align="center" wrap="nowrap">
          <Title
            order={2}
            className={styles.title}
          >
            Упс! Такой страницы<br />не существует
          </Title>
          <Button
            component={Link}
            to="/"
            size="md"
            color="#4263EB"
            className={styles.button}
          >
            На главную
          </Button>
        </Group>
        <Text className={styles.text}>
          Давайте перейдём к началу.
        </Text>
        <Box mt={32}>
          <img src={sadcat} alt="" />
        </Box>
      </Stack>
    </Center>
  )
}
