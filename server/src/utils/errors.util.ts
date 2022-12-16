export function getErrorMessage(error : unknown){
  if(error instanceof Error){
    return error.message;
  }else{
    return String(error);
  }
}
