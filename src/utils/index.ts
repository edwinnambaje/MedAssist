export const successResponse = (message: string, data: any, token?:string) => {
  return {
    status: "success",
    message,
    data,
    token
  };
};
