import bcrypt from "bcrypt";
import { prisma } from "~/data";
import { omit } from "ramda";

// const omit = (keys, obj) => {
//   // return Object.keys(obj).filter(value => value !== key);
//   return Object.keys(obj).reduce((acc, current) => {
//     if(keys.includes(current)) {
//       return acc;
//     }

//     const memo = {
//       ...acc,
//       [current]: obj[current],
//     }

//     return memo
//   }, {});
// }

const passwordCheck = async (params, next) => {
  const { password: passwordPlainText, ...where } = params.args.where;
  const result = await next(
    {
      ...params,
      args: {
        ...params.args,
        where,
      },
    },
    next
  );

  if (!result) {
    return result;
  }

  // const { password, ...user } = result;

  const passwordEqual = await bcrypt.compare(
    passwordPlainText,
    result.password
  );

  if (!passwordEqual) {
    return false;
  }

  return result;
};

prisma.$use(async (params, next) => {
  if (params.model !== "User") {
    return next(params, next);
  }

  if (params.action !== "findUnique") {
    return next(params, next);
  }

  const result = params.args.where.password
    ? await passwordCheck(params, next)
    : await next(params, next);

  if (result) {
    // const {password, ...user} = result;
    return omit(["password"], result);
  }

  return result;
});
