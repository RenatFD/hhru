import { Container, Group, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";
import hhLogo from "../../assets/hh.png";
import { profileIcon } from "./constants";

export function Header() {
  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    fontWeight: 500,
    fontSize: 14,
    color: isActive ? '#4263EB' : '#000000',
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
            <NavLink
              to="/vacancies"
              style={({ isActive }) => linkStyle(isActive)}
            >
              Вакансии FE
            </NavLink>
            <Text c="#4263EB" style={{ lineHeight: 1 }}>•</Text>
          </Group>
          <Group gap={6} align="center">
            {profileIcon}
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                ...linkStyle(isActive),
                color: isActive ? '#4263EB' : '#0F0F1080',
              })}
            >
              Обо мне
            </NavLink>
          </Group>
        </Group>
      </Group>
    </Container>
  );
}
