const ENV = {
	isDev: process.env.NODE_ENV !== "production",
	isProd: process.env.NODE_ENV === "production",
};
const Config = {};
export { ENV };
export default Config;
