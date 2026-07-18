import { Container, Group, Text } from "@mantine/core";
import { useMatch, Link } from "react-router-dom";
import hhLogo from "../../assets/hh.png";
import { profileIcon } from "./constants";
import styles from "./Header.module.css";

export function Header() {
  const isVacancies = useMatch("/vacancies/*");
  const isAbout = useMatch("/about");

  return (
    <Container size="xl" px={0} py="md">
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <img src={hhLogo} width={30} height={30} alt="HH" />
          <Text size="xl" fw={600}>
            .Frontend
          </Text>
        </Group>
        <Group justify="center" className={styles.centerGroup}>
          <Group gap={8} align="center">
            <Link to="/vacancies" className={`${styles.link} ${isVacancies ? styles.linkActive : ''}`}>
              Вакансии FE
            </Link>
            <Text c="#4263EB" className={styles.dot}>•</Text>
          </Group>
          <Group gap={6} align="center">
            {profileIcon}
            <Link to="/about" className={`${styles.link} ${isAbout ? styles.linkActive : ''}`}>
              Обо мне
            </Link>
          </Group>
        </Group>
      </Group>
    </Container>
  );
}
