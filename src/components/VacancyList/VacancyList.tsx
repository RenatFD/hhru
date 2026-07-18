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
import styles from "./VacancyList.module.css";

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
    if (skills.length) params.skills = skills.join(",");

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
      skills: skills.length ? skills.join(",") : undefined,
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
      <Box className={styles.heroBox}>
        <Container px={0}>
          <Group justify="space-between" align="center" wrap="wrap">
            <Box>
              <div className={styles.heroTitle}>Список вакансий</div>
              <div className={styles.heroSubtitle}>
                по профессии Frontend-разработчик
              </div>
            </Box>
            <Group
              gap={12}
              align="center"
              wrap="wrap"
              className={styles.searchGroup}
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
                className={styles.searchInput}
                leftSection={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                  >
                    <path
                      stroke="#0f0f10"
                      stroke-opacity=".3"
                      d="m14 14-4-4m1.333-3.333a4.667 4.667 0 1 1-9.333 0 4.667 4.667 0 0 1 9.333 0Z"
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

      <Box className={styles.divider} />

      <Box className={styles.contentBox}>
        <Container px={0}>
          <Box className={styles.tabsWrapper}>
            <Tabs
              value={
                location.pathname.includes("/petersburg")
                  ? "petersburg"
                  : "moscow"
              }
              onChange={(value) => value && navigate(`/vacancies/${value}`)}
              className={styles.tabs}
            >
              <Tabs.List className={styles.tabsList}>
                <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Box>

          <Group align="flex-start" gap="lg" wrap="wrap">
            <Stack gap={12} className={styles.sidebar}>
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
                      className={styles.addButton}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 34 30"
                      >
                        <rect width="34" height="30" fill="#228be6" rx="8" />
                        <path
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 7.417v15.166M9.417 15h15.166"
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
            <div className={styles.mainContent}>
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
