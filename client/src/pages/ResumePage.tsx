import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../constants/BaseURL";
import {
  achievementType,
  educationType,
  experienceType,
  projectType,
  skillType,
} from "../Types";
import {
  AchievementItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillItem,
} from "../components/ListItem";
import { TOKEN } from "../constants/Token";
import { COLORS } from "../constants/Colors";
import { Empty, Space } from "antd";
import Button from "antd/es/button";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { primary, black100, black200 } = COLORS.light;

const ResumePageWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const ActionMenu = styled.div`
  width: 18%;
`;

const PaneWrapper = styled.div`
  font-size: 13px;
  background-color: #fff;
  padding: 3rem;
  display: flex;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  h4 {
    font-weight: 700;
    font-size: 1rem;
    color: ${primary};
    margin: 0.5rem 0;
  }

  .main {
    width: 100%;
  }

  .top_section {
    display: flex;
    justify-content: space-between;
  }

  .personal_info {
    h1 {
      color: ${primary};
    }
    h1,
    h2 {
      font-weight: 700;
    }
  }

  .contact_info {
    color: ${black100};
    text-align: right;
    ul > li {
      list-style-type: none;
    }

    ul :not(:first-child) {
      color: ${black200};
    }
  }

  .sides {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }

  .education_section,
  .skills_section,
  .projects_section,
  .experiences_section,
  .achievements_section {
    margin-bottom: 3rem;
  }
`;

const LeftSide = styled.div`
  width: 40%;
`;

const RightSide = styled.div`
  width: 53%;
`;

interface IResumeData {
  firstName: String;
  lastName: String;
  occupation: String;
  location: String;
  website: String;
  email: String;
  telephone: String;
  projects: projectType[];
  experience: experienceType[];
  education: educationType[];
  achievements: achievementType[];
  skills: skillType[];
}

const initialState = [
  {
    achievements: [
      {
        achievementTitle: "",
        awarder: "",
        date: "",
        event: "",
      },
    ],
    education: [
      {
        discipline: "",
        honors: "",
        nameOfInstitution: "",
        yearEnded: "",
      },
    ],
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    website: "",
    email: "",
    telephone: "",
    skills: [
      {
        skill: "",
        tools: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        date: "",
        description: "",
        location: "",
        role: "",
      },
    ],
  },
];

const ResumePage: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [resumeData, setResumeData] = useState<IResumeData[]>(initialState);

  const {
    firstName,
    lastName,
    occupation,
    website,
    email,
    location,
    telephone,
    achievements,
    education,
    skills,
    experience,
    projects,
  } = resumeData[0];

  console.log(resumeData, firstName);

  const fetchResumeData = () => {
    axios
      .get(`${BASE_URL}/profile/myProfile`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        console.log(result);
        if (result[0] === undefined) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setResumeData(result);
        }
        setIsReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  console.log(resumeData);

  return (
    <ResumePageWrapper>
      {!isReady ? (
        <div>Loading...</div>
      ) : (
        <>
          <PaneWrapper>
            <div className="main">
              {isEmpty ? (
                <Empty />
              ) : (
                <>
                  <div className="top_section">
                    <div className="personal_info">
                      <h1>
                        {firstName} {lastName}
                      </h1>
                      <h2>{occupation}</h2>
                    </div>
                    <div className="contact_info">
                      <ul>
                        <li>{location}</li>
                        <li>{website}</li>
                        <li>{email}</li>
                        <li>{telephone}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="sides">
                    <LeftSide>
                      {education && (
                        <div className="education_section">
                          <h4>EDUCATION</h4>
                          {education?.map(
                            (school: educationType, index: number) => {
                              const {
                                discipline,
                                honors,
                                nameOfInstitution,
                                yearEnded,
                              } = school;
                              return (
                                <EducationItem
                                  key={index}
                                  nameOfInstitution={nameOfInstitution}
                                  yearEnded={yearEnded}
                                  honors={honors}
                                  discipline={discipline}
                                />
                              );
                            }
                          )}
                        </div>
                      )}

                      {skills && (
                        <div className="skills_section">
                          <h4>SKILLS/TOOLS</h4>
                          {skills?.map((skills: skillType, index: number) => {
                            const { skill, tools } = skills;
                            return (
                              <SkillItem
                                key={index}
                                skill={skill}
                                tools={tools}
                              />
                            );
                          })}
                        </div>
                      )}

                      {projects && (
                        <div className="projects_section">
                          <h4>PROJECTS</h4>
                          {projects?.map(
                            (project: projectType, index: number) => {
                              const { title, description } = project;
                              return (
                                <ProjectItem
                                  key={index}
                                  title={title}
                                  description={description}
                                />
                              );
                            }
                          )}
                        </div>
                      )}
                    </LeftSide>
                    <RightSide>
                      {experience && (
                        <div className="experiences_section">
                          <h4>EXPERIENCE</h4>
                          {experience.map(
                            (work: experienceType, index: number) => {
                              const {
                                company,
                                role,
                                location,
                                date,
                                description,
                              } = work;
                              return (
                                <ExperienceItem
                                  key={index}
                                  company={company}
                                  role={role}
                                  location={location}
                                  date={date}
                                  description={description}
                                />
                              );
                            }
                          )}
                        </div>
                      )}

                      {achievements && (
                        <div className="achievements_section">
                          <h4>ACHIEVEMENTS</h4>
                          {achievements.map(
                            (achievement: achievementType, index: number) => {
                              const {
                                achievementTitle,
                                awarder,
                                date,
                                event,
                              } = achievement;
                              return (
                                <AchievementItem
                                  key={index}
                                  achievementTitle={achievementTitle}
                                  awarder={awarder}
                                  event={event}
                                  date={date}
                                />
                              );
                            }
                          )}
                        </div>
                      )}
                    </RightSide>
                  </div>
                </>
              )}
            </div>
          </PaneWrapper>
          <ActionMenu>
            <Space direction="vertical">
              <Button block icon={<EditOutlined />}>
                Edit resume profile
              </Button>
              <Button block icon={<DownloadOutlined />}>
                Download resume profile
              </Button>
              <Button type="primary" block danger icon={<DeleteOutlined />}>
                Delete resume profile
              </Button>
            </Space>
          </ActionMenu>
        </>
      )}
    </ResumePageWrapper>
  );
};

export default ResumePage;