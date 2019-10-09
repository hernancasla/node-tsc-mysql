// import passport and passport-jwt modules
import passport from "passport";
import passportJWT from "passport-jwt";
import models from "../models";

export default (secretOrKey: string) => {

// ExtractJwt to help extract the token
const ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
const JwtStrategy = passportJWT.Strategy;
const jwtOptions: any = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secretOrKey || "wowo";
// lets create our strategy for web token
const strategy = new JwtStrategy(jwtOptions, (jwtPayload: any, next: any) => {
    // console.log("payload received", jwtPayload);
   // let user = getUser({ id: jwt_payload.id });
    const user =  models.findOne({where: {email: jwtPayload.email}});

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
passport.use(strategy);

return  passport;
};
