import jwt from "express-jwt";

export const auth = jwt({ secret: 'kd3r9HYfBvPKDa6c5YGhpFnwLDpxdT8Ka8Mne8pYaU4aEE5zVk6fLqL8exb3gdEJ', algorithms: ['HS256'] });
