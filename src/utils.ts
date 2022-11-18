import dayjs from "dayjs";

export const checkDate = (date: any) => {
  return dayjs().isAfter(dayjs(date));
};

export const getClass = (todo: any) => {
  if (todo.done && !todo.expired) {
    return 'task-green';
  } else if (todo.expired) {
    return 'task-red';
  } else if (!todo.expired && !todo.done) {
    return 'task';
  }
}

