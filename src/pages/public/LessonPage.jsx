import LessonViewer from "../../components/LessonViewer";

export default function LessonPage() {
  return (
    <LessonViewer
      lessonTitle="Mastering Core Concepts for Academic Success"
      courseName="Class 10 Science"
      boardType="BSEK Science Track"
      lessonDuration="42:18"
      onComplete={(lesson) => {
        console.log("Completed lesson:", lesson);
      }}
    />
  );
}
