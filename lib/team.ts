// Re-export types and API functions from the centralized API module.
// The actual data now lives in the C# backend (backend/Aura.Api).
export type { TeamMember, SocialLinks } from "./api";
export { getTeam, getTeamMemberBySlug } from "./api";
