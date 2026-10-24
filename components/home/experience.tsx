import data from "@/data";
import Container from "../container";

const Experience = () => {
  return (
    <Container className="px-6 w-full my-10">
      <h2 className="font-semibold text-lg dark:text-white text-neutral-800 mb-4">
        Work Experience
      </h2>
      <div className="flex flex-col">
        {data.experience.map((job) => (
          <div
            key={`${job.company}-${job.period}`}
            className="flex items-center gap-3 py-2.5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-500">
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="size-full object-cover"
                />
              ) : (
                job.company[0]
              )}
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="text-sm text-black dark:text-white">
                {job.role}
              </span>
              <span className="text-xs text-neutral-500">
                {job.company} · {job.location}
              </span>
            </div>
            <span className="ml-auto text-sm text-neutral-500 shrink-0">
              {job.period}
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Experience;
