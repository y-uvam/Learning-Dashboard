import { calculateProgress } from '../src/utils/progressUtils';

describe('calculateProgress Business Logic Tests', () => {
  it('should return 0 when lessons array is empty or null', () => {
    expect(calculateProgress([])).toBe(0);
    expect(calculateProgress(null)).toBe(0);
    expect(calculateProgress(undefined)).toBe(0);
  });

  it('should return 0 when no lessons are completed', () => {
    const lessons = [
      { id: 1, title: 'Lesson 1', isCompleted: false },
      { id: 2, title: 'Lesson 2', isCompleted: false },
      { id: 3, title: 'Lesson 3', isCompleted: false },
    ];
    expect(calculateProgress(lessons)).toBe(0);
  });

  it('should return 100 when all lessons are completed', () => {
    const lessons = [
      { id: 1, title: 'Lesson 1', isCompleted: true },
      { id: 2, title: 'Lesson 2', isCompleted: true },
    ];
    expect(calculateProgress(lessons)).toBe(100);
  });

  it('should calculate exact progress for Python Programming course (13/20 = 65%)', () => {
    const lessons = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Lesson ${i + 1}`,
      isCompleted: i < 13,
    }));
    expect(calculateProgress(lessons)).toBe(65);
  });

  it('should calculate exact progress for Generative AI course (6/15 = 40%)', () => {
    const lessons = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Lesson ${i + 1}`,
      isCompleted: i < 6,
    }));
    expect(calculateProgress(lessons)).toBe(40);
  });

  it('should calculate exact progress for Full Stack Development course (7/28 = 25%)', () => {
    const lessons = Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      title: `Lesson ${i + 1}`,
      isCompleted: i < 7,
    }));
    expect(calculateProgress(lessons)).toBe(25);
  });

  it('should round fractional percentages to nearest integer (1/3 = 33%)', () => {
    const lessons = [
      { id: 1, title: 'Lesson 1', isCompleted: true },
      { id: 2, title: 'Lesson 2', isCompleted: false },
      { id: 3, title: 'Lesson 3', isCompleted: false },
    ];
    expect(calculateProgress(lessons)).toBe(33);
  });
});
