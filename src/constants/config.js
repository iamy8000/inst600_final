const ENV = {
	isDev: process.env.NODE_ENV !== "production",
	isProd: process.env.NODE_ENV === "production",
};
const Config = {
	// BASE_URL:
	// 	process.env.NODE_ENV !== "production"
	// 		? "http://localhost:3000"
	// 		: `${window.location.origin}/api`,
};
export { ENV };
export default Config;
