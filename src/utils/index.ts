export const successResponse = (message: string, data: any, token?:string,username?:string, email?:string) => {
  return {
    status: "success",
    message,
    data,
    token,
    username,
    email
  };
};
