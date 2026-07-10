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
  Alert,
  Button,
  Box,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadJob } from "../../store/jobsSlice";
import { spaceLabels, spaceColors } from "../VacancyCard/constants";

export function VacancyDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { jobDetail, jobDetailLoading, jobDetailError } = useAppSelector(
    (state) => state.jobs,
  );

  useEffect(() => {
    if (id) {
      dispatch(loadJob(Number(id)));
    }
  }, [dispatch, id]);

  if (jobDetailLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (jobDetailError) {
    return (
      <Container py="xl">
        <Alert color="red" title="Ошибка">
          {jobDetailError}
        </Alert>
      </Container>
    );
  }

  if (!jobDetail) {
    return null;
  }

  return (
    <Box style={{ maxWidth: 773, margin: "0 auto", padding: "24px 0" }}>
      <Container px={0}>
        <Stack gap="md">
          <Button
            component={Link}
            to="/vacancies"
            variant="subtle"
            color="#364FC7"
            style={{ alignSelf: "flex-start", padding: 0 }}
            leftSection={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="#364FC7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            К списку вакансий
          </Button>

          <Paper radius={12} p={24} withBorder>
            <Stack gap="md">
              <Title
                order={2}
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(20px, 5vw, 28px)",
                  color: "#364FC7",
                }}
              >
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

              <Text
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: "24px",
                }}
              >
                {jobDetail.company_name}
              </Text>
            </Stack>
          </Paper>

          <Paper radius={12} p={24} withBorder>
            <Stack gap="md">
              <Stack gap="sm">
                <Text
                  fw={600}
                  size="lg"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  Компания
                </Text>
                <Text
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "24px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {jobDetail.description}
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text
                  fw={600}
                  size="lg"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  О вакансии
                </Text>
                <Text
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "24px",
                    whiteSpace: "pre-wrap",
                  }}
                >
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
