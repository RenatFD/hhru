import type { Job } from "../../api/jobsApi";

export const spaceLabels: Record<Job["space"], string> = {
  remote: "Можно удалённо",
  office: "Офис",
  hybrid: "Гибрид",
};

export const spaceColors: Record<Job["space"], string> = {
  remote: "green",
  office: "orange",
  hybrid: "violet",
};
