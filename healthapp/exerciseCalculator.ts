interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;

  const trainingDays = hours.filter(h => h > 0).length;

  const totalHours = hours.reduce((sum, h) => sum + h, 0);
  const average = totalHours / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job";
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to exercise more";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

interface ExerciseArguments {
  hours: number[];
  target: number;
}

const parseExercisesArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const target = Number(args[2]);
  const hours = args.slice(3).map(Number);

  if (isNaN(target) || hours.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    hours,
    target
  };
};

try {
  const { hours, target } = parseExercisesArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
