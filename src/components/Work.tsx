import { useState, useEffect } from "react";
import { getProjects, type Project, urlFor } from "../sanity.io";
import { useTheme } from "../context";

export default function Work() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const getIconSrc = (icon: string) => {
    return isDark
      ? `./images/icons/${icon}.svg`
      : `./images/icons/${icon}-dark.svg`;
  };
  const { isDark } = useTheme();

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
      // Set first project as selected by default
      if (data && data.length > 0) {
        setSelectedProject(data[0]);
      }
      setLoading(false);
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="work-section">
        <h1 className="text-center">Recent Work</h1>
        <p className="text-center">Loading projects...</p>
      </section>
    );
  }

  return (
    <section id="work-section">
      <h1 className="text-center">recent work</h1>

      {/* Technologies tags - you might want to generate these dynamically from projects */}
      <div className="tags-big text-center">
        <span>react</span>
        <span>tailwind</span>
        <span>framer motion</span>
        <span>next.js</span>
        <span>ecommerce</span>
      </div>

      <div className="work-grid">
        {/* Project Preview */}
        <div id="project-preview">
          {selectedProject?.thumbnail && (
            <img
              src={urlFor(selectedProject.thumbnail).url()}
              alt={`${selectedProject?.title} preview`}
            />
          )}
          <div className="space-between">
            <h2>{selectedProject?.title}</h2>
            <div className="project-links">
              {selectedProject?.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Live Demo"
                >
                  <img src={getIconSrc("link")} alt="Live demo" />
                </a>
              )}
              {/*selectedProject?.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Repository"
                >
                  <img src={getIconSrc("github")} alt="GitHub" />
                </a>
              )*/}
            </div>
          </div>
          <p>{selectedProject?.description}</p>

          {/* Technologies */}
          <div className="tags">
            {selectedProject?.technologies?.map((tech: string, i: number) => (
              <span key={i}>{tech}</span>
            ))}
          </div>

          {/* Additional project info */}
          {/*selectedProject?.category && (
            <div className="project-meta">
              <span className="category">{selectedProject.category}</span>
              {selectedProject.completedDate && (
                <span className="date">
                  {new Date(selectedProject.completedDate).toLocaleDateString()}
                </span>
              )}
              {selectedProject.featured && (
                <span className="featured-badge">Featured</span>
              )}
            </div>
          )*/}
        </div>

        {/* Projects List */}
        <ul className="projects-list">
          {projects?.map((project: Project) => (
            <li
              key={project._id}
              onClick={() => setSelectedProject(project)}
              className={selectedProject?._id === project._id ? "active" : ""}
            >
              <h4>{project.title}</h4>
              <div className="tags">
                {project.technologies
                  ?.slice(0, 3)
                  .map((tech: string, i: number) => (
                    <span key={i}>{tech}</span>
                  ))}
                {project.technologies && project.technologies.length > 3 && (
                  <span>+{project.technologies.length - 3}</span>
                )}
              </div>
              {/*project.featured && (
                <span className="featured-indicator">⭐</span>
              )*/}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
