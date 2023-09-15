import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { UserRol, UserStatus } from '../interfaces/user.interface';
import { yupValidate } from '../helpers/yupValidate.helper';

const putUsersSchema = yup.object({
  params: yup.object({
    id:  yup.number().required(),
  }),
  body: yup.object({
    surname:  yup.string().min(2),
    name:  yup.string().min(2),
    status:  yup.string().oneOf([UserStatus.enabled, UserStatus.disabled]),
    rol:  yup.string().oneOf([UserRol.administrator, UserRol.official]),
  })
  .test( 
    "At least one of these fields must to be filled", 
    function(value) { 
        if (!value.surname && !value.name && !value.status && !value.rol){
           return this.createError({message: 'Body must not to be empty'});  
        }
        return true;
    })
});

export const validatePutUsers = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, putUsersSchema);
};

  