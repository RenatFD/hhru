import { useEffect, useState, useCallback, useMemo } from "react";
import type { KeyboardEvent } from "react";
import {
  Container,
  TextInput,
  Select,
  Group,
  Stack,
  Pill,
  Pagination,
  Loader,
  Center,
  Alert,
  Paper,
  Text,
  Box,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadJobs,
  setSearch,
  setCity,
  addSkill,
  removeSkill,
  setCurrentPage,
} from "../store/jobsSlice";
import { VacancyCard } from "./VacancyCard";

export function VacancyList() {
  const dispatch = useAppDispatch();
  const {
    jobs,
    totalPages,
    currentPage,
    loading,
    error,
    search,
    city,
    skills,
  } = useAppSelector((state) => state.jobs);

  const [searchInput, setSearchInput] = useState(search);
  const [newSkill, setNewSkill] = useState("");

  const cityOptions = useMemo(() => {
    const cities = [...new Set(jobs.map((j) => j.city).filter(Boolean))].sort();
    return [
      { value: "", label: "Все" },
      ...cities.map((c) => ({ value: c, label: c })),
    ];
  }, [jobs]);

  const buildParams = useCallback(
    (page: number) => ({
      search: search || undefined,
      city: city || undefined,
      skills: skills.length > 0 ? skills.join(",") : undefined,
      page,
    }),
    [search, city, skills],
  );

  useEffect(() => {
    dispatch(loadJobs(buildParams(1)));
  }, [dispatch, buildParams]);

  const handleSearchSubmit = () => {
    dispatch(setSearch(searchInput));
  };

  const handleCityChange = (value: string | null) => {
    dispatch(setCity(value || ""));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(loadJobs(buildParams(page)));
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed) {
      dispatch(addSkill(trimmed));
      setNewSkill("");
    }
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill));
  };

  return (
    <>
      <Box
        style={{
          margin: "0 auto",
          maxWidth: 1200,
          padding: "16px 0",
          minHeight: 114,
        }}
      >
        <Container px={0}>
          <Group justify="space-between" align="center" wrap="wrap">
            <Box style={{ fontFamily: "Open Sans, sans-serif" }}>
              <div
                style={{ fontWeight: 700, fontSize: "clamp(20px, 5vw, 26px)" }}
              >
                Список вакансий
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(16px, 4vw, 20px)",
                  lineHeight: "135%",
                  color: "#0F0F1080",
                }}
              >
                по профессии Frontend-разработчик
              </div>
            </Box>
            <Group
              gap={12}
              align="center"
              wrap="wrap"
              style={{ width: "auto" }}
            >
              <TextInput
                placeholder="Должность или название компании"
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                onBlur={handleSearchSubmit}
                size="md"
                style={{ width: "clamp(200px, 50vw, 400px)" }}
                leftSection={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                      stroke="#0F0F10"
                      stroke-opacity="0.3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <Button color="#4263EB" onClick={handleSearchSubmit} size="md">
                Найти
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      <Box style={{ borderBottom: "1px solid #0F0F1033", width: "100%" }} />

      <Box style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 0" }}>
        <Container px={0}>
          <Group align="flex-start" gap="lg" wrap="wrap">
            <Stack
              gap={12}
              style={{ width: "clamp(200px, 100%, 317px)", flexShrink: 0 }}
            >
              <Paper radius={12} p={24}>
                <Stack gap={12}>
                  <Text fw={600} size="sm" mb={8}>
                    Ключевые навыки
                  </Text>
                  <Group>
                    <TextInput
                      w={217}
                      placeholder="Навык"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.currentTarget.value)}
                      onKeyDown={handleSkillKeyDown}
                    />
                    <ActionIcon
                      w={36}
                      h={36}
                      onClick={handleAddSkill}
                      style={{
                        gap: 10,
                        opacity: 1,
                        borderRadius: 8,
                        padding: 4,
                      }}
                    >
                      <svg
                        viewBox="0 0 34 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="34" height="30" rx="8" fill="#228BE6" />
                        <path
                          d="M17.0001 7.41675V22.5834M9.41675 15.0001H24.5834"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </ActionIcon>
                  </Group>
                  <Stack gap={12}>
                    <Pill.Group>
                      {skills.map((skill) => (
                        <Pill
                          h={24}
                          key={skill}
                          withRemoveButton
                          onRemove={() => handleRemoveSkill(skill)}
                        >
                          {skill}
                        </Pill>
                      ))}
                    </Pill.Group>
                  </Stack>
                </Stack>
              </Paper>
              <Box
                style={{
                  width: "100%",
                  maxWidth: 317,
                  height: 84,
                  background: "#fff",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Select
                  placeholder="Все города"
                  data={cityOptions}
                  value={city || null}
                  onChange={handleCityChange}
                  clearable
                  searchable
                  style={{ width: "clamp(200px, 80%, 269px)", height: 36 }}
                  leftSection={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.00008 9.33338C9.10465 9.33338 10.0001 8.43795 10.0001 7.33338C10.0001 6.22881 9.10465 5.33338 8.00008 5.33338C6.89551 5.33338 6.00008 6.22881 6.00008 7.33338C6.00008 8.43795 6.89551 9.33338 8.00008 9.33338Z"
                        stroke="#0F0F10"
                        stroke-opacity="0.3"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.7714 11.1047L8.94275 13.9334C8.69274 14.1831 8.35381 14.3234 8.00042 14.3234C7.64703 14.3234 7.30809 14.1831 7.05808 13.9334L4.22875 11.1047C3.4829 10.3588 2.97497 9.40852 2.76921 8.37396C2.56344 7.3394 2.66908 6.26706 3.07275 5.29254C3.47643 4.31801 4.16002 3.48508 5.03707 2.89905C5.91413 2.31303 6.94526 2.00024 8.00008 2.00024C9.05491 2.00024 10.086 2.31303 10.9631 2.89905C11.8402 3.48508 12.5237 4.31801 12.9274 5.29254C13.3311 6.26706 13.4367 7.3394 13.231 8.37396C13.0252 9.40852 12.5173 10.3588 11.7714 11.1047Z"
                        stroke="#0F0F10"
                        stroke-opacity="0.3"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                />
              </Box>
            </Stack>
            <div style={{ flex: 1, minWidth: 0 }}>
              {loading && (
                <Center py="xl">
                  <Loader />
                </Center>
              )}

              {error && (
                <Alert color="red" title="Ошибка" mb="md">
                  {error}
                </Alert>
              )}

              {!loading && !error && jobs.length === 0 && (
                <Center py="xl">
                  <p>Вакансии не найдены</p>
                </Center>
              )}

              <Stack gap="md" mb="xl">
                {jobs.map((job) => (
                  <VacancyCard key={job.id} job={job} />
                ))}
              </Stack>

              {totalPages > 1 && (
                <Center>
                  <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={handlePageChange}
                  />
                </Center>
              )}
            </div>
          </Group>
        </Container>
      </Box>
    </>
  );
}
