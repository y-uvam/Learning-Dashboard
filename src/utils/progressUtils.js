export const calculateProgress = (lessons) => {
  if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
    return 0;
  }

  const completedCount = lessons.filter((lesson) => Boolean(lesson && lesson.isCompleted)).length;
  const percentage = Math.round((completedCount / lessons.length) * 100);

  return Math.min(100, Math.max(0, percentage));
};

export default {
  calculateProgress,
};
