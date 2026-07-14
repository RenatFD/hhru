import { Container, Title, Text, Paper } from '@mantine/core'

export function About() {
  return (
    <Container size="md" py="xl">
      <Paper radius={12} p={32} withBorder>
        <Title
          order={2}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 700,
            fontSize: 26,
            lineHeight: '135%',
            marginBottom: 16,
          }}
        >
          Криштиану Рональдаа душ Сантуш Авейру
        </Title>
        <Text
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
          }}
        >
          Привет! Я — Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.<br />
          Завязал с футбиком после чм
        </Text>
      </Paper>
    </Container>
  )
}
