import { Container, Group, Anchor, Text } from "@mantine/core";
import hhLogo from "../../assets/hh.png";
import { profileIcon } from "./constants";

export function Header() {
  return (
    <Container size="xl" px={0} py="md">
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <img src={hhLogo} width={30} height={30} alt="HH" />
          <Text size="xl" fw={600}>
            .Frontend
          </Text>
        </Group>
        <Group justify="center" style={{ flex: 1 }}>
          <Group gap={8} align="center">
            <Anchor href="#" fw={500} size="sm" c="#000000">
              Вакансии FE
            </Anchor>
            <Text c="#4263EB" style={{ lineHeight: 1 }}>•</Text>
          </Group>
          <Group gap={6} align="center">
            {profileIcon}
            <Anchor href="#" fw={500} size="sm" c="#0F0F1080">Обо мне</Anchor>
          </Group>
        </Group>
      </Group>
    </Container>
  );
}
