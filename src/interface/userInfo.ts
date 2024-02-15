// Defines an interface for User functions
interface UserInfo {
	userId: string; // Unique identifier for the user
	userName: string; // Name of the user
	doctorCName: string; // Chinese name of the doctor
	doctorEName: string; // English name of the doctor
	functionList: RoleFunction[]; // List of user functions
	title: string; // User's title
	signatureUrl: string; // URL to the user's signature image
	jobTitle: string; // User's job title
	summary: string; // Summary about the user
	accessToken: string; // Access token for authentication
	refreshToken: string; // Refresh token for re-authentication
}

// Defines an interface for function attributes
interface RoleFunction {
	functionName: string; // Name of the function
	description: string; // Description of the function
	correspondElementId: string; // ID of the corresponding UI element
}
