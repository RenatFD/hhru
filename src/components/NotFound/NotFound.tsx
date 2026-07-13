import { Link } from 'react-router-dom'
import { Center, Stack, Group, Title, Text, Button, Box } from '@mantine/core'
import sadcat from '../../assets/sadcat.gif'

export function NotFound() {
  return (
    <Center mt={72}>
      <Stack
        gap={16}
        style={{
          width: 707,
          padding: 32,
          borderRadius: 12,
          background: '#FFFFFF',
        }}
      >
        <Group justify="space-between" align="center" wrap="nowrap">
          <Title
            order={2}
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 700,
              fontSize: 34,
              lineHeight: '130%',
            }}
          >
            Упс! Такой страницы<br />не существует
          </Title>
          <Button
            component={Link}
            to="/"
            size="md"
            color="#4263EB"
            style={{ flexShrink: 0 }}
          >
            На главную
          </Button>
        </Group>
        <Text
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 400,
            fontSize: 18,
            lineHeight: '24px',
          }}
        >
          Давайте перейдём к началу.
        </Text>
        <Box mt={32}>
          <img src={sadcat} alt="" />
        </Box>
      </Stack>
    </Center>
  )
}
