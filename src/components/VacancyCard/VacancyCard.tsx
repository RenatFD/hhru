import { Link } from "react-router-dom";
import { Paper, Title, Text, Group, Stack, Badge, Button } from "@mantine/core";
import type { Job } from "../../api/jobsApi";
import { spaceLabels, spaceColors } from "./constants";

interface VacancyCardProps {
  job: Job;
}

export function VacancyCard({ job }: VacancyCardProps) {
  return (
    <Paper
      withBorder
      w={{ base: "100%", md: 659 }}
      p={{ base: 16, sm: 24 }}
      radius={12}
      style={{ opacity: 1, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Group justify="space-between" align="flex-start">
        <div>
          <Title
            order={3}
            mb={4}
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(16px, 4vw, 20px)",
              color: "#364FC7",
              letterSpacing: 0,
            }}
          >
            {job.name}
          </Title>
          <Group gap="xs">
            <Text fw={400} c="#0F0F10">
              {Number(job.salary).toLocaleString("ru-RU")} ₽
            </Text>
            <Text c="dimmed">Опыт {job.experience}</Text>
          </Group>
        </div>
      </Group>

      <Stack gap="xs" >
        <Text size="sm" c="dimmed">
          {job.city}
        </Text>
        <Badge color={spaceColors[job.space]}  size="xs" radius='xs'>{spaceLabels[job.space]} </Badge>

        <Text style={{ fontFamily: "Open Sans, sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "24px", letterSpacing: 0 }}>
          {job.company_name}
        </Text>
      </Stack>

      <Group justify="space-between" align="center" >
        <Button
          component={Link}
          to={`/vacancies/${job.id}`}
          color="#FFFFFF"
          size="sm"
          style={{ background: "#0F0F10", fontWeight: 400 }}
        >
          Смотреть вакансию
        </Button>
      </Group>
    </Paper>
  );
}
