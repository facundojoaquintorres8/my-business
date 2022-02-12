export function checkPermission(sessionUserPermission: string, permissions: string[]):boolean{
  let value= false
  if(sessionUserPermission){
    const permission = permissions.find(x=>x.toLowerCase() === sessionUserPermission.toLowerCase())
    if(permission){
      value = true;
    }
  }
  return value;
}
