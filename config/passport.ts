const GoogleStrategy = require("passport-google-oauth20").Strategy;
import "dotenv/config";
import User from "../models/User";

interface IUser {
  _id?: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image?: string;
}

function passportAuth(passport: any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_KEY,
        callbackURL: process.env.GOOGLE_CALLBACK_UR,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        const newUser: IUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user: IUser, done: any) => {
    done(null, user._id);
  });

  passport.deserializeUser((id: number, done: any) => {
    User.findById(id, (err: any, user: any) => done(err, user));
  });
}

export default passportAuth;
