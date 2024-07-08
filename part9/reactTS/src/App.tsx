import Header from "./components/Header";
// import ContentList from "./components/Content";
import Total from "./components/Total";
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "requirements"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

interface ContentProps {
  data: CoursePart[]
}

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p style={{ fontStyle: "italic" }}>{part.description}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>group Projects:{part.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p style={{ fontStyle: "italic" }}>{part.description}</p>
          <p>submit to: {part.backgroundMaterial}</p>
        </div>
      )
    case "requirements":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p style={{ fontStyle: "italic" }}>{part.description}</p>
          <ul>
            Required Skills
            {part.requirements.map((req, i) => {
              return (
                <li key={i}>{req}</li>
              )
            })}
          </ul>
        </div>
      )
  }
}

const ContentList = (props: ContentProps) => {
  return (
    <>
      {props.data.map((part, i) => {
        return (
          <Part key={i} part={part} />
        )
      })}
    </>
  )
};
const App = () => {
  const courseName = "Half Stack application development";



  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "requirements"
    }
  ];


  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <ContentList data={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;