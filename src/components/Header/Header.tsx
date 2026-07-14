import { Container, Group, Text } from "@mantine/core";
import { useMatch, Link } from "react-router-dom";
import hhLogo from "../../assets/hh.png";
import { profileIcon } from "./constants";

export function Header() {
  const isVacancies = useMatch("/vacancies/*");
  const isAbout = useMatch("/about");

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontWeight: 500,
    fontSize: 14,
    color: active ? '#4263EB' : '#0F0F1080',
    textDecoration: 'none',
  });

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
            <Link to="/vacancies" style={linkStyle(!!isVacancies)}>
              Вакансии FE
            </Link>
            <Text c="#4263EB" style={{ lineHeight: 1 }}>•</Text>
          </Group>
          <Group gap={6} align="center">
            {profileIcon}
            <Link to="/about" style={linkStyle(!!isAbout)}>
              Обо мне
            </Link>
          </Group>
        </Group>
      </Group>
    </Container>
  );
}
