import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Loader,
  Center,
  Button,
  Box,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadJob } from "../../store/jobsSlice";
import { spaceLabels, spaceColors } from "../VacancyCard/constants";
import styles from "./VacancyDetail.module.css";

import { NotFound } from "../NotFound/NotFound";

export function VacancyDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { jobDetail, jobDetailLoading, jobDetailError } = useAppSelector(
    (state) => state.jobs,
  );

  const numericId = Number(id);

  useEffect(() => {
    if (id && !isNaN(numericId)) {
      dispatch(loadJob(numericId));
    }
  }, [dispatch, id, numericId]);

  if (isNaN(numericId)) {
    return <NotFound />;
  }

  if (jobDetailLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (jobDetailError) {
    return <NotFound />;
  }

  if (!jobDetail) {
    return null;
  }

  return (
    <Box className={styles.wrapper}>
      <Container px={0}>
        <Stack gap="md">
          <Button
            component={Link}
            to="/vacancies"
            variant="subtle"
            color="#364FC7"
            className={styles.backButton}
            leftSection={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
              >
                <path stroke="#364fc7" d="M10 12 6 8l4-4" />
              </svg>
            }
          >
            К списку вакансий
          </Button>

          <Paper radius={12} p={24} withBorder>
            <Stack gap="md">
              <Title order={2} className={styles.jobTitle}>
                {jobDetail.name}
              </Title>

              <Group gap="xs">
                <Text fw={500} size="lg" c="#0F0F10">
                  {Number(jobDetail.salary).toLocaleString("ru-RU")} ₽
                </Text>
                <Text c="dimmed">Опыт {jobDetail.experience}</Text>
              </Group>

              <Group gap="xs">
                <Text size="sm" c="dimmed">
                  {jobDetail.city}
                </Text>
                <Badge
                  color={spaceColors[jobDetail.space]}
                  size="xs"
                  radius="xs"
                >
                  {spaceLabels[jobDetail.space]}
                </Badge>
              </Group>

              <Text className={styles.textBody}>{jobDetail.company_name}</Text>
            </Stack>
          </Paper>

          <Paper radius={12} p={24} withBorder>
            <Stack gap="md">
              <Stack gap="sm">
                <Text fw={600} size="lg">
                  Компания
                </Text>
                <Text className={`${styles.textBody} ${styles.preWrap}`}>
                  {jobDetail.description}
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text fw={600} size="lg">
                  О вакансии
                </Text>
                <Text className={`${styles.textBody} ${styles.preWrap}`}>
                  {jobDetail.about_company}
                </Text>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
