import { Container, Title, Text, Paper } from '@mantine/core'
import styles from './About.module.css'

export function About() {
  return (
    <Container size="md" py="xl">
      <Paper radius={12} p={32} withBorder>
        <Title
          order={2}
          className={styles.title}
        >
          Криштиану Рональдаа душ Сантуш Авейру
        </Title>
        <Text className={styles.text}>
          Привет! Я — Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.<br />
          Завязал с футбиком после чм
        </Text>
      </Paper>
    </Container>
  )
}
