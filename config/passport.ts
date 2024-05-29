import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:5000/api/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'],
  },
  (accessToken, refreshToken, profile, done) => {
    // Aquí puedes guardar el token de acceso en tu base de datos si es necesario
    return done(null, profile);
  }
));

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj as Express.User);
});
