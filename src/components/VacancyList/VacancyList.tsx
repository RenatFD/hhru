import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import type { KeyboardEvent } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  TextInput,
  Tabs,
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loadJobs,
  setSearch,
  setCity,
  addSkill,
  removeSkill,
  setSkills,
  setCurrentPage,
} from "../../store/jobsSlice";
import { VacancyCard } from "../VacancyCard/VacancyCard";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const CITY_BY_SLUG: Record<string, string> = {
    moscow: "Москва",
    petersburg: "Санкт-Петербург",
  };

  useLayoutEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    const skillsFromUrl = searchParams.get("skills") || "";

    if (searchFromUrl !== search) {
      dispatch(setSearch(searchFromUrl));
      setSearchInput(searchFromUrl);
    }
    const skillsArr = skillsFromUrl
      ? skillsFromUrl.split(",").filter(Boolean)
      : [];
    if (skillsFromUrl !== skills.join(",")) {
      dispatch(setSkills(skillsArr));
    }
  }, [searchParams]);

  useEffect(() => {
    const slug = location.pathname.includes("/petersburg")
      ? "petersburg"
      : "moscow";
    const cityFromPath = CITY_BY_SLUG[slug] || "";
    if (cityFromPath !== city) {
      dispatch(setCity(cityFromPath));
    }
  }, [location.pathname]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (skills.length > 0) params.skills = skills.join(",");

    const newParamsStr = new URLSearchParams(params).toString();
    const current = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (key === "search" || key === "skills") {
        current.set(key, value);
      }
    }

    if (newParamsStr !== current.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [search, skills]);

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
          <Box
            style={{
              marginBottom: 24,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tabs
              value={location.pathname.includes("/petersburg") ? "petersburg" : "moscow"}
              onChange={(value) => value && navigate(`/vacancies/${value}`)}
              style={{ width: 230 }}
            >
              <Tabs.List style={{ borderBottomWidth: 1 }}>
                <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Box>

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
